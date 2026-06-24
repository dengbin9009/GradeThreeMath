<script setup lang="ts">
defineProps<{ steps: string[]; activeStep: number }>();
defineEmits<{ select: [index: number] }>();
</script>

<template>
  <nav class="step-track" aria-label="学习步骤">
    <button v-for="(step, index) in steps" :key="step" type="button" :data-step-index="index" :class="{ active: index === activeStep, complete: index < activeStep }" @click="$emit('select', index)"><span>{{ index + 1 }}</span><strong>{{ step }}</strong></button>
  </nav>
</template>

<style scoped>
.step-track { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); border-top: 1px solid var(--color-line); background: white; }.step-track button { min-height: 54px; display: flex; align-items: center; justify-content: center; gap: 7px; border: 0; border-right: 1px solid var(--color-line); background: white; color: var(--color-muted); }.step-track span { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: #eef2f7; font-size: 12px; }.step-track .active { color: var(--color-primary); }.step-track .active span, .step-track .complete span { color: white; background: var(--color-primary); }
</style>
