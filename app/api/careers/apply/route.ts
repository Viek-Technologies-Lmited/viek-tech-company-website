import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string | null;
    const coverLetter = formData.get("coverLetter") as string | null;
    const resumeFile = formData.get("resume") as File | null;

    // Validate required fields
    if (!fullName || !email || !phone || !jobTitle) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Set up Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
      },
    });

    // Prepare attachments
    const attachments = [];
    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      });
    }

    // Send email notification
    await transporter.sendMail({
      from: `"Viek Careers" <${process.env.ZOHO_SMTP_FROM}>`,
      to: process.env.NOTIFY_TO,
      replyTo: email,
      subject: `New Application: ${jobTitle} — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">New Job Application</h2>
          
          <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555; width: 120px;">Position:</td>
              <td style="padding: 8px; color: #333;">${jobTitle}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Candidate:</td>
              <td style="padding: 8px; color: #333;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px; color: #333;">${phone}</td>
            </tr>
            ${
              portfolioUrl
                ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Portfolio:</td>
              <td style="padding: 8px; color: #333;"><a href="${portfolioUrl}" target="_blank">${portfolioUrl}</a></td>
            </tr>
            `
                : ""
            }
          </table>

          ${
            coverLetter
              ? `
          <div style="margin-top: 20px;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Cover Letter / Pitch</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap; margin-top: 10px;">${coverLetter}</p>
          </div>
          `
              : ""
          }

          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            Resume attached. Please review the application in the admin dashboard or reply directly to ${email}.
          </p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Application email notification sent successfully",
    });
  } catch (err) {
    console.error("Application email notification failed:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to send notification email",
      },
      { status: 500 },
    );
  }
}
