import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface WelcomeEmailInput {
  to: string;
  fullName: string;
  courseSlug: string;
  moodleUrl: string;
  username: string;
  password: string | null;
  isNew: boolean;
}

export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<void> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set; skipping welcome email");
    return;
  }

  const courseLabel = input.courseSlug.replace(/-/g, " ");
  const loginUrl = input.moodleUrl.replace(/\/$/, "");
  const resetUrl = `${loginUrl}/login/index.php`;

  const subject = input.isNew
    ? "Your ViekTech Academy LMS account is ready 🎓"
    : "Your ViekTech Academy enrollment is complete 🎓";

  const html = `
<!doctype html>
<html lang="en">
  <body style="font-family:system-ui,Arial,sans-serif;color:#111;margin:0;padding:24px;background:#f5f7fb;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,.06);">
      <h1 style="margin:0 0 16px;font-size:22px;">Hi ${input.fullName || "there"},</h1>
      ${input.isNew
        ? `<p style="margin:0 0 12px;line-height:1.5;">
          Your payment was confirmed and a student account has been created for you on the
          <strong>ViekTech Academy LMS</strong>. Here are your login details:
        </p>
        <table style="margin:16px 0;border-collapse:collapse;">
          <tr><td style="padding:4px 8px 4px 0;font-weight:600;">Username:</td><td style="padding:4px 0;">${input.username}</td></tr>
          <tr><td style="padding:4px 8px 4px 0;font-weight:600;">Password:</td><td style="padding:4px 0;font-family:monospace;word-break:break-all;">${input.password}</td></tr>
        </table>
        <p style="margin:0 0 12px;line-height:1.5;">
          You&rsquo;ve been enrolled in <strong>${courseLabel}</strong>. We recommend changing your password immediately after first login.
        </p>`
        : `<p style="margin:0 0 12px;line-height:1.5;">
          Your payment was confirmed and your <strong>existing</strong> account has been enrolled in
          <strong> ${courseLabel}</strong> on the ViekTech Academy LMS.
        </p>`}
      <p style="margin:0 0 20px;line-height:1.5;">
        Open the LMS: <a href="${loginUrl}" style="color:#2563eb;">${loginUrl}</a>
      </p>
      ${input.isNew
        ? `<p style="margin:0 0 12px;line-height:1.5;color:#475569;font-size:13px;">
            Prefer not to use the emailed password? You can reset it anytime with
            <a href="${resetUrl}" target="_blank" style="color:#2563eb;">Forgotten your username or password?</a>.
          </p>`
        : ""}
      <p style="margin:24px 0 0;color:#64748b;font-size:13px;">
        — The ViekTech Academy Team
      </p>
    </div>
  </body>
</html>
`;

  const from = process.env.RESEND_FROM || "Academy <onboarding@viektech.com>";

  const result = await resend.emails.send({
    from,
    to: [input.to],
    subject,
    html,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message || JSON.stringify(result.error)}`);
  }
}
