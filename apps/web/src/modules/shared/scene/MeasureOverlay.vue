<script setup lang="ts">
defineProps<{
  labels: Array<{
    id: string;
    label: string;
    value: string | number;
    attachTo?: string;
  }>;
}>();
</script>

<template>
  <div class="measure-overlay" data-stage-layer="measure-overlay" data-layer-kind="overlay">
    <output
      v-for="item in labels"
      :key="item.id"
      class="measure-label"
      :data-computed-label="item.id"
      :data-attach-to="item.attachTo"
    >
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
    </output>
  </div>
</template>

<style scoped>
.measure-overlay {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
  padding: 12px;
  pointer-events: none;
}

.measure-label {
  display: inline-grid;
  grid-auto-flow: column;
  gap: 6px;
  align-items: center;
  max-width: 100%;
  padding: 6px 8px;
  border: 1px solid color-mix(in srgb, var(--color-primary) 28%, white);
  border-radius: 6px;
  background: rgb(255 255 255 / 88%);
  color: var(--color-ink);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.measure-label strong {
  color: var(--color-primary);
}
</style>
