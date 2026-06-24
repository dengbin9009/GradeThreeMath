<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppTopbar from "./AppTopbar.vue";
import KnowledgeSidebar from "../filters/KnowledgeSidebar.vue";
import { useBlueprintStore } from "../../app/stores/blueprint.store";
const filtersOpen = ref(false);
const blueprint = useBlueprintStore();
onMounted(() => blueprint.load());
</script>

<template>
  <div class="app-shell">
    <AppTopbar @toggle-filters="filtersOpen = true" />
    <div class="shell-body"><KnowledgeSidebar :open="filtersOpen" @close="filtersOpen = false" /><main class="shell-content"><slot /></main></div>
  </div>
</template>

<style scoped>
.app-shell { min-height: 100vh; }.shell-body { display: grid; grid-template-columns: var(--sidebar-width) minmax(0, 1fr); }.shell-content { min-width: 0; min-height: calc(100vh - var(--topbar-height)); }
@media (max-width: 900px) { .shell-body { grid-template-columns: 1fr; } }
</style>
