<script setup lang="ts">
import { ref } from "vue";

defineProps<{ open: boolean }>();
const emit = defineEmits<{
  close: [];
  submit: [value: { username: string; displayName: string; temporaryPassword: string; validFrom: string; validUntil: string | null }];
}>();
const username = ref("");
const displayName = ref("");
const temporaryPassword = ref("");
const validFrom = ref(new Date().toISOString().slice(0, 16));
const validUntil = ref("");

function submit() {
  emit("submit", {
    username: username.value,
    displayName: displayName.value,
    temporaryPassword: temporaryPassword.value,
    validFrom: new Date(validFrom.value).toISOString(),
    validUntil: validUntil.value ? new Date(validUntil.value).toISOString() : null
  });
}
</script>

<template>
  <aside v-if="open" class="drawer" aria-labelledby="create-user-title">
    <header><h2 id="create-user-title">添加用户</h2><button type="button" aria-label="关闭" @click="emit('close')">×</button></header>
    <form @submit.prevent="submit">
      <label>登录名<input v-model.trim="username" name="username" autocomplete="off" required pattern="[A-Za-z0-9_.-]{3,30}" /></label>
      <label>显示姓名<input v-model.trim="displayName" name="displayName" required /></label>
      <label>临时密码<input v-model="temporaryPassword" name="temporaryPassword" type="text" minlength="15" required /></label>
      <label>生效时间<input v-model="validFrom" name="validFrom" type="datetime-local" required /></label>
      <label>到期时间（留空为长期）<input v-model="validUntil" name="validUntil" type="datetime-local" /></label>
      <button class="primary" type="submit">创建用户</button>
    </form>
  </aside>
</template>

<style scoped>
.drawer { position: fixed; z-index: 20; inset: 0 0 0 auto; width: min(440px, 100%); padding: 22px; background: white; box-shadow: -12px 0 30px #17203322; }
header { display: flex; justify-content: space-between; align-items: center; } h2 { margin: 0; } header button { border: 0; background: transparent; font-size: 28px; }
form, label { display: grid; gap: 7px; } form { gap: 16px; margin-top: 24px; } label { font-weight: 700; font-size: 14px; }
input { min-height: 44px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 6px; }
.primary { border: 0; border-radius: 6px; background: var(--color-primary); color: white; font-weight: 800; }
</style>
