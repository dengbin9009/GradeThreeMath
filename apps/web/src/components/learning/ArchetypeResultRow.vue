<script setup lang="ts">
import { ChevronRight, ImageIcon } from "@lucide/vue";
import type { Archetype } from "@math/shared";

defineProps<{ archetype: Archetype; imageAnimation?: boolean }>();
</script>

<template>
  <RouterLink
    class="archetype-result-row"
    :data-module-id="archetype.id"
    :to="`/learn/${archetype.id}/${archetype.variants[0]?.id}`"
  >
    <span class="module-id">{{ archetype.id }}</span>
    <div class="copy">
      <div>
        <h2>{{ archetype.title }}</h2>
        <span v-if="imageAnimation" class="image-tag"><ImageIcon :size="14" />图片动画</span>
      </div>
      <p>{{ archetype.model }}</p>
    </div>
    <div class="tags">
      <span>{{ archetype.layer }}</span>
      <span>{{ archetype.difficulty }}</span>
      <span>{{ archetype.variants.length }} 个变式</span>
    </div>
    <ChevronRight class="arrow" :size="22" />
  </RouterLink>
</template>

<style scoped>
.archetype-result-row {
  min-height: 104px;
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) auto 32px;
  align-items: center;
  gap: 16px;
  padding: 14px 12px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--color-line);
  background: white;
}

.archetype-result-row:hover { background: #f7fbfa; }
.module-id { width: 48px; height: 48px; display: grid; place-items: center; color: white; background: var(--color-primary); border-radius: 6px; font-weight: 900; }
.copy { min-width: 0; }
.copy > div { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
h2 { margin: 0; font-size: 18px; letter-spacing: 0; }
p { margin: 7px 0 0; color: var(--color-muted); line-height: 1.55; }
.image-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 7px; color: #8a4b00; background: #fff1d6; border-radius: 999px; font-size: 12px; font-weight: 900; }
.tags { display: flex; gap: 6px; }
.tags span { padding: 4px 7px; color: var(--color-muted); background: #f1f4f8; border-radius: 4px; font-size: 12px; }
.arrow { color: var(--color-muted); }

@media (max-width: 720px) {
  .archetype-result-row { grid-template-columns: 48px minmax(0, 1fr) 24px; gap: 10px; }
  .tags { grid-column: 2 / -1; }
  .arrow { grid-column: 3; grid-row: 1; }
}
</style>
