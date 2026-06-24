<script setup lang="ts">
import { ref } from "vue";
import { SlidersHorizontal } from "@lucide/vue";
import { useFilterStore } from "../../app/stores/filter.store";

const open = ref(false);
const filters = useFilterStore();

function toggle(list: string[], value: string) {
  const index = list.indexOf(value);
  if (index >= 0) list.splice(index, 1);
  else list.push(value);
}
</script>

<template>
  <div class="more-filters">
    <button type="button" :aria-expanded="open" aria-controls="more-filter-menu" @click="open = !open">
      <SlidersHorizontal :size="16" />更多筛选
    </button>
    <div v-if="open" id="more-filter-menu" role="menu" class="menu">
      <fieldset>
        <legend>层级</legend>
        <label v-for="layer in ['课内', '拔高']" :key="layer">
          <input type="checkbox" :value="layer" :checked="filters.layers.includes(layer)" @change="toggle(filters.layers, layer)" />
          {{ layer }}
        </label>
      </fieldset>
      <fieldset>
        <legend>难度</legend>
        <label v-for="difficulty in ['基础', '提高', '拔高']" :key="difficulty">
          <input type="checkbox" :value="difficulty" :checked="filters.difficulties.includes(difficulty)" @change="toggle(filters.difficulties, difficulty)" />
          {{ difficulty }}
        </label>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.more-filters { position: relative; display: inline-flex; }
.more-filters > button { min-height: 34px; display: inline-flex; align-items: center; gap: 5px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 999px; background: white; font-weight: 800; }
.menu { position: absolute; z-index: 20; top: calc(100% + 8px); right: 0; width: 220px; display: grid; gap: 12px; padding: 12px; border: 1px solid var(--color-line); border-radius: 8px; background: white; box-shadow: 0 16px 32px #17203322; }
fieldset { display: grid; gap: 8px; padding: 0; margin: 0; border: 0; }
legend { color: var(--color-muted); font-size: 12px; font-weight: 900; }
label { display: flex; align-items: center; gap: 8px; min-height: 28px; }
</style>
