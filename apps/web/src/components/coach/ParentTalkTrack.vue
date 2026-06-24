<script setup lang="ts">
defineProps<{ talkTrack: string; commonMistake: string; extensionPrompt: string }>();
</script>

<template>
  <section class="parent-talk-track" aria-label="家长讲解话术">
    <article><h3>先这样问</h3><p>{{ talkTrack }}</p></article>
    <article><h3>留意这个误区</h3><p>{{ commonMistake }}</p></article>
    <article><h3>再往前一步</h3><p>{{ extensionPrompt }}</p></article>
  </section>
</template>

<style scoped>
.parent-talk-track { display: grid; gap: 12px; }
article { padding: 12px; border: 1px solid var(--color-line); border-radius: 8px; background: white; }
h3, p { margin: 0; }
h3 { font-size: 14px; }
p { margin-top: 7px; color: var(--color-muted); line-height: 1.7; }
</style>
