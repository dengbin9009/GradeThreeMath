<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import LoginForm from "../components/auth/LoginForm.vue";
import { useAuthStore } from "../app/stores/auth.store";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

async function submit(credentials: { username: string; password: string }) {
  try {
    await auth.login(credentials.username, credentials.password);
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/learn";
    await router.replace(auth.user?.mustChangePassword ? "/change-password" : redirect);
  } catch {
    // The store exposes one generic public error.
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-panel" aria-labelledby="login-title">
      <div class="brand-mark">MATH</div>
      <h1 id="login-title">数学母题学习工作台</h1>
      <p>使用老师或管理员分配的账号进入。</p>
      <LoginForm :loading="auth.loading" :error="auth.error" @submit="submit" />
    </section>
    <section class="login-scene" aria-hidden="true">
      <div class="scene-grid" />
      <div class="scene-equation">13 − 12 + 22 = ?</div>
      <div class="scene-blocks"><i v-for="n in 13" :key="n" /></div>
    </section>
  </main>
</template>

<style scoped>
.login-page { min-height: 100vh; display: grid; grid-template-columns: minmax(320px, 460px) 1fr; background: var(--color-surface); }
.login-panel { padding: clamp(32px, 7vw, 88px); align-self: center; display: grid; gap: 16px; }
.brand-mark { width: fit-content; padding: 6px 9px; border: 2px solid var(--color-primary); color: var(--color-primary); font-weight: 900; }
h1 { margin: 0; font-size: 34px; line-height: 1.2; letter-spacing: 0; }
p { margin: 0 0 12px; color: var(--color-muted); }
.login-scene { position: relative; overflow: hidden; display: grid; place-items: center; color: white; background: #153b71; }
.scene-grid { position: absolute; inset: 0; opacity: .16; background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 42px 42px; }
.scene-equation { z-index: 1; font-size: clamp(32px, 5vw, 72px); font-weight: 900; letter-spacing: 0; }
.scene-blocks { position: absolute; bottom: 18%; display: flex; gap: 8px; }
.scene-blocks i { width: 22px; height: 22px; background: #f7c948; border: 2px solid #fff; }
@media (max-width: 760px) { .login-page { grid-template-columns: 1fr; } .login-scene { min-height: 180px; order: -1; } .login-panel { padding: 28px 22px 40px; } }
</style>
