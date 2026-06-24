<script setup lang="ts">
import { ref, watch } from "vue";
import type { ManagedUserDto } from "../../admin/users.api";

const props = defineProps<{ open: boolean; user: ManagedUserDto | null }>();
const emit = defineEmits<{
  close: [];
  submit: [value: { id: string; displayName: string; isActive: boolean; validFrom: string; validUntil: string | null; version: number }];
}>();
const displayName = ref("");
const isActive = ref(true);
const validFrom = ref("");
const validUntil = ref("");

watch(() => props.user, (value) => {
  if (!value) return;
  displayName.value = value.displayName;
  isActive.value = value.isActive;
  validFrom.value = value.validFrom.slice(0, 16);
  validUntil.value = value.validUntil?.slice(0, 16) ?? "";
}, { immediate: true });

function submit() {
  if (!props.user) return;
  emit("submit", {
    id: props.user.id,
    displayName: displayName.value,
    isActive: isActive.value,
    validFrom: new Date(validFrom.value).toISOString(),
    validUntil: validUntil.value ? new Date(validUntil.value).toISOString() : null,
    version: props.user.version
  });
}
</script>

<template>
  <aside v-if="open && user" class="drawer" aria-labelledby="edit-user-title">
    <header><div><p>{{ user.username }}</p><h2 id="edit-user-title">用户与有效期</h2></div><button type="button" aria-label="关闭" @click="emit('close')">×</button></header>
    <form @submit.prevent="submit">
      <label>显示姓名<input v-model.trim="displayName" name="displayName" required /></label>
      <label class="toggle"><input v-model="isActive" name="isActive" type="checkbox" />允许登录和学习</label>
      <label>生效时间<input v-model="validFrom" name="validFrom" type="datetime-local" required /></label>
      <label>到期时间（留空为长期）<input v-model="validUntil" name="validUntil" type="datetime-local" /></label>
      <button class="primary" type="submit">保存更改</button>
    </form>
  </aside>
</template>

<style scoped>
.drawer { position: fixed; z-index: 20; inset: 0 0 0 auto; width: min(440px, 100%); padding: 22px; background: white; box-shadow: -12px 0 30px #17203322; }
header { display: flex; justify-content: space-between; align-items: center; } header p, h2 { margin: 0; } header p { color: var(--color-muted); font-size: 13px; } header button { border: 0; background: transparent; font-size: 28px; }
form, label { display: grid; gap: 7px; } form { gap: 16px; margin-top: 24px; } label { font-weight: 700; font-size: 14px; }
input { min-height: 44px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 6px; }.toggle { display: flex; align-items: center; gap: 10px; }.toggle input { min-height: auto; width: 20px; height: 20px; }
.primary { border: 0; border-radius: 6px; background: var(--color-primary); color: white; font-weight: 800; }
</style>
