import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCoursePricing, toSmallestUnit } from "@/lib/academy-pricing";
import { createEnrollment } from "@/lib/db";
import { initializePaystackTransaction } from "@/lib/paystack";

const bodySchema = z.object({
  email: z.string().email(),
  fullname: z.string().min(2),
  phone: z.string().min(7, "Phone number is required"),
  courseSlug: z.string(),
  currency: z.enum(["NGN", "USD"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { email, fullname, phone, courseSlug, currency } = parsed.data;
    const pricing = getCoursePricing(courseSlug);
    if (!pricing) {
      return NextResponse.json(
        { error: `Unknown course: ${courseSlug}` },
        { status: 400 },
      );
    }

    const amountMajor =
      currency === "NGN"
        ? pricing.standardFeeNgn
        : pricing.standardFeeUsd;
    if (!amountMajor || amountMajor <= 0) {
      return NextResponse.json(
        { error: `No price configured for ${courseSlug} in ${currency}` },
        { status: 400 },
      );
    }

    const amountCents = toSmallestUnit(amountMajor);
    const reference = `vta_${crypto.randomUUID()}`;
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const origin = `${proto}://${host}`;
    const callbackUrl = `${origin}/success`;

    await createEnrollment({
      email,
      fullname,
      phone: phone ?? null,
      courseSlug,
      currency,
      amountCents,
      paystackReference: reference,
      status: "pending",
    });

    const tx = await initializePaystackTransaction({
      email,
      fullname,
      phone,
      amountCents,
      currency,
      reference,
      courseSlug,
      callbackUrl,
    });

    return NextResponse.json({
      authorizationUrl: tx.data.authorization_url,
      reference,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to initialize transaction";
    return NextResponse.json(
      { error: message, details: String(err) },
      { status: 500 },
    );
  }
}
