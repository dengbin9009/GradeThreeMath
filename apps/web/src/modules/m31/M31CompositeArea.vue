<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";

const props = defineProps<{ parameters: Record<string, number | string> }>();
type Method = "fill" | "split";
const method = ref<Method>("fill");
const value = (key: string, fallback: number) => Math.max(1, Math.round(Number(props.parameters[key]) || fallback));
const outerLength = computed(() => value("outerLength", 10));
const outerWidth = computed(() => value("outerWidth", 8));
const missingLength = computed(() => value("missingLength", 3));
const missingWidth = computed(() => value("missingWidth", 2));
const area = computed(() => outerLength.value * outerWidth.value - missingLength.value * missingWidth.value);
const splitLeft = computed(() => missingLength.value * outerLength.value);
const splitRight = computed(() => area.value - splitLeft.value);
const formula = computed(() => method.value === "fill"
  ? `${outerLength.value}×${outerWidth.value} - ${missingLength.value}×${missingWidth.value} = ${area.value}`
  : `${splitLeft.value} + ${splitRight.value} = ${area.value}`);
</script>

<template>
  <SceneStage module-id="M31" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 480, mobile: 520 }">
    <div class="area-stage">
      <div class="workbench">
        <div class="grid-shape" :class="method">
          <div class="missing">缺口</div>
          <div class="cut-line" />
        </div>
        <div class="dimensions"><span>外框 {{ outerLength }}×{{ outerWidth }}</span><span>缺口 {{ missingLength }}×{{ missingWidth }}</span></div>
        <div data-area-formula class="formula">{{ formula }}</div>
      </div>
      <div data-playful-feedback class="feedback">{{ method === 'fill' ? '补成整块好算，再把缺口请出去。' : '切成认识的长方形，整块好算的心情保住了。' }}</div>
      <div class="controls">
        <button data-method="fill" :class="{ active: method === 'fill' }" @click="method = 'fill'">添补法</button>
        <button data-method="split" :class="{ active: method === 'split' }" @click="method = 'split'">分割法</button>
      </div>
    </div>
  </SceneStage>
</template>

<style scoped>
.area-stage { min-height: 100%; display: grid; grid-template-rows: 1fr auto auto; background: #f8fafc; }
.workbench { min-height: 380px; display: grid; place-items: center; align-content: center; gap: 16px; padding: 28px; }
.grid-shape { position: relative; width: min(560px, 82vw); aspect-ratio: 10 / 8; border: 4px solid #0f766e; border-radius: 8px; background-image: linear-gradient(#dbeafe 1px, transparent 1px), linear-gradient(90deg, #dbeafe 1px, transparent 1px); background-size: 10% 12.5%; background-color: #ecfeff; box-shadow: 0 10px 28px #17203318; }
.missing { position: absolute; right: -4px; top: -4px; width: 30%; height: 25%; display: grid; place-items: center; border: 4px solid #ef4444; border-top-right-radius: 8px; background: #fff; color: #ef4444; font-weight: 900; }
.cut-line { position: absolute; left: 30%; top: 0; bottom: 0; width: 4px; background: #f59e0b; opacity: 0; }
.grid-shape.split .cut-line { opacity: 1; }
.dimensions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.dimensions span, .formula { padding: 8px 12px; border-radius: 7px; background: white; font-weight: 900; box-shadow: 0 6px 18px #17203312; }
.formula { color: var(--color-primary); }
.feedback { margin: 0 auto 10px; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border: 1px solid #bbf7d0; border-radius: 7px; background: white; color: #166534; font-weight: 900; text-align: center; }
.controls { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--color-line); }
.controls button { border: 0; background: white; font-weight: 900; }
.controls .active { color: white; background: var(--color-primary); }
@media (max-width: 620px) { .workbench { min-height: 420px; padding: 16px; }.grid-shape { width: min(360px, 90vw); } }
</style>
