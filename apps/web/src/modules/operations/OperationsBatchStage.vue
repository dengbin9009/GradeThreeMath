<script setup lang="ts">
import { computed, ref } from "vue";
import type { ModuleId } from "../module.types";
import SceneStage from "../shared/scene/SceneStage.vue";

type OperationModuleId = Extract<ModuleId, "M04" | "M05" | "M06" | "M07" | "M08">;
type CoverTarget = "product" | "factor-a" | "factor-b";

const props = defineProps<{
  moduleId: OperationModuleId;
  parameters: Record<string, number | string>;
}>();

const areaMerged = ref(false);
const regrouped = ref(false);
const coverTarget = ref<CoverTarget>("product");
const snapped = ref(false);
const estimateValue = ref(readNumber("n", 48, 1));
const trial = ref(Math.max(1, Math.floor(readNumber("dividend", 156, 1) / readNumber("divisor", 31, 1))));

function readNumber(key: string, fallback: number, min = 0) {
  const value = Math.round(Number(props.parameters[key]));
  return Math.max(min, Number.isFinite(value) && value !== 0 ? value : fallback);
}

function dots(count: number, cap = 12) {
  return Math.max(0, Math.min(cap, Math.round(count)));
}

const m04 = computed(() => {
  const a = readNumber("a", 24, 1);
  const b = readNumber("b", 13, 1);
  const aTens = Math.floor(a / 10) * 10;
  const aOnes = a - aTens;
  const bTens = Math.floor(b / 10) * 10;
  const bOnes = b - bTens;
  const partials = [
    { key: "tt", label: `${aTens}×${bTens}`, value: aTens * bTens },
    { key: "to", label: `${aTens}×${bOnes}`, value: aTens * bOnes },
    { key: "ot", label: `${aOnes}×${bTens}`, value: aOnes * bTens },
    { key: "oo", label: `${aOnes}×${bOnes}`, value: aOnes * bOnes }
  ];
  return { a, b, aTens, aOnes, bTens, bOnes, partials, product: a * b };
});

const m05 = computed(() => {
  const total = readNumber("total", 96, 1);
  const groups = readNumber("groups", 3, 1);
  const quotient = Math.floor(total / groups);
  const remainder = total - quotient * groups;
  return { total, groups, quotient, remainder };
});

const m06 = computed(() => {
  const dividend = readNumber("dividend", 156, 1);
  const divisor = readNumber("divisor", 31, 1);
  const currentTrial = Math.max(1, Math.round(trial.value));
  const product = divisor * currentTrial;
  const remainder = dividend - product;
  const maxTrial = Math.max(6, Math.ceil(dividend / divisor) + 3);
  const productPercent = Math.min(100, Math.round((product / dividend) * 100));
  return { dividend, divisor, trial: currentTrial, product, remainder, maxTrial, productPercent };
});

const m07 = computed(() => {
  const a = readNumber("a", 8, 1);
  const b = readNumber("b", 7, 1);
  return { a, b, product: a * b };
});

const m08 = computed(() => {
  const n = Math.max(1, Math.round(estimateValue.value));
  const lower = Math.floor(n / 10) * 10;
  const upper = lower + 10;
  const rounded = n - lower < upper - n ? lower : upper;
  const position = Math.round(((n - lower) / 10) * 100);
  return { n, lower, upper, rounded, position };
});

const formula = computed(() => {
  if (props.moduleId === "M04") return `(${m04.value.aTens}+${m04.value.aOnes})×(${m04.value.bTens}+${m04.value.bOnes})=${m04.value.product}`;
  if (props.moduleId === "M05") return `${m05.value.total}÷${m05.value.groups}=${m05.value.quotient}${m05.value.remainder ? `……${m05.value.remainder}` : ""}`;
  if (props.moduleId === "M06") return `${m06.value.divisor}×${m06.value.trial}=${m06.value.product}`;
  if (props.moduleId === "M07") return `${m07.value.a}×${m07.value.b}=${m07.value.product}`;
  return `${m08.value.n}≈${m08.value.rounded}`;
});

const feedback = computed(() => {
  if (props.moduleId === "M04") return areaMerged.value ? "部分积全部归队，四块地毯拼回一个完整大长方形。" : "先把几十和几切开，四块面积分别露出自己的小牌子。";
  if (props.moduleId === "M05") return regrouped.value ? "换成小单位后再平均分，托盘里的数量终于一样多。" : "先按组数分托盘，高位分不动时先别硬塞。";
  if (props.moduleId === "M06") {
    if (m06.value.product > m06.value.dividend) return "试商太大，乘积条已经顶过被除数，赶紧往回滑。";
    if (m06.value.remainder >= m06.value.divisor) return "试商还小，余数比除数还大，可以再大胆一点。";
    return "试商刚好，余数比除数小，升降台稳稳停住。";
  }
  if (props.moduleId === "M07") {
    if (coverTarget.value === "product") return "遮住谁，就用另外两个量找它：两个因数相乘能把总数请回来。";
    return "遮住谁，就从总数倒着除回去，关系三角不会迷路。";
  }
  return snapped.value ? "磁铁把小旗吸到最近的整十数，近似数只认最近的岸。" : "小旗先站在数轴上，比较它离左边和右边谁更近。";
});
</script>

<template>
  <SceneStage :module-id="props.moduleId" aspect-ratio="18 / 9" :min-heights="{ desktop: 540, tablet: 500, mobile: 620 }">
    <div class="ops-stage" :data-operation-module="props.moduleId">
      <aside class="ops-console">
        <strong class="module-chip">{{ props.moduleId }} image2 大舞台</strong>
        <div class="formula-card" data-operation-formula>{{ formula }}</div>
        <p data-playful-feedback>{{ feedback }}</p>
        <div class="hint-meter">
          <span>整数模式</span>
          <b>不出小数</b>
        </div>
      </aside>

      <section v-if="props.moduleId === 'M04'" class="visual area-visual" data-image2-contract="m04-area-array">
        <div class="scene-title">面积阵列地毯</div>
        <div class="area-board" :class="{ merged: areaMerged }">
          <div v-for="part in m04.partials" :key="part.key" class="area-tile" :data-area-tile="part.key">
            <span>{{ part.label }}</span>
            <strong>{{ part.value }}</strong>
          </div>
        </div>
        <div class="stage-controls">
          <button type="button" data-action="split" @click="areaMerged = false">拆开看</button>
          <button type="button" data-action="merge" @click="areaMerged = true">合并部分积</button>
        </div>
      </section>

      <section v-else-if="props.moduleId === 'M05'" class="visual sharing-visual" data-image2-contract="m05-sharing-trays">
        <div class="scene-title">分物托盘流水线</div>
        <div class="pile">
          <span v-for="dot in dots(m05.total, 18)" :key="dot" />
          <strong>{{ m05.total }}</strong>
        </div>
        <div class="trays">
          <div v-for="tray in m05.groups" :key="tray" class="tray" data-tray>
            <div class="tray-dots">
              <span v-for="dot in dots(m05.quotient, 10)" :key="dot" />
            </div>
            <strong>{{ m05.quotient }}</strong>
          </div>
        </div>
        <div class="remainder-cup" :class="{ active: regrouped }">余 {{ m05.remainder }}</div>
        <div class="stage-controls">
          <button type="button" data-action="regroup" @click="regrouped = true">换成小单位</button>
          <button type="button" @click="regrouped = false">回到总量</button>
        </div>
      </section>

      <section v-else-if="props.moduleId === 'M06'" class="visual trial-visual" data-image2-contract="m06-trial-quotient">
        <div class="scene-title">试商升降台</div>
        <div class="trial-board">
          <div class="bar-label">被除数 {{ m06.dividend }}</div>
          <div class="dividend-bar"><span /></div>
          <div class="bar-label">除数×试商 {{ m06.product }}</div>
          <div class="product-bar"><span :style="{ width: `${m06.productPercent}%` }" :class="{ over: m06.product > m06.dividend }" /></div>
          <div v-if="m06.product > m06.dividend" class="over-badge">超出 {{ m06.product - m06.dividend }}</div>
          <div v-else class="over-badge calm">剩 {{ Math.max(0, m06.remainder) }}</div>
        </div>
        <label class="trial-slider">
          <span>试商 {{ m06.trial }}</span>
          <input v-model.number="trial" data-trial-slider type="range" min="1" :max="m06.maxTrial" step="1" />
        </label>
      </section>

      <section v-else-if="props.moduleId === 'M07'" class="visual relation-visual" data-image2-contract="m07-relation-triangle">
        <div class="scene-title">乘除关系三角柜</div>
        <div class="triangle-stage">
          <button class="node node-top" :class="{ covered: coverTarget === 'product' }" data-cover="product" @click="coverTarget = 'product'">{{ coverTarget === 'product' ? '?' : m07.product }}</button>
          <button class="node node-left" :class="{ covered: coverTarget === 'factor-a' }" data-cover="factor-a" @click="coverTarget = 'factor-a'">{{ coverTarget === 'factor-a' ? '?' : m07.a }}</button>
          <button class="node node-right" :class="{ covered: coverTarget === 'factor-b' }" data-cover="factor-b" @click="coverTarget = 'factor-b'">{{ coverTarget === 'factor-b' ? '?' : m07.b }}</button>
        </div>
        <div class="relation-formula" data-relation-formula>{{ m07.a }}×{{ m07.b }}={{ m07.product }}</div>
      </section>

      <section v-else class="visual estimate-visual" data-image2-contract="m08-estimation-zoom">
        <div class="scene-title">数轴望远镜</div>
        <label class="number-slider">
          <span>原数 {{ m08.n }}</span>
          <input v-model.number="estimateValue" data-number-slider type="range" min="1" max="99" step="1" @input="snapped = false" />
        </label>
        <div class="number-line">
          <span class="line-end">{{ m08.lower }}</span>
          <i class="line" />
          <span class="line-end">{{ m08.upper }}</span>
          <b class="number-flag" :class="{ snapped }" :style="{ left: `${snapped ? (m08.rounded === m08.lower ? 0 : 100) : m08.position}%` }">{{ snapped ? m08.rounded : m08.n }}</b>
        </div>
        <button type="button" class="magnet-button" data-action="snap" @click="snapped = true">吸到最近整十</button>
      </section>
    </div>
  </SceneStage>
</template>

<style scoped>
.ops-stage { min-height: 100%; display: grid; grid-template-columns: 280px 1fr; gap: 16px; padding: 16px; background: linear-gradient(135deg, #f8fafc, #ecfeff 42%, #fff7ed); }
.ops-console { min-width: 0; display: grid; align-content: start; gap: 12px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: rgb(255 255 255 / 88%); box-shadow: 0 12px 30px rgb(15 23 42 / 8%); }
.module-chip { width: max-content; max-width: 100%; padding: 6px 9px; border-radius: 6px; background: #e0f2fe; color: #075985; font-size: 13px; }
.formula-card { padding: 14px; border: 2px solid #bfdbfe; border-radius: 8px; background: white; color: var(--color-primary); font-size: 30px; font-weight: 900; line-height: 1.15; word-break: break-word; }
[data-playful-feedback] { margin: 0; padding: 12px; border: 1px solid #fed7aa; border-radius: 8px; background: #fff7ed; color: #7c2d12; font-weight: 900; line-height: 1.55; }
.hint-meter { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px; border-radius: 8px; background: #f1f5f9; color: #475569; font-weight: 800; }.hint-meter b { color: #15803d; }
.visual { position: relative; min-width: 0; overflow: hidden; display: grid; align-content: center; gap: 16px; padding: 22px; border: 1px solid #cbd5e1; border-radius: 8px; background: #ffffff; }
.scene-title { position: absolute; left: 18px; top: 14px; padding: 6px 9px; border-radius: 6px; background: rgb(255 255 255 / 88%); color: #334155; font-weight: 900; box-shadow: 0 8px 20px rgb(15 23 42 / 8%); }
.stage-controls { display: flex; justify-content: center; gap: 10px; }.stage-controls button, .magnet-button { min-height: 42px; padding: 0 14px; border: 0; border-radius: 7px; background: var(--color-primary); color: white; font-weight: 900; }.stage-controls button:first-child { background: #0f766e; }
.area-visual { background: linear-gradient(#e0f2fe 0 35%, #fef3c7 35% 100%); }
.area-board { width: min(720px, 92%); min-height: 330px; justify-self: center; display: grid; grid-template-columns: 2.4fr 1fr; grid-template-rows: 2.2fr 1fr; gap: 12px; padding: 16px; border: 8px solid #92400e; border-radius: 8px; background: #fffbeb; transition: gap 180ms ease, transform 180ms ease; }.area-board.merged { gap: 2px; transform: scale(1.02); }
.area-tile { display: grid; place-items: center; align-content: center; gap: 8px; border: 2px dashed rgb(120 53 15 / 55%); border-radius: 8px; background: #fef3c7; color: #7c2d12; font-weight: 900; }.area-tile strong { font-size: 34px; color: #2563eb; }
.sharing-visual { background: linear-gradient(#ecfeff 0 44%, #e5e7eb 44%); }
.pile { width: 150px; min-height: 150px; justify-self: center; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 6px; padding: 16px; border: 5px solid #0e7490; border-radius: 50%; background: #cffafe; }.pile span, .tray-dots span { width: 13px; height: 13px; border-radius: 50%; background: #f97316; box-shadow: inset 0 -2px 0 rgb(0 0 0 / 12%); }.pile strong { width: 100%; text-align: center; color: #155e75; font-size: 28px; }
.trays { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; }.tray { min-height: 130px; display: grid; place-items: center; align-content: center; gap: 8px; border: 4px solid #94a3b8; border-radius: 8px; background: #f8fafc; }.tray-dots { min-height: 50px; display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; }.tray strong { font-size: 30px; color: var(--color-primary); }
.remainder-cup { justify-self: center; padding: 10px 18px; border: 2px solid #cbd5e1; border-radius: 999px; background: white; font-weight: 900; }.remainder-cup.active { border-color: #fb923c; background: #ffedd5; color: #9a3412; }
.trial-visual { background: linear-gradient(#eff6ff 0 42%, #f1f5f9 42%); }
.trial-board { width: min(760px, 96%); justify-self: center; display: grid; gap: 8px; padding: 18px; border-radius: 8px; background: white; box-shadow: inset 0 0 0 2px #bfdbfe; }.bar-label { color: #475569; font-weight: 900; }.dividend-bar, .product-bar { height: 46px; overflow: hidden; border-radius: 999px; background: #e2e8f0; }.dividend-bar span, .product-bar span { display: block; height: 100%; border-radius: inherit; background: #38bdf8; }.dividend-bar span { width: 100%; }.product-bar span { background: #22c55e; }.product-bar span.over { background: #ef4444; }.over-badge { justify-self: end; padding: 7px 10px; border-radius: 6px; background: #fee2e2; color: #991b1b; font-weight: 900; }.over-badge.calm { background: #dcfce7; color: #166534; }
.trial-slider, .number-slider { width: min(680px, 92%); justify-self: center; display: grid; gap: 8px; font-weight: 900; }.trial-slider input, .number-slider input { width: 100%; accent-color: var(--color-primary); }
.relation-visual { background: radial-gradient(circle at 50% 42%, #fef3c7, #dbeafe 68%, #f8fafc); }
.triangle-stage { width: min(620px, 92%); min-height: 360px; justify-self: center; position: relative; }.triangle-stage::before { content: ""; position: absolute; inset: 55px 95px 55px; clip-path: polygon(50% 0, 0 100%, 100% 100%); background: rgb(37 99 235 / 12%); border: 4px solid rgb(37 99 235 / 40%); }
.node { position: absolute; width: 112px; height: 88px; border: 4px solid #2563eb; border-radius: 8px; background: white; color: #1d4ed8; font-size: 32px; font-weight: 900; box-shadow: 0 10px 0 #bfdbfe; }.node.covered { border-color: #f97316; color: #c2410c; background: #fff7ed; }.node-top { left: calc(50% - 56px); top: 12px; }.node-left { left: 58px; bottom: 10px; }.node-right { right: 58px; bottom: 10px; }
.relation-formula { justify-self: center; padding: 10px 18px; border-radius: 8px; background: white; color: var(--color-primary); font-size: 28px; font-weight: 900; }
.estimate-visual { background: linear-gradient(#e0f2fe 0 48%, #fef9c3 48%); }
.number-line { width: min(760px, 92%); min-height: 190px; justify-self: center; position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding-top: 58px; }.line { height: 12px; border-radius: 999px; background: linear-gradient(90deg, #0f766e, #2563eb); }.line-end { font-size: 26px; font-weight: 900; color: #334155; }.number-flag { position: absolute; top: 22px; transform: translateX(-50%); display: grid; place-items: center; min-width: 60px; height: 52px; padding: 0 8px; border: 3px solid #f97316; border-radius: 8px 8px 8px 0; background: white; color: #c2410c; font-size: 26px; font-weight: 900; transition: left 180ms ease, transform 180ms ease; }.number-flag.snapped { transform: translateX(-50%) scale(1.08); background: #ffedd5; }
.magnet-button { justify-self: center; background: #db2777; }
@media (max-width: 900px) { .ops-stage { grid-template-columns: 1fr; }.formula-card { font-size: 24px; }.visual { min-height: 420px; }.ops-console { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .ops-stage { padding: 10px; }.area-board { min-height: 260px; }.node { width: 86px; height: 70px; font-size: 26px; }.node-left { left: 10px; }.node-right { right: 10px; } }
</style>
