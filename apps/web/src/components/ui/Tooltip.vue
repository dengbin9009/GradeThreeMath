<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <span class="tooltip">
    <slot />
    <span role="tooltip">{{ text }}</span>
  </span>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-flex;
}

.tooltip [role="tooltip"] {
  position: absolute;
  z-index: 5;
  inset: auto auto calc(100% + 8px) 50%;
  width: max-content;
  max-width: 220px;
  padding: 6px 8px;
  border-radius: 5px;
  color: white;
  background: #172033;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%);
}

.tooltip:hover [role="tooltip"],
.tooltip:focus-within [role="tooltip"] {
  opacity: 1;
}
</style>
