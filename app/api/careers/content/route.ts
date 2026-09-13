import { getSiteContent, saveSiteContent } from "@/lib/db";
import { defaultContent, type JobApplication } from "@/lib/site-content";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({
      content: content ? { ...defaultContent, ...content } : defaultContent,
    });
  } catch (error) {
    console.error("Error loading careers content:", error);
    return NextResponse.json(
      { error: "Failed to load careers content" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const application = (await request.json()) as JobApplication;

    if (
      !application.id ||
      !application.jobId ||
      !application.jobTitle ||
      !application.fullName ||
      !application.email ||
      !application.phone
    ) {
      return NextResponse.json(
        { error: "Missing required application fields" },
        { status: 400 },
      );
    }

    const existingContent = await getSiteContent();
    const content = existingContent
      ? { ...defaultContent, ...existingContent }
      : defaultContent;
    const applications = [...(content.applications || []), application];
    const success = await saveSiteContent({ ...content, applications });

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error saving job application:", error);
    return NextResponse.json(
      { error: "Failed to save job application" },
      { status: 500 },
    );
  }
}
