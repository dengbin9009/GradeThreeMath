<script setup lang="ts">
import { computed, ref } from "vue";
import { buildBorrowReturnReplay } from "./m39.domain";

const props = defineProps<{ parameters: Record<string, number | string> }>();
type Step = "now" | "undo-return" | "undo-borrow" | "verify";
const step = ref<Step>("now");
const value = (key: string) => Math.round(Number(props.parameters[key]) || 0);
const returned = computed(() => value("returned"));
const remaining = computed(() => value("remaining"));
const borrowed = computed(() => value("borrowed") || value("firstOut") + value("secondOut") || Math.max(0, value("original") + returned.value - remaining.value));
const original = computed(() => value("original") || remaining.value - returned.value + borrowed.value);
const replay = computed(() => buildBorrowReturnReplay({ borrowed: borrowed.value, returned: returned.value, remaining: remaining.value }));
const sceneIndex = computed(() => ({ now: 0, "undo-return": 1, "undo-borrow": 2, verify: 3 })[step.value]);
const scene = computed(() => replay.value[sceneIndex.value]!);
const shelfCount = computed(() => {
  return scene.value.shelf;
});
const returnedCount = computed(() => scene.value.returnedBasket);
const borrowedCount = computed(() => scene.value.borrowedBasket);
const message = computed(() => ({
  now: `现在书架上有 ${remaining.value} 本。`,
  "undo-return": `撤销还回：${remaining.value} - ${returned.value} = ${remaining.value - returned.value}。`,
  "undo-borrow": `${remaining.value} - ${returned.value} + ${borrowed.value} = ${original.value}。`,
  verify: `${original.value} - ${borrowed.value} + ${returned.value} = ${remaining.value}。`
})[step.value]);
</script>

<template>
  <div class="borrow-return">
    <div class="scene">
      <div class="shelf-zone" data-zone="shelf">
        <div class="shelf-label"><span>书架</span><strong>{{ shelfCount }} 本</strong></div>
        <div class="shelves">
          <img v-for="book in shelfCount" :key="`s-${book}`" data-book src="/assets/module-frames/m39-borrow-return/book-token.svg" alt="" />
        </div>
      </div>
      <div class="basket-zone borrowed" data-zone="borrowed">
        <div><span>借出篮</span><strong>{{ borrowedCount }} 本</strong></div>
        <div class="basket-books"><img v-for="book in borrowedCount" :key="`b-${book}`" data-book src="/assets/module-frames/m39-borrow-return/book-token.svg" alt="" /></div>
      </div>
      <div class="basket-zone returned" data-zone="returned">
        <div><span>还回篮</span><strong>{{ returnedCount }} 本</strong></div>
        <div class="basket-books"><img v-for="book in returnedCount" :key="`r-${book}`" data-book src="/assets/module-frames/m39-borrow-return/book-token.svg" alt="" /></div>
      </div>
      <div class="equation" aria-live="polite">{{ message }}</div>
    </div>
    <div class="step-controls" aria-label="逆推步骤">
      <button data-step="now" :class="{ active: step === 'now' }" @click="step = 'now'">看现在</button>
      <button data-step="undo-return" :class="{ active: step === 'undo-return' }" @click="step = 'undo-return'">撤销还回</button>
      <button data-step="undo-borrow" :class="{ active: step === 'undo-borrow' }" @click="step = 'undo-borrow'">撤销借出</button>
      <button data-step="verify" :class="{ active: step === 'verify' }" @click="step = 'verify'">正向验算</button>
    </div>
  </div>
</template>

<style scoped>
.borrow-return { min-height: 100%; display: grid; grid-template-rows: 1fr auto; background: #eef6f3; }.scene { min-height: 430px; position: relative; padding: 28px; display: grid; grid-template-columns: minmax(280px, 1.5fr) 1fr 1fr; gap: 18px; align-items: end; }
.shelf-zone, .basket-zone { min-width: 0; }.shelf-label, .basket-zone > div:first-child { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 800; }.shelves { min-height: 280px; padding: 18px; display: flex; flex-wrap: wrap-reverse; align-content: flex-start; gap: 5px; background: #fff8ed; border: 10px solid #8b5a2b; box-shadow: inset 0 -84px #c58b4b, inset 0 -92px #8b5a2b, inset 0 -176px #c58b4b, inset 0 -184px #8b5a2b; }
[data-book] { width: 26px; height: 42px; object-fit: contain; filter: drop-shadow(0 2px 1px #17203333); }.basket-zone { min-height: 180px; padding: 14px; background: #fff; border: 3px solid var(--color-line); border-radius: 6px; }.borrowed { border-color: #e6a23c; }.returned { border-color: var(--color-accent); }.basket-books { display: flex; flex-wrap: wrap; gap: 3px; align-content: flex-start; max-height: 130px; overflow: hidden; }.basket-books [data-book] { width: 20px; height: 33px; }
.equation { position: absolute; left: 50%; top: 22px; transform: translateX(-50%); width: max-content; max-width: calc(100% - 40px); padding: 10px 16px; color: #153b71; background: white; border: 2px solid #153b71; border-radius: 6px; font-size: 18px; font-weight: 900; text-align: center; }.step-controls { min-height: 64px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; border-top: 1px solid var(--color-line); background: var(--color-line); }.step-controls button { border: 0; background: white; font-weight: 800; }.step-controls button.active { color: white; background: var(--color-primary); }
@media (max-width: 760px) { .scene { min-height: 500px; grid-template-columns: 1fr 1fr; padding: 72px 14px 16px; }.shelf-zone { grid-column: 1 / -1; }.shelves { min-height: 190px; }.basket-zone { min-height: 130px; }.step-controls { grid-template-columns: 1fr 1fr; }.equation { top: 14px; font-size: 15px; } }
</style>
