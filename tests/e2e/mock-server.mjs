import http from "node:http";
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";

const blueprint = readFileSync(new URL("../../data/grade3-math-blueprint.json", import.meta.url), "utf8");
const session = JSON.stringify({
  user: { id: "demo", username: "student01", name: "小明", role: "admin", validFrom: "2026-01-01T00:00:00.000Z", validUntil: null, mustChangePassword: false },
  session: { expiresAt: "2027-01-01T00:00:00.000Z" }
});

const api = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json; charset=utf-8");
  if (req.url === "/api/auth/get-session") return res.end(session);
  if (req.url === "/api/blueprint") return res.end(blueprint);
  if (req.url === "/api/auth/sign-out") return res.end(JSON.stringify({ status: true }));
  res.statusCode = 404;
  res.end("{}");
});

api.listen(4174, "127.0.0.1");
const vite = spawn("npm", ["run", "dev", "-w", "@math/web"], { stdio: "inherit" });
process.on("SIGTERM", () => { vite.kill("SIGTERM"); api.close(); });
