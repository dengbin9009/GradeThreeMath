<script setup lang="ts">
withDefaults(defineProps<{ label: string; pressed?: boolean; type?: "button" | "submit" | "reset" }>(), {
  pressed: false,
  type: "button"
});
</script>

<template>
  <button class="icon-button" :type="type" :aria-label="label" :aria-pressed="pressed || undefined">
    <slot />
  </button>
</template>

<style scoped>
.icon-button {
  width: 40px;
  height: 40px;
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  color: var(--color-muted);
  background: white;
}

.icon-button:hover,
.icon-button[aria-pressed="true"] {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}
</style>
