import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import type { ApiEnvironment } from "../config/env";
import type { MathDatabase } from "../db/client";
import { authSchema } from "../db/schema/auth";

export const betterAuthRateLimitConfig = {
  enabled: true,
  storage: "database" as const,
  window: 15 * 60,
  max: 30,
  customRules: {
    "/sign-in/username": false,
    "/get-session": false
  }
} as const;

export function createMathAuth(db: MathDatabase, environment: ApiEnvironment) {
  return betterAuth({
    appName: "数学母题学习工作台",
    baseURL: environment.APP_ORIGIN,
    basePath: "/api/auth",
    secret: environment.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
    trustedOrigins: [environment.APP_ORIGIN],
    disabledPaths: ["/sign-up/email", "/is-username-available"],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 15,
      autoSignIn: false
    },
    session: {
      expiresIn: 12 * 60 * 60,
      updateAge: 5 * 60
    },
    rateLimit: betterAuthRateLimitConfig,
    advanced: {
      useSecureCookies: environment.NODE_ENV === "production",
      defaultCookieAttributes: {
        httpOnly: true,
        sameSite: "lax",
        secure: environment.NODE_ENV === "production"
      }
    },
    user: {
      additionalFields: {
        isActive: { type: "boolean", required: true, defaultValue: true, input: false },
        validFrom: { type: "date", required: true, input: false },
        validUntil: { type: "date", required: false, input: false },
        mustChangePassword: { type: "boolean", required: true, defaultValue: true, input: false },
        version: { type: "number", required: true, defaultValue: 1, input: false }
      }
    },
    plugins: [
      username({ minUsernameLength: 3, maxUsernameLength: 30 }),
      admin({ defaultRole: "user", adminRoles: ["admin"] })
    ]
  });
}

export type MathAuth = ReturnType<typeof createMathAuth>;
