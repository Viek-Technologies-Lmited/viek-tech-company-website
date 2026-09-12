import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login?callbackUrl=/admin/dashboard");
  }
  return <AdminDashboardClient user={session.user} />;
}