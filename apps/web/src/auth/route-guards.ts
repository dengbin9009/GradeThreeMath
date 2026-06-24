import type { Router } from "vue-router";
import { useAuthStore } from "../app/stores/auth.store";

interface RouteAccessInput { path: string; public: boolean; requiresAdmin: boolean }
interface RouteUser { role: "admin" | "user"; mustChangePassword: boolean }

export function resolveRouteAccess(route: RouteAccessInput, user: RouteUser | null) {
  if (route.public) return true;
  if (!user) return { name: "login", query: { redirect: route.path } };
  if (user.mustChangePassword && route.path !== "/change-password") return { name: "change-password" };
  if (route.requiresAdmin && user.role !== "admin") return { name: "library" };
  return true;
}

export function installAuthGuards(router: Router) {
  router.beforeEach(async (to) => {
    const auth = useAuthStore();
    await auth.hydrate();
    if (to.meta.public && auth.user && to.name === "login") return { name: auth.user.mustChangePassword ? "change-password" : "library" };
    return resolveRouteAccess({ path: to.fullPath, public: Boolean(to.meta.public), requiresAdmin: Boolean(to.meta.requiresAdmin) }, auth.user);
  });
}
