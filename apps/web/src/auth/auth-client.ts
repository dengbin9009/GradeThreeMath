export interface SafeUserProfile {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "user";
  status: string;
  validFrom: string;
  validUntil: string | null;
  mustChangePassword: boolean;
}

export interface SafeSessionProfile {
  user: SafeUserProfile;
  session: { expiresAt: string };
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, credentials: "include" });
  const payload = await response.json().catch(() => null) as T | { error?: { message?: string } } | null;
  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload ? payload.error?.message : null;
    throw new Error(message || "请求失败，请稍后重试。");
  }
  return payload as T;
}

export const authClient = {
  async signIn(username: string, password: string) {
    await requestJson("/api/auth/sign-in/username", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return this.getSession();
  },
  async getSession(): Promise<SafeSessionProfile | null> {
    const response = await fetch("/api/auth/get-session", { credentials: "include", cache: "no-store" });
    if (response.status === 401 || response.status === 404) return null;
    if (!response.ok) throw new Error("无法读取登录状态。");
    const payload = await response.json() as { user?: Record<string, unknown>; session?: { expiresAt: string } } | null;
    if (!payload?.user || !payload.session) return null;
    return {
      user: {
        id: String(payload.user.id),
        username: String(payload.user.username ?? ""),
        displayName: String(payload.user.name ?? payload.user.displayName ?? "用户"),
        role: payload.user.role === "admin" ? "admin" : "user",
        status: "active",
        validFrom: new Date(String(payload.user.validFrom)).toISOString(),
        validUntil: payload.user.validUntil ? new Date(String(payload.user.validUntil)).toISOString() : null,
        mustChangePassword: Boolean(payload.user.mustChangePassword)
      },
      session: payload.session
    };
  },
  async signOut() {
    await requestJson("/api/auth/sign-out", { method: "POST" });
  },
  async changePassword(currentPassword: string, newPassword: string) {
    await requestJson("/api/account/change-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }
};
