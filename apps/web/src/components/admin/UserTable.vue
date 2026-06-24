<script setup lang="ts">
import type { ManagedUserDto } from "../../admin/users.api";
import UserActionsMenu from "./UserActionsMenu.vue";
defineProps<{ users: ManagedUserDto[] }>();
const emit = defineEmits<{ edit: [user: ManagedUserDto]; reset: [user: ManagedUserDto]; revoke: [user: ManagedUserDto] }>();
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead><tr><th>用户</th><th>状态</th><th>有效期</th><th><span class="sr-only">操作</span></th></tr></thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td><strong>{{ item.displayName }}</strong><small>{{ item.username }}</small></td>
          <td><span :class="['status', item.isActive ? 'active' : 'paused']">{{ item.isActive ? "可使用" : "已暂停" }}</span></td>
          <td>{{ item.validUntil ? new Date(item.validUntil).toLocaleDateString('zh-CN') : "长期有效" }}</td>
          <td><button type="button" :aria-label="`编辑 ${item.username}`" @click="emit('edit', item)">编辑</button><UserActionsMenu :user="item" @reset="emit('reset', $event)" @revoke="emit('revoke', $event)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap { overflow: auto; border-top: 1px solid var(--color-line); }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 13px 14px; border-bottom: 1px solid var(--color-line); }
th { color: var(--color-muted); font-size: 13px; background: #f8fafc; }
td strong, td small { display: block; }
td small { margin-top: 3px; color: var(--color-muted); }
.status { display: inline-flex; padding: 3px 8px; border-radius: 999px; font-size: 13px; }
.active { color: var(--color-success); background: #eaf8f0; }
.paused { color: var(--color-danger); background: #fff1f2; }
button { min-width: 44px; border: 0; background: transparent; font-weight: 900; }
td:last-child { display: flex; align-items: center; justify-content: flex-end; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
</style>
