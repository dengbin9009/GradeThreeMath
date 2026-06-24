import http from "node:http";
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";

const blueprint = readFileSync(new URL("../../data/grade3-math-blueprint.json", import.meta.url), "utf8");
const adminSession = {
  user: { id: "demo", username: "student01", name: "小明", role: "admin", validFrom: "2026-01-01T00:00:00.000Z", validUntil: null, mustChangePassword: false },
  session: { expiresAt: "2027-01-01T00:00:00.000Z" }
};
const firstLoginSession = {
  user: { id: "first-login", username: "first-login", name: "第一次登录学生", role: "user", validFrom: "2026-01-01T00:00:00.000Z", validUntil: null, mustChangePassword: true },
  session: { expiresAt: "2027-01-01T00:00:00.000Z" }
};

const users = [
  {
    id: "student-01",
    username: "student01",
    displayName: "小明",
    role: "user",
    isActive: true,
    validFrom: "2026-01-01T00:00:00.000Z",
    validUntil: null,
    mustChangePassword: false,
    version: 1
  }
];

function readCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie ?? "")
      .split(";")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const [key, ...value] = pair.split("=");
        return [key, decodeURIComponent(value.join("="))];
      })
  );
}

function sessionFor(req) {
  const mode = readCookies(req)["e2e-auth-mode"] ?? "admin";
  if (mode === "anonymous") return null;
  if (mode === "first-login") return firstLoginSession;
  return adminSession;
}

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    ...headers
  });
  res.end(typeof payload === "string" ? payload : JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

function updateUser(id, patch) {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) return null;
  users[index] = { ...users[index], ...patch, version: users[index].version + 1 };
  return users[index];
}

const api = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://127.0.0.1:4174");

    if (req.method === "GET" && url.pathname === "/api/auth/get-session") {
      const session = sessionFor(req);
      if (!session) return sendJson(res, 401, { error: { message: "Unauthenticated" } });
      return sendJson(res, 200, session);
    }

    if (req.method === "POST" && url.pathname === "/api/auth/sign-in/username") {
      const body = await readBody(req);
      if (body.username === "expired-user") {
        return sendJson(res, 403, { error: { message: "Account unavailable" } });
      }
      const nextMode = body.username === "first-login" ? "first-login" : "admin";
      return sendJson(res, 200, { status: true }, {
        "set-cookie": `e2e-auth-mode=${nextMode}; Path=/; SameSite=Lax`
      });
    }

    if (req.method === "POST" && url.pathname === "/api/account/change-password") {
      return sendJson(res, 200, { status: true }, {
        "set-cookie": "e2e-auth-mode=admin; Path=/; SameSite=Lax"
      });
    }

    if (req.method === "POST" && url.pathname === "/api/auth/sign-out") {
      return sendJson(res, 200, { status: true }, {
        "set-cookie": "e2e-auth-mode=anonymous; Path=/; SameSite=Lax"
      });
    }

    if (req.method === "GET" && url.pathname === "/api/blueprint") {
      return sendJson(res, 200, blueprint);
    }

    if (req.method === "GET" && url.pathname === "/api/admin/users") {
      return sendJson(res, 200, { items: users });
    }

    if (req.method === "POST" && url.pathname === "/api/admin/users") {
      const body = await readBody(req);
      const user = {
        id: `user-${Date.now()}-${users.length}`,
        username: body.username,
        displayName: body.displayName,
        role: "user",
        isActive: true,
        validFrom: body.validFrom,
        validUntil: body.validUntil ?? null,
        mustChangePassword: true,
        version: 1
      };
      users.unshift(user);
      return sendJson(res, 201, user);
    }

    const updateMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
    if (req.method === "PATCH" && updateMatch) {
      const updated = updateUser(updateMatch[1], await readBody(req));
      if (!updated) return sendJson(res, 404, { error: { message: "User not found" } });
      return sendJson(res, 200, updated);
    }

    const resetMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)\/reset-password$/);
    if (req.method === "POST" && resetMatch) {
      const updated = updateUser(resetMatch[1], { mustChangePassword: true });
      if (!updated) return sendJson(res, 404, { error: { message: "User not found" } });
      return sendJson(res, 200, { status: true, user: updated });
    }

    const revokeMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)\/revoke-sessions$/);
    if (req.method === "POST" && revokeMatch) {
      return sendJson(res, 200, { status: true });
    }

    return sendJson(res, 404, {});
  } catch (error) {
    return sendJson(res, 500, { error: { message: error instanceof Error ? error.message : "Server error" } });
  }
});

api.listen(4174, "127.0.0.1");
const vite = spawn("npm", ["run", "dev", "-w", "@math/web"], { stdio: "inherit" });
process.on("SIGTERM", () => { vite.kill("SIGTERM"); api.close(); });
