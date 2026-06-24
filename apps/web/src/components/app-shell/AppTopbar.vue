<script setup lang="ts">
import { Menu, Search } from "@lucide/vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AccountMenu from "./AccountMenu.vue";
const emit = defineEmits<{ toggleFilters: [] }>();
const route = useRoute();
const router = useRouter();
const search = computed({
  get: () => typeof route.query.q === "string" ? route.query.q : "",
  set: (value: string) => router.replace({ path: "/learn", query: { ...route.query, q: value || undefined } })
});
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/learn"><b>M</b><span>数学母题</span></RouterLink>
    <button class="menu-button" type="button" aria-label="打开筛选" @click="emit('toggleFilters')"><Menu :size="21" /></button>
    <label class="global-search"><Search :size="18" /><span class="sr-only">搜索母题</span><input v-model="search" type="search" placeholder="搜索 M20、鸡兔、抬腿…" /></label>
    <AccountMenu />
  </header>
</template>

<style scoped>
.topbar { height: var(--topbar-height); display: grid; grid-template-columns: var(--sidebar-width) minmax(220px, 560px) 1fr; align-items: center; gap: 16px; padding: 0 18px 0 0; border-bottom: 1px solid var(--color-line); background: white; }.brand { height: 100%; display: flex; align-items: center; gap: 10px; padding: 0 20px; text-decoration: none; font-weight: 900; }.brand b { width: 32px; height: 32px; display: grid; place-items: center; color: white; background: var(--color-primary); border-radius: 5px; }.global-search { height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border: 1px solid var(--color-line); border-radius: 6px; background: #f8fafc; }.global-search input { width: 100%; border: 0; outline: 0; background: transparent; }.menu-button { display: none; border: 0; background: transparent; }.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
@media (max-width: 900px) { .topbar { grid-template-columns: auto auto 1fr auto; padding-left: 12px; }.brand { padding: 0; }.brand span { display: none; }.menu-button { display: grid; place-items: center; }.global-search { min-width: 0; } }
@media (max-width: 560px) { .topbar { gap: 7px; padding-right: 8px; }.global-search input::placeholder { color: transparent; } }
</style>
