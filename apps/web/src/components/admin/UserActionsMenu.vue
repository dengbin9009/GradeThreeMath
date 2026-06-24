<script setup lang="ts">
import { KeyRound, LogOut, MoreHorizontal } from "@lucide/vue";
import { ref } from "vue";
import type { ManagedUserDto } from "../../admin/users.api";

defineProps<{ user: ManagedUserDto }>();
defineEmits<{ reset: [user: ManagedUserDto]; revoke: [user: ManagedUserDto] }>();
const open = ref(false);
</script>

<template>
  <div class="actions">
    <button type="button" aria-label="更多用户操作" @click="open = !open"><MoreHorizontal :size="20" /></button>
    <div v-if="open" class="menu" role="menu">
      <button type="button" role="menuitem" data-action="reset" @click="$emit('reset', user); open = false"><KeyRound :size="16" />重置临时密码</button>
      <button type="button" role="menuitem" data-action="revoke" @click="$emit('revoke', user); open = false"><LogOut :size="16" />撤销全部会话</button>
    </div>
  </div>
</template>

<style scoped>
.actions { position: relative; }.actions > button { min-width: 40px; display: grid; place-items: center; border: 0; background: transparent; }.menu { position: absolute; z-index: 5; right: 0; top: 42px; width: 190px; padding: 5px; background: white; border: 1px solid var(--color-line); border-radius: 6px; box-shadow: var(--shadow-stage); }.menu button { width: 100%; display: flex; align-items: center; gap: 8px; padding: 0 9px; border: 0; background: white; text-align: left; }.menu button:hover { background: #f3f6f9; }
</style>
