<script setup lang="ts">
import { LogOut, Shield } from "@lucide/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../app/stores/auth.store";
const auth = useAuthStore();
const router = useRouter();
async function logout() { await auth.logout(); await router.replace("/login"); }
</script>

<template>
  <div class="account-menu">
    <div><strong>{{ auth.user?.displayName }}</strong><small>{{ auth.user?.username }}</small></div>
    <RouterLink v-if="auth.isAdmin" to="/admin/users" title="用户管理"><Shield :size="19" /><span>用户管理</span></RouterLink>
    <button type="button" title="退出登录" @click="logout"><LogOut :size="19" /><span>退出</span></button>
  </div>
</template>

<style scoped>
.account-menu { display: flex; align-items: center; gap: 8px; }.account-menu > div { display: grid; text-align: right; }.account-menu small { color: var(--color-muted); }.account-menu a, .account-menu button { min-width: 42px; min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 6px; background: white; text-decoration: none; }.account-menu button { cursor: pointer; }.account-menu svg + span { display: none; }
@media (max-width: 620px) { .account-menu > div { display: none; } }
</style>
