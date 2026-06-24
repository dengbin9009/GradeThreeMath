<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";

const props = defineProps<{ parameters: Record<string, number | string> }>();
type Order = "combine-first" | "combine-last";
const order = ref<Order>("combine-first");
const value = (key: string, fallback: number) => Math.max(1, Math.round(Number(props.parameters[key]) || fallback));
type Triple = [number, number, number];
const factors = computed<Triple>(() => {
  if (props.parameters.total !== undefined) return [value("total", 96), value("group", 4), value("box", 3)];
  if (props.parameters.rows !== undefined) return [value("rows", 4), value("perRow", 6), value("boxes", 5)];
  return [value("a", 3), value("b", 4), value("c", 5)];
});
const mode = computed(() => props.parameters.total !== undefined ? "divide" : "multiply");
const middle = computed(() => order.value === "combine-first"
  ? mode.value === "divide" ? Math.round(factors.value[0] / factors.value[1]) : factors.value[0] * factors.value[1]
  : mode.value === "divide" ? factors.value[1] * factors.value[2] : factors.value[1] * factors.value[2]);
const result = computed(() => mode.value === "divide"
  ? order.value === "combine-first" ? Math.round(middle.value / factors.value[2]) : Math.round(factors.value[0] / middle.value)
  : order.value === "combine-first" ? middle.value * factors.value[2] : factors.value[0] * middle.value);
const operator = computed(() => mode.value === "divide" ? "÷" : "×");
</script>

<template>
  <SceneStage module-id="M01" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 480, mobile: 520 }">
    <div class="conveyor-stage">
      <div class="belt">
        <div data-conveyor-boxes class="boxes">
          <span v-for="(factor, index) in factors" :key="index">{{ factor }}</span>
        </div>
        <div class="machine">
          <small>{{ order === 'combine-first' ? '先合并前两个' : '先合并后两个' }}</small>
          <strong data-middle-result>{{ middle }}</strong>
        </div>
        <div class="answer"><small>结果</small><strong>{{ result }}</strong></div>
      </div>
      <div class="formula">{{ factors.join(` ${operator} `) }} = {{ result }}</div>
      <div data-playful-feedback class="feedback">{{ order === 'combine-first' ? '数字箱顺着传送带出发。' : '后两个数字箱先重新排队，机器轻松一点。' }}</div>
      <div class="controls">
        <button data-order="combine-first" :class="{ active: order === 'combine-first' }" @click="order = 'combine-first'">先合并前两个</button>
        <button data-order="combine-last" :class="{ active: order === 'combine-last' }" @click="order = 'combine-last'">先合并后两个</button>
      </div>
    </div>
  </SceneStage>
</template>

<style scoped>
.conveyor-stage { min-height: 100%; display: grid; grid-template-rows: 1fr auto auto auto; background: #edf7f5; }
.belt { min-height: 330px; display: grid; grid-template-columns: 1fr 220px 160px; gap: 18px; align-items: center; padding: 36px; background: linear-gradient(#f8fafc 0 58%, #b7d3d0 58% 68%, #e2e8f0 68%); }
.boxes { display: flex; justify-content: center; gap: 14px; }
.boxes span { width: 84px; height: 70px; display: grid; place-items: center; border: 3px solid #2563eb; border-radius: 8px; background: white; color: var(--color-primary); font-size: 30px; font-weight: 900; box-shadow: 0 8px 0 #bfdbfe; }
.machine, .answer { min-height: 132px; display: grid; place-items: center; align-content: center; gap: 8px; border: 3px solid #0f766e; border-radius: 8px; background: #ffffffed; }
.machine strong, .answer strong { font-size: 36px; color: var(--color-primary); }
.formula, .feedback { margin: 10px auto 0; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border-radius: 7px; background: white; font-weight: 900; text-align: center; }
.feedback { border: 1px solid #bae6fd; color: #075985; }
.controls { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--color-line); }
.controls button { border: 0; background: white; font-weight: 900; }
.controls .active { color: white; background: var(--color-primary); }
@media (max-width: 700px) { .belt { grid-template-columns: 1fr; padding: 18px; }.boxes span { width: 64px; height: 56px; font-size: 24px; } }
</style>
