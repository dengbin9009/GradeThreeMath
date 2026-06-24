import { z } from "zod";

const environmentSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required").refine((value) => value.startsWith("postgres://") || value.startsWith("postgresql://"), "DATABASE_URL must use PostgreSQL"),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must contain at least 32 characters"),
  APP_ORIGIN: z.url("APP_ORIGIN must be an absolute URL").refine((value) => {
    const url = new URL(value);
    return url.pathname === "/" && !url.search && !url.hash;
  }, "APP_ORIGIN must contain only an origin"),
  WEB_DIST_DIR: z.string().min(1, "WEB_DIST_DIR is required").default(new URL("../../../web/dist", import.meta.url).pathname),
  PORT: z.coerce.number().int().min(1).max(65535).default(4174),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

export type ApiEnvironment = z.infer<typeof environmentSchema>;

export function parseEnvironment(input: Record<string, unknown>): ApiEnvironment {
  return environmentSchema.parse(input);
}
