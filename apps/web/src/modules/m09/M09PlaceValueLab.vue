<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";

const props = defineProps<{ parameters: { n?: number; a?: number; b?: number } }>();
const number = ref(Math.max(1, Math.round(props.parameters.n ?? props.parameters.a ?? 3056)));
const places = computed(() => {
  const text = String(number.value).padStart(4, "0").slice(-4);
  return [
    { key: "thousands", label: "千位", digit: Number(text[0]) },
    { key: "hundreds", label: "百位", digit: Number(text[1]) },
    { key: "tens", label: "十位", digit: Number(text[2]) },
    { key: "ones", label: "个位", digit: Number(text[3]) }
  ];
});
</script>

<template>
  <SceneStage module-id="M09" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 500, mobile: 620 }">
  <div class="place-lab">
    <aside>
      <div data-upgrade-status class="upgrade-status">基准动画 · 工具联动</div>
      <label for="place-number">数字</label>
      <input id="place-number" v-model.number="number" type="range" min="1000" max="9999" step="1" />
      <strong data-numeral>{{ number }}</strong>
      <p>{{ places.map((place) => `${place.digit}×${10 ** (3 - places.indexOf(place))}`).join(' + ') }}</p>
      <p data-tool-feedback class="tool-feedback">零也占位：百位没有珠子，位置也不能丢。</p>
    </aside>
    <section class="tool rods">
      <header><strong>算筹 / 位值积木</strong><span>一位一栏</span></header>
      <div class="places">
        <div v-for="place in places" :key="place.key" :data-place="place.key" class="place-column">
          <div class="counter-stack"><i v-for="counter in place.digit" :key="counter" data-counter /></div>
          <span>{{ place.label }}</span>
        </div>
      </div>
    </section>
    <section class="tool abacus">
      <header><strong>算盘</strong><span>上珠5，下珠1</span></header>
      <div class="abacus-board">
        <div v-for="place in places" :key="place.key" class="rod">
          <i class="upper" :class="{ on: place.digit >= 5 }" />
          <b />
          <i v-for="bead in 4" :key="bead" :class="{ on: bead <= place.digit % 5 }" />
          <span>{{ place.label }}</span>
        </div>
      </div>
    </section>
    <section class="tool calculator">
      <header><strong>计算器</strong><span>先看再检查</span></header>
      <div class="device"><div>{{ number }}</div><button v-for="(digit, index) in String(number)" :key="`${index}-${digit}`">{{ digit }}</button></div>
    </section>
  </div>
  </SceneStage>
</template>

<style scoped>
.place-lab { min-height: 100%; display: grid; grid-template-columns: 220px repeat(3, 1fr); gap: 12px; padding: 16px; background: #eef4f2; }.place-lab > aside, .tool { min-width: 0; padding: 14px; background: white; border: 1px solid var(--color-line); border-radius: 7px; }.place-lab > aside { display: flex; flex-direction: column; gap: 12px; }.place-lab > aside strong { font-size: 38px; }.place-lab > aside p { color: var(--color-muted); line-height: 1.5; }
.upgrade-status { width: max-content; max-width: 100%; padding: 5px 8px; border-radius: 6px; background: #e8f2ff; color: var(--color-primary); font-size: 12px; font-weight: 900; }.tool-feedback { margin-top: auto; padding: 10px; border: 1px solid #bfdbfe; border-radius: 6px; background: #eff6ff; font-weight: 800; }
.tool header { display: flex; justify-content: space-between; gap: 8px; }.tool header span { color: var(--color-muted); font-size: 12px; }.places { height: 390px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding-top: 34px; }.place-column { display: grid; grid-template-rows: 1fr auto; text-align: center; }.counter-stack { display: flex; flex-direction: column-reverse; align-items: center; gap: 4px; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px; }.counter-stack i { width: 30px; height: 18px; border-radius: 5px; background: #f59e0b; box-shadow: 0 2px 0 #b86e00; }
.abacus-board { height: 390px; display: grid; grid-template-columns: repeat(4, 1fr); border: 8px solid #8b5a2b; margin-top: 24px; background: #fff7ea; }.rod { display: grid; grid-template-rows: 55px 10px repeat(4, 42px) auto; justify-items: center; align-items: center; border-right: 2px solid #d8b99a; }.rod:last-child { border-right: 0; }.rod i { width: 34px; height: 18px; border-radius: 999px; background: #d8e0ea; }.rod i.on { background: #2864e8; }.rod .upper.on { background: #ef4444; }.rod b { width: 100%; height: 8px; background: #8b5a2b; }
.calculator { display: grid; grid-template-rows: auto 1fr; }.device { align-self: center; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 16px; background: #172033; border-radius: 8px; }.device div { grid-column: 1 / -1; padding: 12px; text-align: right; font: 800 30px monospace; background: #cff78d; border-radius: 5px; }.device button { min-width: 0; border: 0; border-radius: 5px; background: #f8fafc; font-weight: 800; }
@media (max-width: 1100px) { .place-lab { grid-template-columns: 190px 1fr 1fr; }.calculator { grid-column: 2 / -1; min-height: 260px; } }.place-lab { min-width: 0; }
@media (max-width: 700px) { .place-lab { grid-template-columns: 1fr; }.place-lab > aside { position: sticky; top: 0; z-index: 2; }.tool, .calculator { grid-column: auto; min-height: 420px; }.places, .abacus-board { height: 330px; } }
</style>
