// Simple admin credentials - in production, use proper authentication
export const ADMIN_CREDENTIALS = [
  {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
  {
    username: process.env.ADMIN2_USERNAME!,
    password: process.env.ADMIN2_PASSWORD!,
  },
];

export function validateCredentials(
  username: string,
  password: string,
): boolean {
  return ADMIN_CREDENTIALS.some(
    (cred) =>
      cred.username.toLowerCase() === username.toLowerCase() &&
      cred.password === password,
  );
}