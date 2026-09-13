import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSiteContent } from "@/lib/db";
import { defaultContent } from "@/lib/site-content";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login?callbackUrl=/admin/dashboard");
  }

  const dbContent = await getSiteContent();
  // Handle case where DB row exists but data is empty object {}
  const content = dbContent && Object.keys(dbContent).length > 0 ? dbContent : defaultContent;

  return <AdminDashboardClient user={session.user} initialContent={content} />;
}