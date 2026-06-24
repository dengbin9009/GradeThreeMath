<script setup lang="ts">
import ResetButton from "./ResetButton.vue";
import LearningFeedback from "./LearningFeedback.vue";
withDefaults(defineProps<{ feedback?: string }>(), { feedback: "拖动、调整或切换步骤，观察关键数量怎样变化。" });
defineEmits<{ reset: [] }>();
</script>

<template>
  <section class="stage-shell">
    <div class="stage-toolbar"><span>互动动画</span><ResetButton @reset="$emit('reset')" /></div>
    <div class="stage" data-animation-stage><slot /></div>
    <LearningFeedback state="idle" :message="feedback" />
  </section>
</template>

<style scoped>
.stage-shell { min-width: 0; display: grid; grid-template-rows: auto minmax(420px, 1fr) auto; background: white; border: 1px solid var(--color-line); border-radius: var(--radius-panel); box-shadow: var(--shadow-stage); overflow: hidden; }
.stage-toolbar { min-height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px 0 16px; border-bottom: 1px solid var(--color-line); font-weight: 800; }
.stage { min-height: 420px; position: relative; overflow: hidden; }
@media (max-width: 600px) { .stage-shell { grid-template-rows: auto minmax(360px, 60vh) auto; border-inline: 0; border-radius: 0; } .stage { min-height: 360px; } }
</style>
