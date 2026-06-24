import { defineStore } from "pinia";
import { authClient, type SafeSessionProfile } from "../../auth/auth-client";

export const useAuthStore = defineStore("auth", {
  state: () => ({ profile: null as SafeSessionProfile | null, loading: false, hydrated: false, error: "" }),
  getters: {
    user: (state) => state.profile?.user ?? null,
    isAuthenticated: (state) => Boolean(state.profile),
    isAdmin: (state) => state.profile?.user.role === "admin"
  },
  actions: {
    async hydrate() {
      if (this.hydrated) return;
      this.loading = true;
      try { this.profile = await authClient.getSession(); } catch { this.profile = null; }
      finally { this.loading = false; this.hydrated = true; }
    },
    async login(username: string, password: string) {
      this.loading = true;
      this.error = "";
      try { this.profile = await authClient.signIn(username, password); this.hydrated = true; }
      catch { this.error = "登录名、密码或账号状态不可用。"; throw new Error(this.error); }
      finally { this.loading = false; }
    },
    async logout() {
      try { await authClient.signOut(); }
      finally { this.profile = null; this.hydrated = true; }
    }
  }
});
