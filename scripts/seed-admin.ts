import { createUser } from "../lib/db";
import bcrypt from "bcryptjs";

async function seed() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await createUser({
    email: "admin@viektech.com",
    name: "Admin",
    passwordHash,
    role: "admin",
  });

  console.log("Admin user created:", user);
}

seed().catch(console.error);