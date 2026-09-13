import { auth } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error loading site content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await request.json();
    const success = await saveSiteContent(content);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error saving site content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}