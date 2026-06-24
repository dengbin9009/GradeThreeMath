<script setup lang="ts">
import { ref } from "vue";

withDefaults(defineProps<{ loading?: boolean; error?: string }>(), { loading: false, error: "" });
const emit = defineEmits<{ submit: [value: { username: string; password: string }] }>();
const username = ref("");
const password = ref("");
</script>

<template>
  <form class="login-form" @submit.prevent="emit('submit', { username, password })">
    <div class="field">
      <label for="login-username">登录名</label>
      <input id="login-username" v-model.trim="username" name="username" autocomplete="username" required />
    </div>
    <div class="field">
      <label for="login-password">密码</label>
      <input id="login-password" v-model="password" name="password" type="password" autocomplete="current-password" required />
    </div>
    <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    <button class="primary-button" type="submit" :disabled="loading">{{ loading ? "正在进入…" : "进入学习工作台" }}</button>
  </form>
</template>

<style scoped>
.login-form, .field { display: grid; gap: 8px; }
.login-form { gap: 18px; }
label { font-weight: 700; font-size: 14px; }
input { min-height: 48px; border: 1px solid var(--color-line); border-radius: var(--radius-control); padding: 0 14px; background: white; }
.primary-button { border: 0; border-radius: var(--radius-control); color: white; background: var(--color-primary); font-weight: 800; padding: 0 18px; cursor: pointer; }
.primary-button:disabled { opacity: .65; cursor: wait; }
.form-error { margin: 0; padding: 10px 12px; color: var(--color-danger); background: #fff1f2; border-left: 3px solid var(--color-danger); }
</style>
