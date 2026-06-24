<script setup lang="ts">
import type { Variant } from "@math/shared";

defineProps<{ variants: Variant[]; activeId: string }>();
defineEmits<{ select: [variantId: string] }>();
</script>

<template>
  <nav class="coach-variant-list" aria-label="陪练子题">
    <button
      v-for="(variant, index) in variants"
      :key="variant.id"
      type="button"
      :data-variant-id="variant.id"
      :aria-current="variant.id === activeId ? 'page' : undefined"
      @click="$emit('select', variant.id)"
    >
      <span>{{ index + 1 }}</span>
      <strong>{{ variant.title }}</strong>
    </button>
  </nav>
</template>

<style scoped>
.coach-variant-list { display: grid; gap: 8px; }
button { min-height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid var(--color-line); border-radius: 6px; background: white; text-align: left; }
span { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: #eef2f7; font-size: 12px; font-weight: 900; }
button[aria-current="page"] { color: var(--color-primary); border-color: var(--color-primary); background: var(--color-primary-soft); }
button[aria-current="page"] span { color: white; background: var(--color-primary); }
</style>
