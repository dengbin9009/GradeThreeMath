<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Plus, Search } from "@lucide/vue";
import UserTable from "../components/admin/UserTable.vue";
import CreateUserDrawer from "../components/admin/CreateUserDrawer.vue";
import EditValidityDrawer from "../components/admin/EditValidityDrawer.vue";
import { createUser, listUsers, resetUserPassword, revokeUserSessions, updateUser, type ManagedUserDto } from "../admin/users.api";

const props = withDefaults(defineProps<{ initialUsers?: ManagedUserDto[] }>(), { initialUsers: () => [] });
const users = ref<ManagedUserDto[]>(props.initialUsers);
const query = ref("");
const error = ref("");
const createOpen = ref(false);
const selectedUser = ref<ManagedUserDto | null>(null);
const filtered = computed(() => users.value.filter((item) => `${item.username} ${item.displayName}`.toLowerCase().includes(query.value.trim().toLowerCase())));

onMounted(async () => {
  if (props.initialUsers.length) return;
  try { users.value = await listUsers(); } catch (caught) { error.value = caught instanceof Error ? caught.message : "加载失败"; }
});

async function create(input: Parameters<typeof createUser>[0]) {
  try {
    const created = await createUser(input);
    users.value = [created, ...users.value];
    createOpen.value = false;
  } catch (caught) { error.value = caught instanceof Error ? caught.message : "创建失败"; }
}

async function save(input: { id: string; displayName: string; isActive: boolean; validFrom: string; validUntil: string | null; version: number }) {
  try {
    const updated = await updateUser(input.id, input);
    users.value = users.value.map((item) => item.id === updated.id ? updated : item);
    selectedUser.value = null;
  } catch (caught) { error.value = caught instanceof Error ? caught.message : "保存失败"; }
}

async function resetPassword(user: ManagedUserDto) {
  const temporaryPassword = window.prompt(`为 ${user.username} 设置至少 15 位的临时密码`);
  if (!temporaryPassword) return;
  try {
    const updated = await resetUserPassword(user.id, temporaryPassword, user.version);
    users.value = users.value.map((item) => item.id === updated.id ? updated : item);
  } catch (caught) { error.value = caught instanceof Error ? caught.message : "重置失败"; }
}

async function revoke(user: ManagedUserDto) {
  if (!window.confirm(`撤销 ${user.username} 的全部登录会话？`)) return;
  try { await revokeUserSessions(user.id); } catch (caught) { error.value = caught instanceof Error ? caught.message : "撤销失败"; }
}
</script>

<template>
  <main class="admin-page">
    <header>
      <div><p>账号管理</p><h1>用户与有效期</h1></div>
      <button class="create-button" type="button" aria-label="添加用户" @click="createOpen = true"><Plus :size="18" />添加用户</button>
    </header>
    <div class="toolbar">
      <label class="search"><Search :size="17" /><span class="sr-only">搜索用户</span><input v-model="query" type="search" placeholder="搜索登录名或姓名" /></label>
      <span>{{ filtered.length }} 个用户</span>
    </div>
    <p v-if="error" role="alert" class="error">{{ error }}</p>
    <UserTable v-if="filtered.length" :users="filtered" @edit="selectedUser = $event" @reset="resetPassword" @revoke="revoke" />
    <div v-else class="empty">没有匹配的用户</div>
    <CreateUserDrawer :open="createOpen" @close="createOpen = false" @submit="create" />
    <EditValidityDrawer :open="Boolean(selectedUser)" :user="selectedUser" @close="selectedUser = null" @submit="save" />
  </main>
</template>

<style scoped>
.admin-page { min-height: 100vh; background: white; }
header, .toolbar { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 24px; border-bottom: 1px solid var(--color-line); }
header p, h1 { margin: 0; }
header p { color: var(--color-muted); font-size: 13px; }
h1 { margin-top: 3px; font-size: 22px; }
.create-button { display: inline-flex; align-items: center; gap: 7px; border: 0; border-radius: 6px; padding: 0 14px; color: white; background: var(--color-primary); font-weight: 800; }
.search { min-height: 40px; width: min(360px, 100%); display: flex; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 6px; }
.search input { width: 100%; border: 0; outline: 0; }
.toolbar > span { color: var(--color-muted); font-size: 14px; }
.empty { padding: 64px 24px; text-align: center; color: var(--color-muted); }
.error { margin: 16px 24px; color: var(--color-danger); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
@media (max-width: 600px) { header, .toolbar { padding-inline: 14px; } .toolbar { align-items: stretch; flex-direction: column; } }
</style>
