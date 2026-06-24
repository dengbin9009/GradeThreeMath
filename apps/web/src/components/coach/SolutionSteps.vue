<script setup lang="ts">
defineProps<{ title: string; steps: string[] }>();
</script>

<template>
  <section class="solution-steps" aria-label="解题步骤">
    <h3>{{ title }}</h3>
    <ol>
      <li v-for="step in steps" :key="step">{{ step }}</li>
    </ol>
  </section>
</template>

<style scoped>
.solution-steps { padding: 12px; border: 1px solid var(--color-line); border-radius: 8px; background: white; }
h3 { margin: 0 0 8px; font-size: 14px; }
ol { margin: 0; padding-left: 20px; }
li { color: var(--color-muted); line-height: 1.7; }
</style>
