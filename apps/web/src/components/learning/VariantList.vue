<script setup lang="ts">
import type { Variant } from "@math/shared";

defineProps<{ variants: Variant[]; activeId: string }>();
defineEmits<{ select: [variantId: string] }>();
</script>

<template>
  <nav class="variant-list" aria-label="选择变式题">
    <button
      v-for="(variant, index) in variants"
      :key="variant.id"
      type="button"
      :class="{ active: variant.id === activeId }"
      :aria-current="variant.id === activeId ? 'page' : undefined"
      @click="$emit('select', variant.id)"
    >
      <span>{{ index + 1 }}</span>
      <strong>{{ variant.title }}</strong>
    </button>
  </nav>
</template>

<style scoped>
.variant-list { display: flex; gap: 6px; overflow-x: auto; padding: 10px 0; }
.variant-list button { min-width: max-content; display: flex; align-items: center; gap: 7px; padding: 7px 11px; border: 1px solid var(--color-line); border-radius: 6px; background: white; color: var(--color-muted); }
.variant-list span { width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; background: #eef2f7; font-size: 12px; }
.variant-list button.active { color: var(--color-primary); border-color: var(--color-primary); background: var(--color-primary-soft); }
.variant-list button.active span { color: white; background: var(--color-primary); }
</style>
