<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";
const props = defineProps<{ parameters: Record<string, number> }>();
const steps = ["before-bridge", "head-on-bridge", "whole-train-on-bridge", "tail-off-bridge"] as const;
const progress = ref(0);
const step = computed<(typeof steps)[number]>(() => steps[progress.value] ?? "before-bridge");
const trainLength = computed(() => props.parameters.trainLength ?? Math.max(1, (props.parameters.speed ?? 1) * (props.parameters.time ?? 1) - (props.parameters.tunnelLength ?? 0)));
const bridgeLength = computed(() => props.parameters.bridgeLength ?? props.parameters.tunnelLength ?? 0);
const distance = computed(() => trainLength.value + bridgeLength.value);
const frame = computed(() => `/assets/train-bridge/train-bridge-${String(progress.value).padStart(2, "0")}-${step.value}.png`);
const feedback = computed(() => step.value === "tail-off-bridge" ? "车尾离桥，整列车才算完整通过。" : "别急，车尾还在路上，桥还没放行。");
function setProgress(index: number) {
  progress.value = Math.max(0, Math.min(steps.length - 1, Math.round(index)));
}
</script>

<template>
  <SceneStage module-id="M12" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 480, mobile: 460 }">
  <div class="train-module">
    <div class="scene">
      <img data-train-frame :src="frame" alt="火车过桥分步场景" />
      <div class="distance-line"><span>车长 {{ trainLength }} 米</span><strong>完整通过 {{ distance }} 米</strong><span>桥长 {{ bridgeLength }} 米</span></div>
      <div data-measure-total class="measure-total">{{ trainLength }} + {{ bridgeLength }} = {{ distance }} 米</div>
      <div data-playful-feedback class="train-feedback">{{ feedback }}</div>
    </div>
    <div class="controls">
      <label class="drag-control"><span>拖动车头进度</span><input data-train-drag type="range" min="0" max="3" step="1" :value="progress" @input="setProgress(Number(($event.target as HTMLInputElement).value))" /></label>
      <button v-for="(item, index) in steps" :key="item" :data-step="item" :class="{ active: step === item }" @click="setProgress(index)">{{ { 'before-bridge':'到桥前', 'head-on-bridge':'车头上桥', 'whole-train-on-bridge':'整车上桥', 'tail-off-bridge':'车尾离桥' }[item] }}</button>
    </div>
  </div>
  </SceneStage>
</template>

<style scoped>
.train-module { min-height: 100%; display: grid; grid-template-rows: 1fr auto; background: #e9f5f5; }.scene { position: relative; min-height: 420px; overflow: hidden; }.scene img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center; }.distance-line { position: absolute; z-index: 2; left: 5%; right: 5%; bottom: 20px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; padding: 12px 16px; background: #ffffffed; border: 2px solid #153b71; border-radius: 6px; }.distance-line strong { color: var(--color-primary); font-size: 20px; }.distance-line span:last-child { text-align: right; }.measure-total, .train-feedback { position: absolute; z-index: 3; top: 18px; padding: 8px 10px; border-radius: 6px; background: #ffffffed; font-weight: 900; }.measure-total { left: 18px; color: #153b71; border: 1px solid #153b71; }.train-feedback { right: 18px; max-width: min(360px, 48%); color: #7c2d12; border: 1px solid #fed7aa; }.controls { display: grid; grid-template-columns: 1.3fr repeat(4, 1fr); border-top: 1px solid var(--color-line); }.controls button { border: 0; border-right: 1px solid var(--color-line); background: white; font-weight: 800; }.controls .active { color: white; background: var(--color-primary); }.drag-control { min-width: 0; display: grid; gap: 4px; padding: 8px 12px; background: white; border-right: 1px solid var(--color-line); font-size: 12px; font-weight: 800; }
@media (max-width: 600px) { .scene { min-height: 400px; }.distance-line { grid-template-columns: 1fr; text-align: center; }.distance-line span:last-child { text-align: center; }.measure-total, .train-feedback { left: 12px; right: 12px; max-width: none; }.train-feedback { top: 58px; }.controls { grid-template-columns: 1fr 1fr; }.drag-control { grid-column: 1 / -1; } }
</style>
