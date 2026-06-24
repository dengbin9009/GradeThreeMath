<script setup lang="ts">
import { computed, ref } from "vue";
import type { ModuleId } from "../module.types";
import SceneStage from "../shared/scene/SceneStage.vue";

type TimeFractionModuleId = Extract<ModuleId, "M22" | "M23" | "M24" | "M25" | "M26" | "M27">;

const props = defineProps<{
  moduleId: TimeFractionModuleId;
  parameters: Record<string, number | string>;
}>();

const activated = ref(false);

function readNumber(key: string, fallback: number, min = 0) {
  const value = Math.round(Number(props.parameters[key]));
  return Math.max(min, Number.isFinite(value) && value !== 0 ? value : fallback);
}

function repeatCount(count: number, cap = 16) {
  return Math.max(0, Math.min(cap, Math.round(count)));
}

function parseTime(value: string) {
  const pm = value.includes("下午");
  const clean = value.replace("上午", "").replace("下午", "");
  const [hourText, minuteText] = clean.split(":");
  let hour = Math.round(Number(hourText) || 0);
  const minute = Math.round(Number(minuteText) || 0);
  if (pm && hour < 12) hour += 12;
  return hour * 60 + minute;
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}小时${rest}分钟` : `${hours}小时`;
}

function monthDays(month: number, year = 2026) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

const m22 = computed(() => {
  const month = readNumber("month", readNumber("startMonth", 9, 1), 1);
  const year = readNumber("year", 2026, 1);
  const days = monthDays(month, year);
  const leapText = isLeapYear(year) ? "闰年" : "平年";
  const formula = props.parameters.year !== undefined ? `${year}年=${leapText}，2月${isLeapYear(year) ? 29 : 28}天` : `${month}月=${days}天`;
  return { month, year, days, leapText, formula };
});

const m23 = computed(() => {
  const start = String(props.parameters.start ?? "8:15");
  const end = String(props.parameters.end ?? "8:50");
  const startMinutes = parseTime(start);
  let endMinutes = parseTime(end);
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  const duration = endMinutes - startMinutes;
  return { start, end, duration, label: formatDuration(duration), percent: Math.min(100, Math.max(10, Math.round(duration / 3))) };
});

const m24 = computed(() => {
  const whole = String(props.parameters.whole ?? "一个整体");
  const parts = readNumber("parts", 4, 1);
  const part = readNumber("part", 1, 1);
  const total = props.parameters.part !== undefined ? part * parts : parts;
  return { whole, parts, part, total };
});

const m25 = computed(() => {
  const parts = readNumber("parts", 5, 1);
  const take = readNumber("take", 1, 1);
  return { parts, take: Math.min(take, parts) };
});

const m26 = computed(() => {
  const denominator = readNumber("denominator", 7, 1);
  const a = readNumber("a", 3, 1);
  const b = readNumber("b", 5, 1);
  if (props.parameters.fractionA && props.parameters.fractionB) {
    return { denominator: 6, a: 3, b: 3, formula: `${props.parameters.fractionA}=${props.parameters.fractionB}` };
  }
  if (props.parameters.denominator === undefined) {
    return { denominator: a * b, a: b, b: a, formula: `1/${a}>1/${b}` };
  }
  return { denominator, a, b, formula: `${Math.max(a, b)}/${denominator}>${Math.min(a, b)}/${denominator}` };
});

const m27 = computed(() => {
  const total = readNumber("total", props.parameters.partValue !== undefined ? 16 : 24, 1);
  const parts = readNumber("parts", 3, 1);
  const take = readNumber("take", 1, 1);
  const onePart = Math.round(total / parts);
  const result = props.parameters.partValue !== undefined ? Math.round(readNumber("partValue", 12, 1) / take * parts) : onePart * take;
  return { total, parts, take, onePart, result };
});

const formula = computed(() => {
  if (props.moduleId === "M22") return m22.value.formula;
  if (props.moduleId === "M23") return `${m23.value.start}→${m23.value.end}=${m23.value.label}`;
  if (props.moduleId === "M24") return props.parameters.part !== undefined ? `${m24.value.part}×${m24.value.parts}=${m24.value.total}` : `${m24.value.whole}÷${m24.value.parts}=1份`;
  if (props.moduleId === "M25") return `涂色=${m25.value.take}/${m25.value.parts}`;
  if (props.moduleId === "M26") return m26.value.formula;
  return props.parameters.partValue !== undefined ? `${props.parameters.partValue}÷${m27.value.take}×${m27.value.parts}=${m27.value.result}` : `${m27.value.total}÷${m27.value.parts}=${m27.value.onePart}`;
});

const feedback = computed(() => {
  if (props.moduleId === "M22") return activated.value ? "月份牌翻过来，二月还会根据平闰年偷偷伸缩。" : "先看月份牌，别让大小月混进同一个抽屉。";
  if (props.moduleId === "M23") return activated.value ? "时间条被拉开了，跨小时也只是继续往右数分钟。" : "先把起点和终点插到同一条时间轨上。";
  if (props.moduleId === "M24") return activated.value ? "单位1先站到垫子中央，后面的几分之一才有家可回。" : "先问整体是谁，再谈其中的一份。";
  if (props.moduleId === "M25") return activated.value ? "涂色小刷子只刷等大的格子，不等分的格子会被请回重切。" : "先等分，再涂几份。";
  if (props.moduleId === "M26") return activated.value ? "同一个整体上叠一叠，谁遮住更多，谁就更大。" : "先盖同一个整体的印章，再比较阴影。";
  return activated.value ? "先分再取，分享桌不接受一上来就抓走一把。" : "先把总数平均分成几份，再取需要的份数。";
});

function activate() {
  activated.value = true;
}
</script>

<template>
  <SceneStage :module-id="props.moduleId" aspect-ratio="18 / 9" :min-heights="{ desktop: 540, tablet: 500, mobile: 640 }">
    <div class="tf-stage" :data-time-fraction-module="props.moduleId">
      <aside class="tf-console">
        <strong class="module-chip">{{ props.moduleId }} 时间分数小剧场</strong>
        <div class="formula-card" data-time-fraction-formula>{{ formula }}</div>
        <p data-playful-feedback>{{ feedback }}</p>
        <div class="hint-meter"><span>先定单位</span><b>整数计算</b></div>
      </aside>

      <section v-if="props.moduleId === 'M22'" class="visual calendar-visual">
        <div class="scene-title">翻页日历台</div>
        <div class="calendar-card" :class="{ active: activated }"><strong>{{ m22.month }}月</strong><span>{{ m22.days }}天</span></div>
        <div class="calendar-strip"><span v-for="day in repeatCount(m22.days, 12)" :key="day" /></div>
        <button type="button" data-action="flip-calendar" @click="activate">翻月份牌</button>
      </section>

      <section v-else-if="props.moduleId === 'M23'" class="visual timeline-visual">
        <div class="scene-title">双层时间轨</div>
        <div class="time-track"><span>{{ m23.start }}</span><i><b :style="{ width: activated ? `${m23.percent}%` : '22%' }">{{ m23.label }}</b></i><span>{{ m23.end }}</span></div>
        <button type="button" data-action="stretch-time" @click="activate">拉开时间条</button>
      </section>

      <section v-else-if="props.moduleId === 'M24'" class="visual unit-visual">
        <div class="scene-title">单位 1 工作垫</div>
        <div class="whole-mat" :class="{ active: activated }"><strong>{{ m24.whole }}</strong><div><span v-for="part in repeatCount(m24.parts, 10)" :key="part">1份</span></div></div>
        <button type="button" data-action="choose-whole" @click="activate">圈出单位1</button>
      </section>

      <section v-else-if="props.moduleId === 'M25'" class="visual slice-visual">
        <div class="scene-title">等分切割台</div>
        <div class="slice-board" :style="{ gridTemplateColumns: `repeat(${m25.parts}, 1fr)` }">
          <span v-for="part in m25.parts" :key="part" :class="{ shaded: activated && part <= m25.take }" />
        </div>
        <button type="button" data-action="shade-parts" @click="activate">涂色几份</button>
      </section>

      <section v-else-if="props.moduleId === 'M26'" class="visual compare-visual">
        <div class="scene-title">同整体叠片台</div>
        <div class="compare-bars">
          <div :style="{ gridTemplateColumns: `repeat(${m26.denominator}, 1fr)` }"><span v-for="part in m26.denominator" :key="part" :class="{ fill: part <= m26.a }" /></div>
          <div :style="{ gridTemplateColumns: `repeat(${m26.denominator}, 1fr)` }"><span v-for="part in m26.denominator" :key="part" :class="{ fill: part <= m26.b }" /></div>
        </div>
        <button type="button" data-action="compare-fractions" @click="activate">叠到同一个整体</button>
      </section>

      <section v-else class="visual share-visual">
        <div class="scene-title">分物分享桌</div>
        <div class="items"><span v-for="item in repeatCount(m27.total, 15)" :key="item" /></div>
        <div class="share-trays"><b v-for="part in repeatCount(m27.parts, 8)" :key="part" :class="{ taken: activated && part <= m27.take }">{{ m27.onePart }}</b></div>
        <button type="button" data-action="share-items" @click="activate">先分再取</button>
      </section>
    </div>
  </SceneStage>
</template>

<style scoped>
.tf-stage { min-height: 100%; display: grid; grid-template-columns: 280px 1fr; gap: 16px; padding: 16px; background: linear-gradient(135deg, #f8fafc, #eff6ff 44%, #fefce8); }
.tf-console { min-width: 0; display: grid; align-content: start; gap: 12px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: rgb(255 255 255 / 90%); box-shadow: 0 12px 30px rgb(15 23 42 / 8%); }
.module-chip { width: max-content; max-width: 100%; padding: 6px 9px; border-radius: 6px; background: #dbeafe; color: #1d4ed8; font-size: 13px; }
.formula-card { padding: 14px; border: 2px solid #bfdbfe; border-radius: 8px; background: white; color: var(--color-primary); font-size: 30px; font-weight: 900; line-height: 1.15; word-break: break-word; }
[data-playful-feedback] { margin: 0; padding: 12px; border: 1px solid #fde68a; border-radius: 8px; background: #fefce8; color: #713f12; font-weight: 900; line-height: 1.55; }
.hint-meter { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px; border-radius: 8px; background: #f1f5f9; color: #475569; font-weight: 800; }.hint-meter b { color: #15803d; }
.visual { position: relative; min-width: 0; overflow: hidden; display: grid; align-content: center; justify-items: center; gap: 18px; padding: 22px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
.visual button { min-height: 42px; padding: 0 14px; border: 0; border-radius: 7px; background: var(--color-primary); color: white; font-weight: 900; }
.scene-title { position: absolute; left: 18px; top: 14px; padding: 6px 9px; border-radius: 6px; background: rgb(255 255 255 / 88%); color: #334155; font-weight: 900; box-shadow: 0 8px 20px rgb(15 23 42 / 8%); }
.calendar-visual { background: linear-gradient(#e0f2fe 0 42%, #fff7ed 42%); }.calendar-card { width: 220px; min-height: 190px; display: grid; place-items: center; align-content: center; gap: 8px; border: 5px solid #2563eb; border-radius: 8px; background: white; transition: transform 160ms ease; }.calendar-card.active { transform: rotateY(10deg) scale(1.04); }.calendar-card strong { font-size: 42px; color: #1d4ed8; }.calendar-card span { font-size: 30px; font-weight: 900; color: #f97316; }.calendar-strip { width: min(720px, 94%); display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }.calendar-strip span { width: 28px; height: 24px; border-radius: 5px; background: #bfdbfe; }
.timeline-visual { background: linear-gradient(#eff6ff 0 50%, #f1f5f9 50%); }.time-track { width: min(760px, 94%); display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; font-weight: 900; }.time-track i { height: 52px; overflow: hidden; border-radius: 999px; background: #e2e8f0; }.time-track b { height: 100%; display: grid; place-items: center; border-radius: inherit; background: #22c55e; color: white; transition: width 160ms ease; white-space: nowrap; }
.unit-visual { background: linear-gradient(#ecfdf5 0 46%, #fef3c7 46%); }.whole-mat { width: min(700px, 94%); min-height: 260px; display: grid; align-content: center; gap: 18px; padding: 20px; border: 4px solid #16a34a; border-radius: 8px; background: white; }.whole-mat.active { box-shadow: 0 0 0 8px #bbf7d0; }.whole-mat strong { text-align: center; color: #166534; font-size: 30px; }.whole-mat div { display: grid; grid-template-columns: repeat(auto-fit, minmax(72px, 1fr)); gap: 8px; }.whole-mat span { display: grid; place-items: center; min-height: 48px; border-radius: 7px; background: #dcfce7; font-weight: 900; }
.slice-visual { background: #f8fafc; }.slice-board { width: min(720px, 94%); min-height: 240px; display: grid; gap: 6px; padding: 12px; border: 5px solid #92400e; border-radius: 8px; background: #fffbeb; }.slice-board span { border-radius: 6px; background: #fde68a; border: 2px dashed #d97706; }.slice-board span.shaded { background: #60a5fa; border-color: #1d4ed8; }
.compare-visual { background: linear-gradient(#fdf2f8 0 45%, #eef2ff 45%); }.compare-bars { width: min(760px, 94%); display: grid; gap: 16px; }.compare-bars div { display: grid; gap: 5px; min-height: 80px; padding: 10px; border-radius: 8px; background: white; border: 2px solid #cbd5e1; }.compare-bars span { border-radius: 5px; background: #e2e8f0; }.compare-bars .fill { background: #f472b6; }
.share-visual { background: linear-gradient(#ecfdf5 0 48%, #fef2f2 48%); }.items, .share-trays { width: min(740px, 94%); display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }.items span { width: 30px; height: 30px; border-radius: 50%; background: #f97316; box-shadow: inset 0 -4px 0 rgb(0 0 0 / 15%); }.share-trays b { min-width: 72px; min-height: 58px; display: grid; place-items: center; border-radius: 8px; background: white; border: 3px solid #94a3b8; color: #334155; font-size: 22px; }.share-trays b.taken { border-color: #16a34a; background: #dcfce7; color: #166534; }
@media (max-width: 900px) { .tf-stage { grid-template-columns: 1fr; }.formula-card { font-size: 24px; }.visual { min-height: 430px; } }
@media (max-width: 560px) { .tf-stage { padding: 10px; }.formula-card { font-size: 22px; }.time-track { grid-template-columns: 1fr; }.calendar-card { width: 190px; min-height: 160px; } }
</style>
