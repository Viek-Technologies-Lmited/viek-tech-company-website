import { createUser } from "../lib/db";
import bcrypt from "bcryptjs";

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set before seeding the admin account.",
    );
  }

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters long.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await createUser({
    email,
    name: "Admin",
    passwordHash,
    role: "admin",
  });

  console.log(`Admin account ready: ${user.email}`);
}

seed().catch(console.error);
