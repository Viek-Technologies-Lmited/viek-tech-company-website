import { auth } from "./auth";

export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === "admin";
}

export async function requireAdmin(): Promise<{ user: { id: string; email: string; name?: string | null; role: string } }> {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return { user: session.user };
}