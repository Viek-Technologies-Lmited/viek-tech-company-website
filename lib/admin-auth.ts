// Simple admin credentials - in production, use proper authentication
export const ADMIN_CREDENTIALS = [
  {
    username: "Viektech",
    password: "123456",
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
