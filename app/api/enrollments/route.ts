import { NextRequest, NextResponse } from "next/server";
import { getEnrollmentByReference } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Missing 'reference' query parameter" },
      { status: 400 },
    );
  }

  try {
    const enrollment = await getEnrollmentByReference(reference);
    if (!enrollment) {
      return NextResponse.json({ enrollment: null }, { status: 404 });
    }
    return NextResponse.json({ enrollment });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch enrollment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
