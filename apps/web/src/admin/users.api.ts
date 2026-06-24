export interface ManagedUserDto {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "user";
  isActive: boolean;
  validFrom: string;
  validUntil: string | null;
  mustChangePassword: boolean;
  version: number;
}

export async function listUsers(): Promise<ManagedUserDto[]> {
  const response = await fetch("/api/admin/users", { credentials: "include", cache: "no-store" });
  if (!response.ok) throw new Error("无法加载用户列表。");
  const data = await response.json() as { items: ManagedUserDto[] };
  return data.items;
}

async function adminRequest<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, credentials: "include", headers: { "content-type": "application/json", ...init.headers } });
  const payload = await response.json().catch(() => null) as T | { error?: { message?: string } } | null;
  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload ? payload.error?.message : null;
    throw new Error(message || "管理操作失败。");
  }
  return payload as T;
}

export function createUser(input: { username: string; displayName: string; temporaryPassword: string; validFrom: string; validUntil: string | null }) {
  return adminRequest<ManagedUserDto>("/api/admin/users", { method: "POST", body: JSON.stringify(input) });
}

export function updateUser(id: string, input: { displayName?: string; isActive?: boolean; validFrom?: string; validUntil?: string | null; version: number }) {
  return adminRequest<ManagedUserDto>(`/api/admin/users/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function resetUserPassword(id: string, temporaryPassword: string, version: number) {
  return adminRequest<ManagedUserDto>(`/api/admin/users/${encodeURIComponent(id)}/reset-password`, { method: "POST", body: JSON.stringify({ temporaryPassword, version }) });
}

export function revokeUserSessions(id: string) {
  return adminRequest<{ status: true }>(`/api/admin/users/${encodeURIComponent(id)}/revoke-sessions`, { method: "POST", body: "{}" });
}
