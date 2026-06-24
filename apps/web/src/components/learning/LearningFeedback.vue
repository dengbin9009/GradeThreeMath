<script setup lang="ts">
import { CircleCheck, Info, Lightbulb, TriangleAlert } from "@lucide/vue";
import { computed } from "vue";

const props = defineProps<{ state: "idle" | "hint" | "correct" | "adjust"; message: string }>();
const icon = computed(() => ({ idle: Info, hint: Lightbulb, correct: CircleCheck, adjust: TriangleAlert })[props.state]);
</script>

<template>
  <div class="learning-feedback" :data-feedback-state="state" aria-live="polite"><component :is="icon" :size="18" /><span>{{ message }}</span></div>
</template>

<style scoped>
.learning-feedback { min-height: 48px; display: flex; align-items: center; gap: 8px; padding: 9px 14px; color: var(--color-muted); background: #fbfcfe; }.learning-feedback[data-feedback-state="hint"] { color: #8a4b00; background: #fff8e8; }.learning-feedback[data-feedback-state="correct"] { color: var(--color-success); background: #edf9f2; }.learning-feedback[data-feedback-state="adjust"] { color: var(--color-danger); background: #fff1f2; }
</style>
