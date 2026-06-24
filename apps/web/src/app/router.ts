import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouterHistory,
  type RouteRecordRaw
} from "vue-router";

const validModuleId = (value: unknown): boolean => {
  if (typeof value !== "string" || !/^M\d{2}$/.test(value)) return false;
  const numeric = Number(value.slice(1));
  return numeric >= 1 && numeric <= 39;
};

const routes: RouteRecordRaw[] = [
  { path: "/login", name: "login", component: () => import("../views/LoginView.vue"), meta: { public: true } },
  { path: "/change-password", name: "change-password", component: () => import("../views/ChangePasswordView.vue") },
  { path: "/learn", name: "library", component: () => import("../views/LibraryView.vue") },
  {
    path: "/learn/:archetypeId/:variantId?",
    name: "lesson",
    component: () => import("../views/LessonView.vue"),
    beforeEnter: (to) => validModuleId(to.params.archetypeId) ? true : { name: "library" }
  },
  { path: "/admin/users", name: "admin-users", component: () => import("../views/AdminUsersView.vue"), meta: { requiresAdmin: true } },
  { path: "/:pathMatch(.*)*", redirect: { name: "library" } }
];

export function createAppRouter(mode: "web" | "memory" = "web") {
  const history: RouterHistory = mode === "memory" ? createMemoryHistory() : createWebHistory();
  return createRouter({ history, routes });
}

export const router = createAppRouter();

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
    requiresAdmin?: boolean;
  }
}
