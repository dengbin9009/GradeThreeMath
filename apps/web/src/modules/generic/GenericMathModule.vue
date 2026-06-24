<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { ChevronLeft, ChevronRight, Lightbulb } from "@lucide/vue";
import { getModuleImageFrames } from "@math/shared";
import AnimationStageShell from "../../components/learning/AnimationStageShell.vue";

interface GenericArchetype {
  id: string;
  title: string;
  animationSpec: { childFeedback: string; revealSteps: string[] };
}
interface GenericVariant {
  id: string;
  parameters: Record<string, number | string>;
  answerRule: string;
}
const props = defineProps<{ moduleId: string; archetype: GenericArchetype; variant: GenericVariant }>();
const initial = () => ({ ...props.variant.parameters });
const parameters = reactive<Record<string, number | string>>(initial());
const step = ref(0);
const revealed = ref(false);
const frames = computed(() => getModuleImageFrames(props.moduleId));
const currentFrame = computed(() => frames.value[Math.min(step.value, frames.value.length - 1)]);
const numericParameters = computed(() => Object.entries(parameters).filter((entry): entry is [string, number] => typeof entry[1] === "number"));
const feedback = computed(() => revealed.value ? props.variant.answerRule : currentFrame.value?.teachingNote ?? props.archetype.animationSpec.childFeedback);

function adjust(key: string, amount: number) {
  const current = parameters[key];
  if (typeof current === "number") parameters[key] = Math.max(1, Math.round(current + amount));
}
function reset() {
  Object.keys(parameters).forEach((key) => delete parameters[key]);
  Object.assign(parameters, initial());
  step.value = 0;
  revealed.value = false;
}
</script>

<template>
  <AnimationStageShell :feedback="feedback" @reset="reset">
    <div class="generic-module-stage">
      <div class="scene-panel">
        <img v-if="currentFrame" data-scene-frame :src="`/${currentFrame.file}`" :alt="currentFrame.stateLabel" />
        <div class="scene-caption"><strong>{{ currentFrame?.stateLabel }}</strong><span>第 {{ step + 1 }} / {{ frames.length }} 步</span></div>
        <div class="quantity-overlay">
          <span v-for="([key, value]) in Object.entries(parameters)" :key="key"><small>{{ key }}</small><strong>{{ value }}</strong></span>
        </div>
      </div>
      <aside class="parameter-panel">
        <div class="panel-title"><Lightbulb :size="18" /><strong>动手调整</strong></div>
        <div v-for="([key, value]) in numericParameters" :key="key" class="stepper">
          <span>{{ key }}</span>
          <button type="button" :aria-label="`${key} 减少`" @click="adjust(key, -1)">−</button>
          <strong :data-value="key">{{ value }}</strong>
          <button type="button" :data-increment="key" :aria-label="`${key} 增加`" @click="adjust(key, 1)">＋</button>
        </div>
        <button type="button" class="check" data-action="check" @click="revealed = true">检查关系</button>
      </aside>
      <div class="step-bar">
        <button type="button" aria-label="上一步" :disabled="step === 0" @click="step -= 1"><ChevronLeft :size="19" />上一步</button>
        <div><i v-for="(_, index) in frames" :key="index" :class="{ active: index <= step }" /></div>
        <button type="button" aria-label="下一步" :disabled="step >= frames.length - 1" @click="step += 1">下一步<ChevronRight :size="19" /></button>
      </div>
    </div>
  </AnimationStageShell>
</template>

<style scoped>
.generic-module-stage { min-height: 100%; display: grid; grid-template-columns: minmax(0, 1fr) 250px; grid-template-rows: 1fr auto; background: #eef5f3; }.scene-panel { min-height: 460px; position: relative; overflow: hidden; background: white; }.scene-panel > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }.scene-caption { position: absolute; inset: 14px 14px auto; display: flex; justify-content: space-between; gap: 12px; padding: 9px 12px; background: #ffffffec; border: 1px solid var(--color-line); border-radius: 6px; }.scene-caption span { color: var(--color-muted); }.quantity-overlay { position: absolute; left: 14px; right: 14px; bottom: 14px; display: flex; flex-wrap: wrap; gap: 8px; }.quantity-overlay span { min-width: 76px; display: flex; justify-content: space-between; gap: 10px; padding: 7px 9px; background: #ffffffed; border: 1px solid var(--color-line); border-radius: 5px; }.quantity-overlay small { color: var(--color-muted); }.quantity-overlay strong { color: var(--color-primary); }
.parameter-panel { padding: 16px; display: grid; align-content: start; gap: 12px; border-left: 1px solid var(--color-line); background: white; }.panel-title { display: flex; align-items: center; gap: 8px; padding-bottom: 8px; }.stepper { display: grid; grid-template-columns: 1fr 38px 42px 38px; align-items: center; gap: 3px; }.stepper button { min-width: 38px; min-height: 38px; border: 1px solid var(--color-line); background: white; border-radius: 5px; }.stepper strong { text-align: center; }.check { margin-top: 8px; border: 0; border-radius: 6px; color: white; background: var(--color-primary); font-weight: 800; }.step-bar { grid-column: 1 / -1; min-height: 60px; display: grid; grid-template-columns: 140px 1fr 140px; align-items: center; border-top: 1px solid var(--color-line); background: white; }.step-bar button { border: 0; display: flex; align-items: center; justify-content: center; gap: 5px; background: white; font-weight: 800; }.step-bar button:disabled { opacity: .35; }.step-bar > div { display: flex; justify-content: center; gap: 7px; }.step-bar i { width: 28px; height: 5px; background: var(--color-line); border-radius: 999px; }.step-bar i.active { background: var(--color-primary); }
@media (max-width: 760px) { .generic-module-stage { grid-template-columns: 1fr; }.scene-panel { min-height: 380px; }.parameter-panel { border-left: 0; border-top: 1px solid var(--color-line); }.step-bar { grid-column: auto; grid-template-columns: 1fr 1fr; }.step-bar > div { display: none; } }
</style>
