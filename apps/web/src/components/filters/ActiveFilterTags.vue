<script setup lang="ts">
import { X } from "@lucide/vue";
import { computed } from "vue";
import { useFilterStore } from "../../app/stores/filter.store";

const filters = useFilterStore();
const tags = computed(() => [
  ...filters.layers.map((value) => ({ group: "layers", value })),
  ...filters.difficulties.map((value) => ({ group: "difficulties", value })),
  ...filters.terms.map((value) => ({ group: "terms", value })),
  ...(filters.imageOnly ? [{ group: "imageOnly", value: "图片动画" }] : [])
]);
function remove(group: string, value: string) {
  if (group === "imageOnly") { filters.imageOnly = false; return; }
  const values = filters[group as "layers" | "difficulties" | "terms"];
  values.splice(values.indexOf(value), 1);
}
</script>

<template>
  <div v-if="tags.length" class="active-tags" aria-label="已选筛选条件">
    <button v-for="tag in tags" :key="`${tag.group}-${tag.value}`" type="button" :data-filter-value="tag.value" @click="remove(tag.group, tag.value)">{{ tag.value }}<X :size="14" /></button>
    <button type="button" class="clear" data-action="clear-filters" @click="filters.clear()">清除全部</button>
  </div>
</template>

<style scoped>
.active-tags { min-height: 42px; display: flex; align-items: center; gap: 6px; overflow-x: auto; padding-bottom: 8px; }.active-tags button { min-height: 32px; display: inline-flex; align-items: center; gap: 4px; padding: 0 9px; white-space: nowrap; border: 1px solid var(--color-primary); border-radius: 999px; color: var(--color-primary); background: var(--color-primary-soft); font-size: 13px; }.active-tags .clear { color: var(--color-muted); border-color: var(--color-line); background: white; }
</style>
