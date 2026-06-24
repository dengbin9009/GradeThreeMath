<script setup lang="ts">
defineProps<{ state: "idle" | "hint" | "correct" | "adjust"; message: string }>();
</script>

<template>
  <p class="scene-status" role="status" aria-live="polite" :data-scene-state="state">{{ message }}</p>
</template>

<style scoped>
.scene-status {
  margin: 0;
  padding: 8px 10px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  color: var(--color-muted);
  background: white;
  font-weight: 800;
}

.scene-status[data-scene-state="correct"] {
  color: #047857;
  border-color: #a7f3d0;
  background: #ecfdf5;
}

.scene-status[data-scene-state="adjust"] {
  color: #9a3412;
  border-color: #fed7aa;
  background: #fff7ed;
}
</style>
