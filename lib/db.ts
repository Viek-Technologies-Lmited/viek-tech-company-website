import { neon } from "@neondatabase/serverless";

type SqlFn = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<unknown>;

let cachedSql: SqlFn | null = null;

function getSql(): SqlFn {
  if (!cachedSql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Configure it from your Vercel Postgres / Neon integration.",
      );
    }
    cachedSql = neon(connectionString);
  }
  return cachedSql;
}

export type EnrollmentStatus =
  | "pending"
  | "paid"
  | "moodle_enrolled"
  | "failed";

export interface Enrollment {
  id: string;
  email: string;
  fullname: string;
  phone: string | null;
  course_slug: string;
  currency: string;
  amount_cents: number;
  paystack_reference: string;
  moodle_userid: number | null;
  status: EnrollmentStatus;
  created_at: Date;
  updated_at: Date;
}

let initialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (initialized) return;
  if (!initPromise) {
    initPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS enrollments (
          id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email              VARCHAR(254) NOT NULL,
          fullname           VARCHAR(254) NOT NULL,
          phone              VARCHAR(40),
          course_slug        VARCHAR(100)  NOT NULL,
          currency           CHAR(3)       NOT NULL,
          amount_cents       BIGINT        NOT NULL,
          paystack_reference VARCHAR(255)  NOT NULL UNIQUE,
          moodle_userid      INTEGER,
          status             VARCHAR(30)   NOT NULL DEFAULT 'pending',
          created_at         TIMESTAMPTZ   NOT NULL DEFAULT now(),
          updated_at         TIMESTAMPTZ   NOT NULL DEFAULT now()
        );
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_enrollments_email
        ON enrollments(email);
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_enrollments_ref
        ON enrollments(paystack_reference);
      `;
      initialized = true;
    })();
  }
  return initPromise;
}

export async function createEnrollment(params: {
  email: string;
  fullname: string;
  phone?: string | null;
  courseSlug: string;
  currency: string;
  amountCents: number;
  paystackReference: string;
  status?: EnrollmentStatus;
}): Promise<Enrollment> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO enrollments
      (email, fullname, phone, course_slug, currency, amount_cents, paystack_reference, status)
    VALUES
      (${params.email}, ${params.fullname}, ${params.phone ?? null}, ${params.courseSlug},
       ${params.currency}, ${params.amountCents}, ${params.paystackReference},
       ${params.status ?? "pending"})
    ON CONFLICT (paystack_reference) DO UPDATE
      SET email = EXCLUDED.email,
          fullname = EXCLUDED.fullname,
          phone = EXCLUDED.phone,
          course_slug = EXCLUDED.course_slug,
          currency = EXCLUDED.currency,
          amount_cents = EXCLUDED.amount_cents,
          status = EXCLUDED.status,
          updated_at = now()
    RETURNING *
  `) as unknown as Enrollment[];
  return rows[0];
}

export async function getEnrollmentByReference(
  reference: string,
): Promise<Enrollment | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM enrollments WHERE paystack_reference = ${reference} LIMIT 1
  `) as unknown as Enrollment[];
  return rows.length ? rows[0] : null;
}

export async function markEnrollmentPaid(
  reference: string,
): Promise<Enrollment | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    UPDATE enrollments
    SET status = 'paid', updated_at = now()
    WHERE paystack_reference = ${reference}
    RETURNING *
  `) as unknown as Enrollment[];
  return rows.length ? rows[0] : null;
}

export async function linkMoodleUser(
  reference: string,
  moodleUserId: number,
): Promise<Enrollment | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    UPDATE enrollments
    SET moodle_userid = ${moodleUserId},
        status = 'moodle_enrolled',
        updated_at = now()
    WHERE paystack_reference = ${reference}
    RETURNING *
  `) as unknown as Enrollment[];
  return rows.length ? rows[0] : null;
}
