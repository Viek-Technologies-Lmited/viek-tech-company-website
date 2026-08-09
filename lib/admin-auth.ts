// Simple admin credentials - in production, use proper authentication
export const ADMIN_CREDENTIALS = [
  {
    username: "Kenny",
    password: "********",
  },
  {
    username: "Viektech",
    password: "********",
  },
]

export function validateCredentials(username: string, password: string): boolean {
  return ADMIN_CREDENTIALS.some(
    (cred) => cred.username.toLowerCase() === username.toLowerCase() && cred.password === password
  )
}
