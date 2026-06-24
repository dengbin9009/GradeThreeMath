<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authClient } from "../auth/auth-client";
import { useAuthStore } from "../app/stores/auth.store";

const currentPassword = ref("");
const newPassword = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();
const auth = useAuthStore();

async function submit() {
  if (newPassword.value.length < 15) { error.value = "新密码至少需要 15 个字符。"; return; }
  loading.value = true;
  try {
    await authClient.changePassword(currentPassword.value, newPassword.value);
    auth.hydrated = false;
    await auth.hydrate();
    await router.replace("/learn");
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : "无法修改密码。";
  } finally { loading.value = false; }
}
</script>

<template>
  <main class="password-page">
    <form class="password-panel" @submit.prevent="submit">
      <h1>先设置自己的密码</h1>
      <p>临时密码只能使用一次。新密码至少 15 个字符，可以使用一段容易记住的短语。</p>
      <label for="current-password">临时密码</label>
      <input id="current-password" v-model="currentPassword" type="password" autocomplete="current-password" required />
      <label for="new-password">新密码</label>
      <input id="new-password" v-model="newPassword" type="password" autocomplete="new-password" required />
      <p v-if="error" role="alert" class="error">{{ error }}</p>
      <button type="submit" :disabled="loading">{{ loading ? "正在保存…" : "保存并开始学习" }}</button>
    </form>
  </main>
</template>

<style scoped>
.password-page { min-height: 100vh; display: grid; place-items: center; padding: 20px; }
.password-panel { width: min(520px, 100%); display: grid; gap: 12px; padding: 28px; background: white; border: 1px solid var(--color-line); border-radius: var(--radius-panel); }
h1, p { margin: 0 0 8px; }
p { color: var(--color-muted); }
label { font-weight: 700; }
input { min-height: 48px; border: 1px solid var(--color-line); border-radius: 6px; padding: 0 12px; }
button { border: 0; border-radius: 6px; background: var(--color-primary); color: white; font-weight: 800; }
.error { color: var(--color-danger); }
</style>
