<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{ parameters: Record<string, number> }>();
const steps = ["before-bridge", "head-on-bridge", "whole-train-on-bridge", "tail-off-bridge"] as const;
const step = ref<(typeof steps)[number]>("before-bridge");
const trainLength = computed(() => props.parameters.trainLength ?? Math.max(1, (props.parameters.speed ?? 1) * (props.parameters.time ?? 1) - (props.parameters.tunnelLength ?? 0)));
const bridgeLength = computed(() => props.parameters.bridgeLength ?? props.parameters.tunnelLength ?? 0);
const distance = computed(() => trainLength.value + bridgeLength.value);
const frame = computed(() => `/assets/train-bridge/train-bridge-${String(steps.indexOf(step.value)).padStart(2, "0")}-${step.value}.png`);
</script>

<template>
  <div class="train-module">
    <div class="scene">
      <img data-train-frame :src="frame" alt="火车过桥分步场景" />
      <div class="distance-line"><span>车长 {{ trainLength }} 米</span><strong>完整通过 {{ distance }} 米</strong><span>桥长 {{ bridgeLength }} 米</span></div>
    </div>
    <div class="controls">
      <button v-for="item in steps" :key="item" :data-step="item" :class="{ active: step === item }" @click="step = item">{{ { 'before-bridge':'到桥前', 'head-on-bridge':'车头上桥', 'whole-train-on-bridge':'整车上桥', 'tail-off-bridge':'车尾离桥' }[item] }}</button>
    </div>
  </div>
</template>

<style scoped>
.train-module { min-height: 100%; display: grid; grid-template-rows: 1fr auto; background: #e9f5f5; }.scene { position: relative; min-height: 460px; overflow: hidden; }.scene img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center; }.distance-line { position: absolute; z-index: 2; left: 5%; right: 5%; bottom: 20px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; padding: 12px 16px; background: #ffffffed; border: 2px solid #153b71; border-radius: 6px; }.distance-line strong { color: var(--color-primary); font-size: 20px; }.distance-line span:last-child { text-align: right; }.controls { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--color-line); }.controls button { border: 0; border-right: 1px solid var(--color-line); background: white; font-weight: 800; }.controls .active { color: white; background: var(--color-primary); }
@media (max-width: 600px) { .scene { min-height: 400px; }.distance-line { grid-template-columns: 1fr; text-align: center; }.distance-line span:last-child { text-align: center; }.controls { grid-template-columns: 1fr 1fr; } }
</style>
