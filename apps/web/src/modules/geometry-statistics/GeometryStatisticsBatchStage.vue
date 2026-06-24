<script setup lang="ts">
import { computed, ref } from "vue";
import type { ModuleId } from "../module.types";
import SceneStage from "../shared/scene/SceneStage.vue";

type GeometryModuleId = Extract<ModuleId, "M28" | "M29" | "M30" | "M32" | "M33" | "M34" | "M35" | "M36" | "M37" | "M38">;

const props = defineProps<{
  moduleId: GeometryModuleId;
  parameters: Record<string, number | string>;
}>();

const activated = ref(false);

function readNumber(key: string, fallback: number, min = 0) {
  const value = Math.round(Number(props.parameters[key]));
  return Math.max(min, Number.isFinite(value) && value !== 0 ? value : fallback);
}

function repeatCount(count: number, cap = 24) {
  return Math.max(0, Math.min(cap, Math.round(count)));
}

const m28 = computed(() => {
  const meters = readNumber("meters", 3, 0);
  const centimeters = readNumber("centimeters", 40, 0);
  return { meters, centimeters, total: meters * 100 + centimeters };
});

const m29 = computed(() => {
  const rows = readNumber("rows", 4, 1);
  const cols = readNumber("cols", 6, 1);
  return { rows, cols, area: rows * cols };
});

const m30 = computed(() => {
  const length = readNumber("length", props.parameters.area !== undefined ? Math.round(readNumber("area", 48, 1) / readNumber("width", 6, 1)) : readNumber("side", 8, 1), 1);
  const width = readNumber("width", readNumber("side", 5, 1), 1);
  return { length, width, area: length * width };
});

const m32 = computed(() => {
  const full = readNumber("fullCells", 18, 0);
  const half = readNumber("halfCells", 0, 0);
  const estimated = full + Math.round(half / 2);
  return { full, half, estimated };
});

const m34 = computed(() => {
  const length = readNumber("length", props.parameters.perimeter !== undefined ? 15 : readNumber("side", 12, 1), 1);
  const width = readNumber("width", props.parameters.perimeter !== undefined ? Math.round(readNumber("perimeter", 46, 1) / 2 - length) : readNumber("side", 7, 1), 1);
  return { length, width, perimeter: (length + width) * 2 };
});

const m35 = computed(() => {
  const perimeter = readNumber("perimeter", props.parameters.area !== undefined ? 20 : 24, 1);
  const half = Math.round(perimeter / 2);
  const bestWidth = Math.floor(half / 2);
  const bestLength = half - bestWidth;
  return { perimeter, half, bestLength, bestWidth, bestArea: bestLength * bestWidth };
});

const m36 = computed(() => {
  const shape = String(props.parameters.shape ?? "长方形");
  const axisCount = shape === "长方形" ? 2 : shape === "正方形" ? 4 : 1;
  return { shape, axisCount };
});

const m37 = computed(() => {
  const angle = readNumber("angle", 90, 1);
  const sideA = readNumber("sideA", 5, 1);
  const sideB = readNumber("sideB", 5, 1);
  const sideC = readNumber("sideC", 7, 1);
  const byAngle = angle === 90 ? "直角三角形" : angle > 90 ? "钝角三角形" : "锐角三角形";
  const bySide = sideA === sideB || sideA === sideC || sideB === sideC ? "等腰三角形" : "一般三角形";
  return { angle, sideA, sideB, sideC, byAngle, bySide };
});

const m38 = computed(() => {
  const scale = readNumber("scale", 5, 1);
  const value = readNumber("value", readNumber("a", 20, 1), 1);
  const b = readNumber("b", 0, 0);
  return { scale, value, bars: Math.round(value / scale), diff: b ? value - b : 4 * scale };
});

const formula = computed(() => {
  if (props.moduleId === "M28") return `${m28.value.meters}米${m28.value.centimeters}厘米=${m28.value.total}厘米`;
  if (props.moduleId === "M29") return `${m29.value.rows}×${m29.value.cols}=${m29.value.area}`;
  if (props.moduleId === "M30") return `${m30.value.length}×${m30.value.width}=${m30.value.area}`;
  if (props.moduleId === "M32") return m32.value.half ? `${m32.value.full}+${m32.value.half}÷2=${m32.value.estimated}` : `整格至少=${m32.value.full}`;
  if (props.moduleId === "M33") return "边界一周=周长";
  if (props.moduleId === "M34") return `(${m34.value.length}+${m34.value.width})×2=${m34.value.perimeter}`;
  if (props.moduleId === "M35") return `${m35.value.perimeter}÷2=${m35.value.half}`;
  if (props.moduleId === "M36") return `${m36.value.shape}=${m36.value.axisCount}条对称轴`;
  if (props.moduleId === "M37") return props.parameters.angle !== undefined ? `${m37.value.angle}°=${m37.value.byAngle}` : `${m37.value.sideA},${m37.value.sideB},${m37.value.sideC}=${m37.value.bySide}`;
  return props.parameters.scale !== undefined ? `4格×${m38.value.scale}=20人` : `${m38.value.value}÷${m38.value.scale}=${m38.value.bars}格`;
});

const feedback = computed(() => {
  if (props.moduleId === "M28") return activated.value ? "尺带放大以后，米和厘米终于排成同一队。" : "先把单位请到同一把尺上。";
  if (props.moduleId === "M29") return activated.value ? "铺砖一行一行吸到网格里，面积就是小方砖的数量。" : "先看单位正方形，再数铺了多少块。";
  if (props.moduleId === "M30") return activated.value ? "行列手柄一拖，面积格子跟着排队变多。" : "长是几列，宽是几行。";
  if (props.moduleId === "M32") return activated.value ? "半格举手参加估算，两个半格凑成一个整格。" : "先分清整格和半格。";
  if (props.moduleId === "M33") return activated.value ? "边界小车绕外面一周，跑进里面就不算周长。" : "周长只沿边界走。";
  if (props.moduleId === "M34") return activated.value ? "四条边都围上，绳头才会乖乖接回起点。" : "围一圈不能漏掉另一条长和另一条宽。";
  if (props.moduleId === "M35") return activated.value ? "面积榜开始营业，同一根绳子围得越接近正方形越占便宜。" : "同周长不等于同面积。";
  if (props.moduleId === "M36") return activated.value ? "镜面一合，能重合的才算对称轴。" : "先放镜面，再看两边能不能重合。";
  if (props.moduleId === "M37") return activated.value ? "分类牌分两排：按角看角度，按边看边长。" : "三角形可以按角分，也可以按边分。";
  return activated.value ? "刻度先定好，柱子才知道该升几格。" : "一格代表多少，先别让柱子乱长高。";
});

function activate() {
  activated.value = true;
}
</script>

<template>
  <SceneStage :module-id="props.moduleId" aspect-ratio="18 / 9" :min-heights="{ desktop: 540, tablet: 500, mobile: 640 }">
    <div class="geo-stage" :data-geometry-module="props.moduleId">
      <aside class="geo-console">
        <strong class="module-chip">{{ props.moduleId }} image2 大舞台</strong>
        <div class="formula-card" data-geometry-formula>{{ formula }}</div>
        <p data-playful-feedback>{{ feedback }}</p>
        <div class="hint-meter"><span>量先看清</span><b>整数标注</b></div>
      </aside>

      <section v-if="props.moduleId === 'M28'" class="visual ruler-visual"><div class="scene-title">伸缩尺带</div><div class="ruler"><b :style="{ width: activated ? '86%' : '42%' }">{{ m28.total }}厘米</b></div><button data-action="zoom-ruler" @click="activate">放大尺带</button></section>
      <section v-else-if="props.moduleId === 'M29'" class="visual tile-visual"><div class="scene-title">方格铺砖场</div><div class="tile-grid" :style="{ gridTemplateColumns: `repeat(${m29.cols}, 1fr)` }"><span v-for="cell in repeatCount(m29.area, 24)" :key="cell" /></div><button data-action="tile-area" @click="activate">开始铺砖</button></section>
      <section v-else-if="props.moduleId === 'M30'" class="visual area-visual"><div class="scene-title">拖拉方格板</div><div class="rect-board" :style="{ gridTemplateColumns: `repeat(${m30.length}, 1fr)` }"><span v-for="cell in repeatCount(m30.area, 36)" :key="cell" /></div><button data-action="drag-size" @click="activate">拖动长宽</button></section>
      <section v-else-if="props.moduleId === 'M32'" class="visual estimate-visual"><div class="scene-title">透明网格观察窗</div><div class="estimate-grid"><span v-for="cell in repeatCount(m32.full, 18)" :key="`f-${cell}`" /><b v-for="cell in repeatCount(m32.half, 8)" :key="`h-${cell}`" /></div><button data-action="count-grid" @click="activate">数整格半格</button></section>
      <section v-else-if="props.moduleId === 'M33'" class="visual boundary-visual"><div class="scene-title">边界巡线车</div><div class="boundary-shape" :class="{ active: activated }"><span>外边一周</span></div><button data-action="trace-boundary" @click="activate">沿边界跑一圈</button></section>
      <section v-else-if="props.moduleId === 'M34'" class="visual fence-visual"><div class="scene-title">围栏绳卷</div><div class="fence-rect"><span>{{ m34.length }}</span><span>{{ m34.width }}</span><span>{{ m34.length }}</span><span>{{ m34.width }}</span></div><button data-action="wrap-fence" @click="activate">围上四条边</button></section>
      <section v-else-if="props.moduleId === 'M35'" class="visual rope-visual"><div class="scene-title">同绳变形场</div><div class="rope-options"><span v-for="n in 4" :key="n" :class="{ best: n === 3 }">{{ m35.bestArea - 3 + n }}</span></div><button data-action="reshape-rope" @click="activate">同绳变形</button></section>
      <section v-else-if="props.moduleId === 'M36'" class="visual mirror-visual"><div class="scene-title">镜面瓷砖台</div><div class="mirror-board" :class="{ active: activated }"><span /><i /></div><button data-action="mirror-shape" @click="activate">合上镜面</button></section>
      <section v-else-if="props.moduleId === 'M37'" class="visual triangle-visual"><div class="scene-title">弯杆三角架</div><div class="triangle-frame"><span>{{ m37.angle }}°</span><b>{{ m37.byAngle }}</b></div><button data-action="classify-triangle" @click="activate">贴上分类牌</button></section>
      <section v-else class="visual chart-visual"><div class="scene-title">数据柱图升降台</div><div class="bars"><span :style="{ height: activated ? '160px' : '86px' }" /><span :style="{ height: '112px' }" /><span :style="{ height: '70px' }" /></div><button data-action="raise-bars" @click="activate">按刻度升柱</button></section>
    </div>
  </SceneStage>
</template>

<style scoped>
.geo-stage { min-height: 100%; display: grid; grid-template-columns: 280px 1fr; gap: 16px; padding: 16px; background: linear-gradient(135deg, #f8fafc, #ecfeff 42%, #fefce8); }
.geo-console { min-width: 0; display: grid; align-content: start; gap: 12px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: rgb(255 255 255 / 90%); box-shadow: 0 12px 30px rgb(15 23 42 / 8%); }
.module-chip { width: max-content; max-width: 100%; padding: 6px 9px; border-radius: 6px; background: #ccfbf1; color: #0f766e; font-size: 13px; }.formula-card { padding: 14px; border: 2px solid #99f6e4; border-radius: 8px; background: white; color: var(--color-primary); font-size: 30px; font-weight: 900; line-height: 1.15; word-break: break-word; }
[data-playful-feedback] { margin: 0; padding: 12px; border: 1px solid #fed7aa; border-radius: 8px; background: #fff7ed; color: #7c2d12; font-weight: 900; line-height: 1.55; }.hint-meter { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px; border-radius: 8px; background: #f1f5f9; color: #475569; font-weight: 800; }.hint-meter b { color: #15803d; }
.visual { position: relative; min-width: 0; overflow: hidden; display: grid; align-content: center; justify-items: center; gap: 18px; padding: 22px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }.visual button { min-height: 42px; padding: 0 14px; border: 0; border-radius: 7px; background: var(--color-primary); color: white; font-weight: 900; }.scene-title { position: absolute; left: 18px; top: 14px; padding: 6px 9px; border-radius: 6px; background: rgb(255 255 255 / 88%); color: #334155; font-weight: 900; box-shadow: 0 8px 20px rgb(15 23 42 / 8%); }
.ruler { width: min(740px, 94%); height: 70px; padding: 8px; border-radius: 8px; background: repeating-linear-gradient(90deg, #fde68a 0 38px, #facc15 38px 42px); border: 4px solid #92400e; }.ruler b { display: grid; place-items: center; height: 100%; border-radius: 6px; background: #38bdf8; color: white; transition: width 160ms ease; }
.tile-grid, .rect-board, .estimate-grid { width: min(720px, 94%); display: grid; gap: 5px; padding: 12px; border: 4px solid #64748b; border-radius: 8px; background: #f8fafc; }.tile-grid span, .rect-board span, .estimate-grid span, .estimate-grid b { min-height: 34px; border-radius: 4px; background: #bfdbfe; }.estimate-grid { grid-template-columns: repeat(6, 1fr); }.estimate-grid b { background: linear-gradient(135deg, #fdba74 50%, transparent 50%); border: 1px solid #fb923c; }
.boundary-shape { width: 280px; height: 190px; display: grid; place-items: center; border: 12px solid #2563eb; border-radius: 26px 8px 36px 8px; background: #dbeafe; color: #1d4ed8; font-weight: 900; }.boundary-shape.active { outline: 8px solid #f97316; }
.fence-rect { width: min(520px, 88%); height: 260px; position: relative; border: 10px solid #92400e; border-radius: 8px; background: #dcfce7; }.fence-rect span { position: absolute; padding: 6px 10px; border-radius: 6px; background: white; font-weight: 900; }.fence-rect span:nth-child(1) { top: -44px; left: 45%; }.fence-rect span:nth-child(2) { right: -54px; top: 45%; }.fence-rect span:nth-child(3) { bottom: -44px; left: 45%; }.fence-rect span:nth-child(4) { left: -54px; top: 45%; }
.rope-options { display: flex; gap: 12px; align-items: end; }.rope-options span { width: 92px; display: grid; place-items: center; border: 5px solid #0f766e; border-radius: 8px; background: #ecfeff; font-size: 28px; font-weight: 900; }.rope-options span:nth-child(1) { height: 110px; }.rope-options span:nth-child(2) { height: 145px; }.rope-options span:nth-child(3) { height: 180px; }.rope-options span:nth-child(4) { height: 132px; }.rope-options .best { background: #bbf7d0; border-color: #16a34a; }
.mirror-board { width: 320px; height: 240px; display: grid; grid-template-columns: 1fr 4px 1fr; gap: 16px; align-items: center; }.mirror-board span, .mirror-board i { height: 150px; border-radius: 8px; background: #c4b5fd; }.mirror-board::before { content: ""; width: 4px; height: 240px; background: #2563eb; grid-column: 2; grid-row: 1; }.mirror-board.active i { background: #a7f3d0; }
.triangle-frame { width: 0; height: 0; border-left: 155px solid transparent; border-right: 155px solid transparent; border-bottom: 250px solid #bfdbfe; position: relative; }.triangle-frame span, .triangle-frame b { position: absolute; left: -70px; display: grid; place-items: center; min-width: 140px; padding: 8px; border-radius: 7px; background: white; color: #1d4ed8; font-weight: 900; }.triangle-frame span { top: 90px; }.triangle-frame b { top: 148px; }
.bars { width: min(500px, 88%); min-height: 230px; display: flex; gap: 28px; align-items: end; justify-content: center; padding: 20px; border-left: 6px solid #334155; border-bottom: 6px solid #334155; }.bars span { width: 70px; border-radius: 7px 7px 0 0; background: #60a5fa; transition: height 160ms ease; }
@media (max-width: 900px) { .geo-stage { grid-template-columns: 1fr; }.formula-card { font-size: 24px; }.visual { min-height: 430px; } }
@media (max-width: 560px) { .geo-stage { padding: 10px; }.formula-card { font-size: 22px; }.rope-options span { width: 64px; }.fence-rect { width: 260px; height: 190px; } }
</style>
