<script setup lang="ts">
import { ImageIcon } from "@lucide/vue";
import { useFilterStore } from "../../app/stores/filter.store";

const filters = useFilterStore();

function toggleDifficulty(value: string) {
  const index = filters.difficulties.indexOf(value);
  if (index >= 0) filters.difficulties.splice(index, 1);
  else filters.difficulties.push(value);
}
</script>

<template>
  <div class="quick-filters" aria-label="快捷筛选">
    <button
      data-quick-filter="image"
      type="button"
      :aria-pressed="filters.imageOnly"
      @click="filters.imageOnly = !filters.imageOnly"
    >
      <ImageIcon :size="16" />图片动画
    </button>
    <button
      v-for="difficulty in ['基础', '提高', '拔高']"
      :key="difficulty"
      :data-quick-filter="`difficulty-${difficulty}`"
      type="button"
      :aria-pressed="filters.difficulties.includes(difficulty)"
      @click="toggleDifficulty(difficulty)"
    >
      {{ difficulty }}
    </button>
  </div>
</template>

<style scoped>
.quick-filters {
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
}

.quick-filters button {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  white-space: nowrap;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  color: var(--color-muted);
  background: white;
  font-weight: 800;
}

.quick-filters button[aria-pressed="true"] {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}
</style>
