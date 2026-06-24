import { createHash } from "node:crypto";

export function normalizeUsername(raw: string): string {
  const username = raw.trim().toLocaleLowerCase("en-US");
  if (username.length < 3 || username.length > 30) throw new Error("Username must contain 3 to 30 characters");
  if (!/^[a-z0-9_.]+$/.test(username)) throw new Error("Username may contain letters, numbers, underscores and dots only");
  return username;
}

export function internalEmailForUsername(raw: string): string {
  const username = normalizeUsername(raw);
  const digest = createHash("sha256").update(username).digest("hex").slice(0, 24);
  return `${digest}@users.invalid`;
}
