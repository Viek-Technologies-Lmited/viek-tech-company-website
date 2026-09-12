import crypto from "crypto";

const PAYSTACK_BASE = "https://api.paystack.co";

function secret(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set");
  return key;
}

export interface CheckoutInput {
  email: string;
  fullname: string;
  phone?: string;
  amountCents: number;
  currency: "NGN" | "USD";
  reference: string;
  courseSlug: string;
  callbackUrl: string;
}

export interface InitTxResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function initializePaystackTransaction(
  input: CheckoutInput,
): Promise<InitTxResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret()}`,
    },
    body: JSON.stringify({
      email: input.email,
      amount: input.amountCents,
      currency: input.currency,
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: {
        fullname: input.fullname,
        phone: input.phone || "",
        course_slug: input.courseSlug,
        currency: input.currency,
      },
    }),
  });

  const body = await res.json();
  if (!res.ok || body?.status === false) {
    throw new Error(
      `Paystack initialize failed: ${body?.message || res.statusText}`,
    );
  }
  return body as InitTxResponse;
}

export interface VerifiedTransaction {
  status: boolean;
  message: string;
  data: {
    id: number;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    customer: { email: string };
    metadata: { fullname?: string; phone?: string; course_slug?: string; currency?: string };
    paid_at: string | null;
  };
}

export async function verifyPaystackTransaction(
  reference: string,
): Promise<VerifiedTransaction> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret()}` },
  });

  const body = await res.json();
  if (!res.ok || body?.status === false) {
    throw new Error(`Paystack verify failed: ${body?.message || res.statusText}`);
  }
  return body as VerifiedTransaction;
}

export function verifyPaystackWebhookSignature(
  payload: string,
  signature: string | null | undefined,
): boolean {
  if (!signature) return false;
  const hash = crypto
    .createHmac("sha512", secret())
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
}
