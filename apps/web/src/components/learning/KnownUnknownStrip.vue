<script setup lang="ts">
defineProps<{ parameters: Record<string, number | string>; unknown: string }>();
</script>

<template>
  <div class="quantity-strip">
    <span v-for="(value, key) in parameters" :key="key" data-known><small>{{ key }}</small><strong>{{ value }}</strong></span>
    <span class="unknown" data-unknown><small>待求</small><strong>{{ unknown }}</strong></span>
  </div>
</template>

<style scoped>
.quantity-strip { display: flex; flex-wrap: wrap; gap: 8px; }.quantity-strip > span { min-width: 84px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 8px 10px; border: 1px solid var(--color-line); border-radius: 6px; background: white; }.quantity-strip small { color: var(--color-muted); }.quantity-strip strong { color: var(--color-primary); }.quantity-strip .unknown { min-width: 180px; border-style: dashed; }.quantity-strip .unknown strong { font-size: 14px; }
@media (max-width: 600px) { .quantity-strip { flex-wrap: nowrap; overflow-x: auto; }.quantity-strip > span { flex: 0 0 auto; } }
</style>
