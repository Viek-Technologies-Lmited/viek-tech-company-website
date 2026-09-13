import { getSiteContent, saveSiteContent } from "@/lib/db";
import { defaultContent } from "@/lib/site-content";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const existingContent = await getSiteContent();
    const content = existingContent
      ? { ...defaultContent, ...existingContent }
      : defaultContent;
    const newMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      timestamp: Date.now(),
      read: false,
    };

    await saveSiteContent({
      ...content,
      messages: [...(content.messages || []), newMessage],
    });

    const hasEmailConfig =
      process.env.ZOHO_SMTP_USER &&
      process.env.ZOHO_SMTP_PASS &&
      process.env.ZOHO_SMTP_FROM &&
      process.env.NOTIFY_TO;

    if (hasEmailConfig) {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_SMTP_USER,
          pass: process.env.ZOHO_SMTP_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.ZOHO_SMTP_FROM,
          to: process.env.NOTIFY_TO,
          replyTo: email,
          subject: `New Contact Message: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        });
      } catch (emailError) {
        console.error("Contact notification email failed:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact message submission failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 500 },
    );
  }
}
