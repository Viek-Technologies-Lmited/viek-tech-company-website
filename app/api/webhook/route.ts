import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackWebhookSignature, verifyPaystackTransaction } from "@/lib/paystack";
import { getCoursePricing } from "@/lib/academy-pricing";
import {
  createEnrollment,
  getEnrollmentByReference,
  markEnrollmentPaid,
  linkMoodleUser,
} from "@/lib/db";
import { onboardStudent } from "@/lib/moodle";
import { sendWelcomeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function splitName(fullname: string): { firstName: string; lastName: string } {
  if (!fullname) return { firstName: "Viek", lastName: "Student" };
  const parts = fullname.trim().split(/\s+/);
  const firstName = parts[0] || "Viek";
  const lastName = parts.slice(1).join(" ") || "Student";
  return { firstName, lastName };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!verifyPaystackWebhookSignature(rawBody, signature)) {
    console.error("[webhook] Invalid Paystack signature");
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (event.event !== "charge.success") {
    return new NextResponse("OK", { status: 200 });
  }

  const data = event.data;
  const reference = typeof data?.reference === "string" ? data.reference : "";
  if (!reference) {
    return new NextResponse("Missing reference", { status: 400 });
  }

  // Reconcile: verify the charge with Paystack before acting on it.
  let verified;
  try {
    verified = await verifyPaystackTransaction(reference);
  } catch (err) {
    console.error("[webhook] Paystack verify failed:", err);
    return new NextResponse("Verification failed", { status: 500 });
  }

  const payment = verified.data;
  if (payment.status !== "success") {
    console.log(`[webhook] Payment ${reference} status=${payment.status}, skipping`);
    return new NextResponse("OK", { status: 200 });
  }

  const email = payment.customer?.email;
  const metadata = payment.metadata || {};
  const fullname: string = metadata.fullname || "";
  const courseSlug: string = metadata.course_slug || "";

  if (!email) {
    return new NextResponse("Missing customer email", { status: 400 });
  }

  try {
    // Ensure a record exists (e.g. retries after checkout route DB was wiped).
    let enrollment = await getEnrollmentByReference(reference);
    if (!enrollment) {
      enrollment = await createEnrollment({
        email,
        fullname,
        courseSlug,
        currency: metadata.currency || payment.currency || "NGN",
        amountCents: payment.amount || 0,
        paystackReference: reference,
        status: "pending",
      });
    }

    // Mark as paid first (idempotent on retries).
    await markEnrollmentPaid(reference);

    // Onboard to Moodle (idempotent: find existing user by email, re-enrol).
    const pricing = getCoursePricing(courseSlug);
    if (!pricing) {
      console.error(`[webhook] No pricing/course mapping for ${courseSlug}`);
      return new NextResponse("Unknown course", { status: 200 });
    }

    const { firstName, lastName } = splitName(fullname);
    const moodle = await onboardStudent({
      email,
      firstName,
      lastName,
      phone: metadata.phone,
      courseId: pricing.moodleCourseId,
      idNumber: enrollment.id,
    });

    if (moodle.user?.id) {
      await linkMoodleUser(reference, moodle.user.id);

      try {
        await sendWelcomeEmail({
          to: email,
          fullName: fullname,
          courseSlug: courseSlug,
          moodleUrl:
            process.env.NEXT_PUBLIC_MOODLE_URL || process.env.MOODLE_URL || "",
          username: moodle.user.username,
          password: moodle.password,
          isNew: !moodle.existed,
        });
        console.log(`[webhook] Welcome email sent to ${email}`);
      } catch (emailErr) {
        // Don't retry for email failures — enrollment is already complete.
        console.error("[webhook] Failed to send welcome email:", emailErr);
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err: unknown) {
    console.error("[webhook] Enrollment/Moodle failure:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
