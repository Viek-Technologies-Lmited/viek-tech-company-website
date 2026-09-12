/*
 * Moodle REST API client.
 *
 * Required Moodle configuration (Site Admin -> Plugins -> Web Services):
 *   1. Enable web services.
 *   2. Create a protocol: "REST".
 *   3. Create a service with functions:
 *        - core_user_create_users
 *        - core_user_get_users
 *        - core_role_get_roles
 *        - enrol_manual_enrol_users
 *   4. Create a token (Site Admin -> Plugins -> Web Services -> Manage tokens)
 *      for a user that has the `moodle/user:create`, `moodle/role:assign`,
 *      and manual enrolment capabilities.
 */

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;
const STUDENT_ROLE_ID = Number(process.env.MOODLE_STUDENT_ROLE_ID || 5);

function getMoodleConfig(): {
  url: string;
  token: string;
  studentRoleId: number;
  theme?: string;
} {
  if (!MOODLE_URL || !MOODLE_TOKEN) {
    throw new Error("MOODLE_URL and MOODLE_TOKEN must be set");
  }
  return {
    url: MOODLE_URL,
    token: MOODLE_TOKEN,
    studentRoleId: STUDENT_ROLE_ID,
    theme: process.env.MOODLE_THEME || undefined,
  };
}

export interface MoodleUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  idnumber: string;
  auth: string;
}

export interface MoodleCourse {
  id: number;
  shortname: string;
  fullname: string;
}

function buildMoodleQuery(params: Record<string, unknown>, prefix = ""): string {
  const pairs: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (value === null || value === undefined) continue;
    if (typeof value === "object" && !Array.isArray(value)) {
      pairs.push(buildMoodleQuery(value as Record<string, unknown>, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v !== null && v !== undefined) {
          pairs.push(
            buildMoodleQuery(
              Array.isArray(v) || (typeof v === "object" && v !== null)
                ? (v as Record<string, unknown>)
                : { "": v },
              `${fullKey}[${i}]`,
            ),
          );
        }
      });
    } else {
      pairs.push(
        `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`,
      );
    }
  }
  return pairs.join("&");
}

async function moodleRequest<T>(
  wsfunction: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const cfg = getMoodleConfig();
  const base = `${cfg.url.replace(/\/$/, "")}/webservice/rest/server.php`;
  const query = buildMoodleQuery({
    wstoken: cfg.token,
    wsfunction,
    moodlewsrestformat: "json",
    ...params,
  });
  const url = `${base}?${query}`;
  const res = await fetch(url, { method: "GET" });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Moodle API error: ${res.status} ${res.statusText}`);
  }
  const data = (text === "null" ? {} : JSON.parse(text)) as T & {
    exception?: string;
    errorcode?: string;
    message?: string;
  };

  if (data.exception || data.errorcode) {
    throw new Error(
      `Moodle error (${data.errorcode || data.exception}): ${data.message}`,
    );
  }
  return data as T;
}

function generatePassword(): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!-#*";

  let pwd = "";
  pwd += upper.charAt(Math.floor(Math.random() * upper.length));
  pwd += lower.charAt(Math.floor(Math.random() * lower.length));
  pwd += digits.charAt(Math.floor(Math.random() * digits.length));
  pwd += special.charAt(Math.floor(Math.random() * special.length));

  const all = upper + lower + digits + special;
  for (let i = 0; i < 12; i++) {
    pwd += all.charAt(Math.floor(Math.random() * all.length));
  }

  return pwd;
}

function toSafeUsername(email: string, suffix: string): string {
  const local =
    email.split("@")[0].replace(/[^a-z0-9._-]+/gi, "").toLowerCase() || "user";
  const short = (suffix || Math.random().toString(36).slice(2, 6)).slice(0, 6).toLowerCase();
  let name = `${local}-${short}`;
  if (!/^[a-z]/.test(name)) name = `u_${name}`;
  return name.slice(0, 60);
}

export async function findUserByEmail(email: string): Promise<MoodleUser | null> {
  const data = await moodleRequest<{ users?: MoodleUser[] }>("core_user_get_users", {
    "criteria[0][key]": "email",
    "criteria[0][value]": email,
  });
  return data?.users?.[0] ?? null;
}

export interface CreateUserResult {
  user: MoodleUser;
  password: string;
}

export async function createMoodleUser(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  idNumber?: string;
}): Promise<CreateUserResult> {
  const password = generatePassword();
  const username = toSafeUsername(input.email, input.idNumber || "");
  const data = await moodleRequest<MoodleUser[] | { users?: MoodleUser[] }>(
    "core_user_create_users",
    {
      users: [
        {
          username,
          email: input.email,
          firstname: input.firstName,
          lastname: input.lastName,
          auth: "manual",
          password,
          idnumber: input.idNumber || username,
          phone1: input.phone,
        },
      ],
    },
  );
  const user = (Array.isArray(data) ? data[0] : data?.users?.[0]);
  if (!user) throw new Error("Moodle: user creation returned no user");
  return { user, password };
}

async function setUserTheme(userId: number, theme: string): Promise<void> {
  try {
    await moodleRequest("core_user_set_user_preferences", {
      preferences: [{ name: "theme", value: theme, userid: userId }],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[moodle] could not set theme preference "${theme}" for user ${userId}: ${message}`,
    );
  }
}

export async function getStudentRoleId(): Promise<number> {
  try {
    const data = await moodleRequest<{ roles?: Array<{ id: number; shortname: string }> }>(
      "core_role_get_roles",
      {},
    );
    const found = data?.roles?.find((r) => r.shortname === "student");
    if (found) return found.id;
  } catch {
    // fall back to env-configured role id
  }
  return STUDENT_ROLE_ID;
}

export interface EnrollResult {
  enrolled: boolean;
  existed: boolean;
  user: MoodleUser;
  roleId: number;
  password: string | null;
}

export async function onboardStudent(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  courseId: number;
  idNumber?: string;
}): Promise<EnrollResult> {
  const existing = await findUserByEmail(input.email);
  let user: MoodleUser;
  let createdPassword: string | null = null;
  let existed = false;

  if (existing) {
    user = existing;
    existed = true;
  } else {
    const created = await createMoodleUser({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      idNumber: input.idNumber,
    });
    user = created.user;
    createdPassword = created.password;

    const moodleCfg = getMoodleConfig();
    if (moodleCfg.theme) {
      await setUserTheme(user.id, moodleCfg.theme);
    }
  }

  const roleId = await getStudentRoleId();
  await moodleRequest("enrol_manual_enrol_users", {
    enrolments: [
      {
        roleid: roleId,
        userid: user.id,
        courseid: input.courseId,
      },
    ],
  });

  return { enrolled: true, existed, user, roleId, password: createdPassword };
}
