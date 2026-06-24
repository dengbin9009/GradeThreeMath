<script setup lang="ts">
import { computed, ref } from "vue";
import type { ModuleId } from "../module.types";
import SceneStage from "../shared/scene/SceneStage.vue";

type ApplicationModuleId = Extract<ModuleId, "M10" | "M11" | "M13" | "M14" | "M15" | "M16" | "M17" | "M18" | "M19">;

const props = defineProps<{
  moduleId: ApplicationModuleId;
  parameters: Record<string, number | string>;
}>();

const activated = ref(false);
const secondary = ref(false);

function readNumber(key: string, fallback: number, min = 0) {
  const value = Math.round(Number(props.parameters[key]));
  return Math.max(min, Number.isFinite(value) && value !== 0 ? value : fallback);
}

function repeatCount(count: number, cap = 12) {
  return Math.max(0, Math.min(cap, Math.round(count)));
}

function patternTokens(pattern: string) {
  return Array.from(pattern || "红黄蓝").slice(0, 6);
}

const m10 = computed(() => {
  const price = readNumber("price", props.parameters.total !== undefined ? Math.round(readNumber("total", 84, 1) / readNumber("count", 7, 1)) : 12, 1);
  const count = readNumber("count", props.parameters.budget !== undefined ? Math.floor(readNumber("budget", 100, 1) / price) : 5, 1);
  const budget = props.parameters.budget !== undefined ? readNumber("budget", 100, 1) : 0;
  const total = props.parameters.total !== undefined ? readNumber("total", price * count, 1) : price * count;
  return { price, count, budget, total, remainder: budget ? budget - price * count : 0 };
});

const m11 = computed(() => {
  const speed = readNumber("speed", props.parameters.distance !== undefined ? Math.round(readNumber("distance", 240, 1) / readNumber("time", 4, 1)) : 60, 1);
  const time = readNumber("time", props.parameters.minutes !== undefined ? Math.max(1, Math.round(readNumber("minutes", 30, 1) / 60)) : 3, 1);
  const distance = props.parameters.distance !== undefined ? readNumber("distance", speed * time, 1) : speed * time;
  return { speed, time, distance };
});

const m13 = computed(() => {
  const times = readNumber("times", 3, 1);
  const unitCount = times + 1;
  if (props.parameters.difference !== undefined) {
    const difference = readNumber("difference", 48, 1);
    const small = Math.round(difference / Math.max(1, times - 1));
    return { times, unitCount: times - 1, unit: small, big: small * times, formula: `${difference}÷${times - 1}=${small}` };
  }
  const sum = readNumber("sum", 72, 1);
  const unit = Math.round(sum / unitCount);
  return { times, unitCount, unit, big: unit * times, formula: `${sum}÷${unitCount}=${unit}` };
});

const m14 = computed(() => {
  const total = readNumber("total", props.parameters.people !== undefined ? readNumber("people", 4, 1) * readNumber("days", 6, 1) : 48, 1);
  const count = readNumber("count", props.parameters.people !== undefined ? readNumber("people", 4, 1) : 6, 1);
  const newCount = readNumber("newCount", props.parameters.newPeople !== undefined ? readNumber("newPeople", 8, 1) : 9, 1);
  const unit = Math.round(total / count);
  return { total, count, newCount, unit, newTotal: unit * newCount };
});

const m15 = computed(() => {
  const length = readNumber("length", 40, 1);
  const gap = readNumber("gap", 5, 1);
  const intervals = Math.round(length / gap);
  const circular = props.parameters.length === 60;
  const noEnds = props.parameters.length === 36;
  const points = circular ? intervals : noEnds ? Math.max(0, intervals - 1) : intervals + 1;
  const formula = circular ? `${length}÷${gap}=${points}` : noEnds ? `${length}÷${gap}-1=${points}` : `${length}÷${gap}+1=${points}`;
  return { length, gap, intervals, points, formula };
});

const m16 = computed(() => {
  const pattern = String(props.parameters.pattern ?? (props.parameters.cycle ? "星期" : "红黄蓝"));
  const cycle = readNumber("cycle", patternTokens(pattern).length || 3, 1);
  const position = readNumber("position", readNumber("daysLater", 20, 1), 1);
  const quotient = Math.floor(position / cycle);
  const remainder = position % cycle;
  const landingIndex = remainder === 0 ? cycle : remainder;
  return { pattern, cycle, position, quotient, remainder, landingIndex, tokens: patternTokens(pattern) };
});

const m17 = computed(() => {
  const add = readNumber("add", 5, 0);
  const times = readNumber("times", 3, 1);
  const start = props.parameters.output !== undefined ? Math.round(readNumber("output", 42, 1) / times - add) : readNumber("start", 8, 1);
  const output = props.parameters.output !== undefined ? readNumber("output", 42, 1) : (start + add) * times;
  return { start, add, times, output };
});

const m18 = computed(() => {
  const first = readNumber("tops", readNumber("main", readNumber("cities", 3, 1), 1), 1);
  const second = readNumber("pants", readNumber("drink", props.parameters.cities !== undefined ? first - 1 : 2, 1), 1);
  const third = props.parameters.dessert !== undefined ? readNumber("dessert", 2, 1) : 1;
  return { first, second, third, total: first * second * third };
});

const m19 = computed(() => {
  const apples = readNumber("apples", 8, 1);
  const boxes = readNumber("boxes", 2, 1);
  const allowEmpty = props.parameters.apples === 5;
  const ways = allowEmpty && boxes === 2 ? apples + 1 : apples - 1;
  return { apples, boxes, allowEmpty, ways };
});

const formula = computed(() => {
  if (props.moduleId === "M10") return `${m10.value.price}×${m10.value.count}=${m10.value.total}`;
  if (props.moduleId === "M11") return `${m11.value.speed}×${m11.value.time}=${m11.value.distance}`;
  if (props.moduleId === "M13") return m13.value.formula;
  if (props.moduleId === "M14") return `${m14.value.total}÷${m14.value.count}=${m14.value.unit}`;
  if (props.moduleId === "M15") return m15.value.formula;
  if (props.moduleId === "M16") return `${m16.value.position}÷${m16.value.cycle}=${m16.value.quotient}……${m16.value.remainder}`;
  if (props.moduleId === "M17") return `(${m17.value.start}+${m17.value.add})×${m17.value.times}=${m17.value.output}`;
  if (props.moduleId === "M18") return m18.value.third > 1 ? `${m18.value.first}×${m18.value.second}×${m18.value.third}=${m18.value.total}` : `${m18.value.first}×${m18.value.second}=${m18.value.total}`;
  return m19.value.allowEmpty ? `${m19.value.apples}+1=${m19.value.ways}` : `${m19.value.apples}-1=${m19.value.ways}`;
});

const feedback = computed(() => {
  if (props.moduleId === "M10") return activated.value ? "收银条被拉长了：单价排了几次队，总价就跟着变大。" : "先把商品放进篮子，别让总价先跑到前台。";
  if (props.moduleId === "M11") return activated.value ? "路程条被车轮一格格铺出来，速度乘时间就是它的长度。" : "先让速度表和时间格站好队。";
  if (props.moduleId === "M13") return activated.value ? "同样的一份排整齐，倍数线段就不会偷偷变胖。" : "先把大线段拆成同样的一份。";
  if (props.moduleId === "M14") return activated.value ? "复制机先复制一份量，再批量盖章，归一没有跳步。" : "先求一份，复制机才知道要复制什么。";
  if (props.moduleId === "M15") return activated.value ? "点和段终于分清了：端点来不来，答案就差一个座位。" : "先数间隔，再决定端点要不要坐下。";
  if (props.moduleId === "M16") return activated.value ? "余数块找到自己的座位，余 0 就坐到本组最后一个位置。" : "先圈一组周期，彩带才不会无限绕晕。";
  if (props.moduleId === "M17") return activated.value ? "倒车模式启动：从输出往回走，机器也要按相反顺序让路。" : "正向先过加法门，再过乘法门。";
  if (props.moduleId === "M18") return activated.value ? "不重不漏的小卡片都进矩阵了，重复的卡片会被请回候选区。" : "先选行，再选列，每个交叉点都是一种搭配。";
  return activated.value ? "列表小卡一张张排好，盒子有区别，顺序可不能偷偷交换。" : "先规定能不能空盒，再开始列举。";
});

function activate(action: string) {
  activated.value = true;
  secondary.value = action === "reverse-flow";
}
</script>

<template>
  <SceneStage :module-id="props.moduleId" aspect-ratio="18 / 9" :min-heights="{ desktop: 540, tablet: 500, mobile: 640 }">
    <div class="app-stage" :data-application-module="props.moduleId">
      <aside class="app-console">
        <strong class="module-chip">{{ props.moduleId }} image2 大舞台</strong>
        <div class="formula-card" data-application-formula>{{ formula }}</div>
        <p data-playful-feedback>{{ feedback }}</p>
        <div class="hint-meter"><span>模型先行</span><b>全程整数</b></div>
      </aside>

      <section v-if="props.moduleId === 'M10'" class="visual shop-visual">
        <div class="scene-title">小商店收银台</div>
        <div class="shop-shelf">
          <span v-for="item in repeatCount(m10.count, 10)" :key="item" class="goods">￥{{ m10.price }}</span>
        </div>
        <div class="receipt" :class="{ active: activated }"><span v-for="item in m10.count" :key="item">{{ m10.price }}</span><strong>{{ m10.total }}</strong></div>
        <button type="button" data-action="checkout" @click="activate('checkout')">拉出收银条</button>
      </section>

      <section v-else-if="props.moduleId === 'M11'" class="visual motion-visual">
        <div class="scene-title">运动时间轴</div>
        <div class="track"><i class="vehicle" :class="{ active: activated }">车</i><span v-for="tick in repeatCount(m11.time, 8)" :key="tick" /></div>
        <div class="distance-bar"><b :style="{ width: activated ? '100%' : '35%' }">{{ m11.distance }} 千米</b></div>
        <button type="button" data-action="drive" @click="activate('drive')">开动车轮</button>
      </section>

      <section v-else-if="props.moduleId === 'M13'" class="visual segment-visual">
        <div class="scene-title">弹力线段工坊</div>
        <div class="bars">
          <div class="bar small"><span>{{ m13.unit }}</span></div>
          <div class="bar big" :style="{ gridTemplateColumns: `repeat(${m13.times}, 1fr)` }"><span v-for="unit in m13.times" :key="unit">{{ m13.unit }}</span></div>
        </div>
        <button type="button" data-action="split-units" @click="activate('split-units')">拆成同样一份</button>
      </section>

      <section v-else-if="props.moduleId === 'M14'" class="visual copier-visual">
        <div class="scene-title">批量生产线</div>
        <div class="unit-box">一份 {{ m14.unit }}</div>
        <div class="copies"><span v-for="copy in repeatCount(m14.newCount, 10)" :key="copy">{{ m14.unit }}</span></div>
        <div class="new-total">新总量 {{ m14.newTotal }}</div>
        <button type="button" data-action="copy-unit" @click="activate('copy-unit')">启动复制机</button>
      </section>

      <section v-else-if="props.moduleId === 'M15'" class="visual fence-visual">
        <div class="scene-title">点段栅栏</div>
        <div class="fence-line"><span v-for="point in repeatCount(m15.points, 14)" :key="point" class="flag" /><i v-for="gap in repeatCount(m15.intervals, 14)" :key="gap" /></div>
        <div class="point-count">点 {{ m15.points }}，段 {{ m15.intervals }}</div>
        <button type="button" data-action="plant-points" @click="activate('plant-points')">插上端点旗</button>
      </section>

      <section v-else-if="props.moduleId === 'M16'" class="visual cycle-visual">
        <div class="scene-title">循环彩带</div>
        <div class="ribbon"><span v-for="(token, index) in m16.tokens" :key="`${token}-${index}`" :class="{ landing: activated && index + 1 === m16.landingIndex }">{{ token }}</span></div>
        <div class="cycle-count">第 {{ m16.position }} 个落到第 {{ m16.landingIndex }} 位</div>
        <button type="button" data-action="locate-remainder" @click="activate('locate-remainder')">定位余数块</button>
      </section>

      <section v-else-if="props.moduleId === 'M17'" class="visual flow-visual">
        <div class="scene-title">路径机器</div>
        <div class="flow-path" :class="{ reverse: secondary }"><span>{{ secondary ? m17.output : m17.start }}</span><b>+{{ m17.add }}</b><b>×{{ m17.times }}</b><span>{{ secondary ? m17.start : m17.output }}</span></div>
        <button type="button" data-action="reverse-flow" @click="activate('reverse-flow')">倒着推回去</button>
      </section>

      <section v-else-if="props.moduleId === 'M18'" class="visual matrix-visual">
        <div class="scene-title">组合试衣台</div>
        <div class="matrix" :style="{ gridTemplateColumns: `repeat(${m18.second}, 1fr)` }">
          <span v-for="card in repeatCount(m18.total, 18)" :key="card">搭{{ card }}</span>
        </div>
        <div class="combo-total">共 {{ m18.total }} 种</div>
        <button type="button" data-action="make-cards" @click="activate('make-cards')">生成组合卡</button>
      </section>

      <section v-else class="visual apples-visual">
        <div class="scene-title">苹果盒子分配桌</div>
        <div class="apple-row"><span v-for="apple in repeatCount(m19.apples, 12)" :key="apple" /></div>
        <div class="ways"><b v-for="way in repeatCount(m19.ways, 12)" :key="way">法{{ way }}</b></div>
        <button type="button" data-action="list-ways" @click="activate('list-ways')">列出放法</button>
      </section>
    </div>
  </SceneStage>
</template>

<style scoped>
.app-stage { min-height: 100%; display: grid; grid-template-columns: 280px 1fr; gap: 16px; padding: 16px; background: linear-gradient(135deg, #f8fafc, #eef2ff 44%, #ecfdf5); }
.app-console { min-width: 0; display: grid; align-content: start; gap: 12px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: rgb(255 255 255 / 90%); box-shadow: 0 12px 30px rgb(15 23 42 / 8%); }
.module-chip { width: max-content; max-width: 100%; padding: 6px 9px; border-radius: 6px; background: #eef2ff; color: #3730a3; font-size: 13px; }
.formula-card { padding: 14px; border: 2px solid #c7d2fe; border-radius: 8px; background: white; color: var(--color-primary); font-size: 30px; font-weight: 900; line-height: 1.15; word-break: break-word; }
[data-playful-feedback] { margin: 0; padding: 12px; border: 1px solid #bbf7d0; border-radius: 8px; background: #f0fdf4; color: #14532d; font-weight: 900; line-height: 1.55; }
.hint-meter { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px; border-radius: 8px; background: #f1f5f9; color: #475569; font-weight: 800; }.hint-meter b { color: #15803d; }
.visual { position: relative; min-width: 0; overflow: hidden; display: grid; align-content: center; justify-items: center; gap: 16px; padding: 22px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
.visual button { min-height: 42px; padding: 0 14px; border: 0; border-radius: 7px; background: var(--color-primary); color: white; font-weight: 900; }
.scene-title { position: absolute; left: 18px; top: 14px; padding: 6px 9px; border-radius: 6px; background: rgb(255 255 255 / 88%); color: #334155; font-weight: 900; box-shadow: 0 8px 20px rgb(15 23 42 / 8%); }
.shop-visual { background: linear-gradient(#fff7ed 0 42%, #fef3c7 42%); }.shop-shelf, .apple-row, .copies, .ribbon, .matrix, .ways { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; width: min(760px, 94%); }
.goods, .copies span, .ribbon span, .matrix span, .ways b { min-width: 54px; min-height: 42px; display: grid; place-items: center; border-radius: 7px; background: white; border: 2px solid #cbd5e1; font-weight: 900; }
.receipt { width: min(640px, 94%); min-height: 80px; display: flex; align-items: center; gap: 8px; padding: 12px; border: 3px dashed #fb923c; border-radius: 8px; background: #fffbeb; transform: scaleX(.78); transform-origin: left; transition: transform 160ms ease; }.receipt.active { transform: scaleX(1); }.receipt strong { margin-left: auto; color: var(--color-primary); font-size: 34px; }
.motion-visual { background: linear-gradient(#dbeafe 0 48%, #e2e8f0 48%); }.track { width: min(760px, 94%); min-height: 130px; position: relative; display: flex; align-items: end; justify-content: space-between; border-bottom: 10px solid #64748b; }.track span { width: 6px; height: 36px; background: #94a3b8; }.vehicle { position: absolute; left: 4%; bottom: 16px; padding: 14px 18px; border-radius: 999px; background: #f97316; color: white; font-weight: 900; transition: left 180ms ease; }.vehicle.active { left: 78%; }.distance-bar { width: min(720px, 94%); height: 42px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }.distance-bar b { display: grid; place-items: center; height: 100%; border-radius: inherit; background: #22c55e; color: white; transition: width 180ms ease; }
.segment-visual { background: #f8fafc; }.bars { width: min(760px, 94%); display: grid; gap: 14px; }.bar { min-height: 58px; display: grid; gap: 6px; }.bar.small { width: 34%; }.bar.big { display: grid; }.bar span { display: grid; place-items: center; border-radius: 7px; background: #dbeafe; border: 2px solid #60a5fa; font-weight: 900; }
.copier-visual { background: linear-gradient(#ecfdf5 0 55%, #f1f5f9 55%); }.unit-box, .new-total, .point-count, .cycle-count, .combo-total { padding: 10px 16px; border-radius: 8px; background: white; border: 2px solid #cbd5e1; color: var(--color-primary); font-size: 24px; font-weight: 900; }
.fence-visual { background: linear-gradient(#e0f2fe 0 48%, #dcfce7 48%); }.fence-line { width: min(760px, 94%); min-height: 160px; display: flex; align-items: center; justify-content: center; gap: 4px; }.flag { width: 18px; height: 70px; border-radius: 999px 999px 0 0; background: #ef4444; }.fence-line i { width: 38px; height: 8px; background: #92400e; }
.cycle-visual { background: linear-gradient(#fef3c7 0 50%, #f8fafc 50%); }.ribbon span { background: #e0f2fe; }.ribbon .landing { background: #f97316; color: white; transform: translateY(-8px); }
.flow-visual { background: #eef2ff; }.flow-path { width: min(760px, 94%); display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; align-items: center; }.flow-path span, .flow-path b { min-height: 82px; display: grid; place-items: center; border-radius: 8px; background: white; border: 3px solid #818cf8; color: #3730a3; font-size: 28px; font-weight: 900; }.flow-path.reverse { direction: rtl; }
.matrix-visual { background: linear-gradient(#fdf2f8 0 45%, #f8fafc 45%); }.matrix { display: grid; grid-auto-rows: minmax(46px, auto); }.matrix span { background: #fce7f3; border-color: #f9a8d4; }
.apples-visual { background: linear-gradient(#ecfdf5 0 48%, #fef2f2 48%); }.apple-row span { width: 34px; height: 34px; border-radius: 50%; background: #ef4444; box-shadow: inset 0 -4px 0 rgb(0 0 0 / 15%); }.ways b { background: #fff7ed; border-color: #fdba74; }
@media (max-width: 900px) { .app-stage { grid-template-columns: 1fr; }.formula-card { font-size: 24px; }.visual { min-height: 430px; } }
@media (max-width: 560px) { .app-stage { padding: 10px; }.flow-path { grid-template-columns: 1fr; }.receipt { overflow-x: auto; }.formula-card { font-size: 22px; } }
</style>
