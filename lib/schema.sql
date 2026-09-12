-- Vercel Postgres schema for ViekTech Academy enrollment tracking.
-- Apply once via the Vercel Postgres SQL editor / CLI:
--   vercel postgres connect <db-name> -f lib/schema.sql
-- (CREATE TABLE IF NOT EXISTS also runs lazily on first API call, see lib/db.ts.)

CREATE TABLE IF NOT EXISTS enrollments (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email              VARCHAR(254) NOT NULL,
  fullname           VARCHAR(254) NOT NULL,
  phone              VARCHAR(40),
  course_slug        VARCHAR(100)  NOT NULL,
  currency           CHAR(3)       NOT NULL,            -- 'NGN' | 'USD'
  amount_cents       BIGINT        NOT NULL,            -- smallest currency unit
  paystack_reference VARCHAR(255)  NOT NULL UNIQUE,
  moodle_userid      INTEGER,
  status             VARCHAR(30)   NOT NULL DEFAULT 'pending',
  -- pending | paid | moodle_enrolled | failed
  created_at         TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_email  ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_ref    ON enrollments(paystack_reference);

-- If the table already existed without the phone column, run:
-- ALTER TABLE enrollments ADD COLUMN phone VARCHAR(40);
