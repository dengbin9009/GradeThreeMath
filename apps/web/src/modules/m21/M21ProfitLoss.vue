<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";
const props = defineProps<{ parameters: Record<string, number> }>();
const split = ref(false);
const groupSizeOverride = ref<number | null>(null);
const value = (key: string) => Math.round(props.parameters[key] ?? 0);
const totalGap = computed(() => {
  if (props.parameters.short !== undefined) return value("short") + value("left");
  if (props.parameters.leftMore !== undefined) return value("leftMore") - value("leftLess");
  return value("shortMore") - value("shortLess");
});
const gapEach = computed(() => {
  if (props.parameters.short !== undefined) return value("moreEach") + value("lessEach");
  return value("moreEach") - value("lessEach");
});
const activeGapEach = computed(() => groupSizeOverride.value ?? gapEach.value);
const people = computed(() => Math.max(1, Math.round(totalGap.value / Math.max(1, activeGapEach.value))));
const frame = computed(() => `/assets/module-frames/m21-profit-loss/m21-profit-loss-${split.value ? '03-split-gap' : '02-compare-gap'}.png`);
function updateGapEach(value: number) {
  groupSizeOverride.value = Math.max(1, Math.round(value));
  split.value = true;
}
</script>

<template>
  <SceneStage module-id="M21" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 500, mobile: 500 }">
  <div class="profit-lab">
    <div class="scene">
      <img :src="frame" alt="盈亏差额分组场景" />
      <div class="formula"><span>总差 {{ totalGap }}</span><b>÷</b><span>每人差 {{ activeGapEach }}</span><b>=</b><strong>{{ people }} 人</strong></div>
      <div data-gap-feedback class="gap-feedback">先把多和少合成总差，再看每人差。</div>
      <div v-if="!split" class="chip-pool"><i v-for="chip in totalGap" :key="chip" /></div>
      <div v-else class="person-groups">
        <div v-for="person in people" :key="person" data-person-group><span>第{{ person }}人</span><div><i v-for="chip in activeGapEach" :key="chip" /></div></div>
      </div>
    </div>
    <div data-playful-feedback class="profit-feedback">{{ split ? `每人差 ${activeGapEach} 个筹码，差额裁判分成 ${people} 组。` : '差额裁判先把多和少推到同一条差额尺上。' }}</div>
    <div class="controls">
      <label class="gap-slider"><span>拖每人差</span><input data-gap-slider type="range" min="1" :max="totalGap" step="1" :value="activeGapEach" @input="updateGapEach(Number(($event.target as HTMLInputElement).value))" /></label>
      <button @click="split = false; groupSizeOverride = null">比较两种方案</button>
      <button data-action="split" @click="split = true; groupSizeOverride = null">按每人差分组</button>
    </div>
  </div>
  </SceneStage>
</template>

<style scoped>
.profit-lab { min-height: 100%; display: grid; grid-template-rows: 1fr auto auto; background: #fff8ec; }.scene { min-height: 390px; position: relative; overflow: hidden; padding: 104px 28px 24px; }.scene > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .28; }.formula { position: absolute; z-index: 2; top: 18px; left: 50%; transform: translateX(-50%); width: max-content; max-width: calc(100% - 28px); display: flex; align-items: center; gap: 12px; padding: 12px 18px; background: white; border: 2px solid #b45309; border-radius: 6px; font-weight: 800; }.formula strong { color: var(--color-primary); font-size: 24px; }.gap-feedback { position: absolute; z-index: 2; top: 72px; left: 50%; transform: translateX(-50%); width: max-content; max-width: calc(100% - 28px); padding: 7px 10px; border: 1px solid #fed7aa; border-radius: 6px; background: #fff7ed; color: #9a3412; font-weight: 900; }.chip-pool { position: relative; z-index: 1; min-height: 250px; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 8px; }.chip-pool i, .person-groups i { width: 30px; height: 30px; border-radius: 50%; background: #f59e0b; border: 3px solid white; box-shadow: 0 2px 4px #17203344; }.person-groups { position: relative; z-index: 1; min-height: 250px; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; align-items: center; }.person-groups > div { min-height: 130px; padding: 12px; display: grid; align-content: center; gap: 10px; text-align: center; background: #ffffffed; border: 2px solid #e6a23c; border-radius: 6px; }.person-groups > div > div { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; }.person-groups i { width: 22px; height: 22px; }.profit-feedback { margin: 0 auto 10px; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border: 1px solid #fed7aa; border-radius: 7px; background: #ffffffd9; color: #9a3412; font-weight: 900; text-align: center; }.controls { display: grid; grid-template-columns: 1.2fr 1fr 1fr; border-top: 1px solid var(--color-line); }.controls button { border: 0; border-left: 1px solid var(--color-line); background: white; font-weight: 800; }.controls button:last-child { color: white; background: var(--color-primary); }.gap-slider { min-width: 0; display: grid; gap: 4px; padding: 8px 12px; background: white; font-size: 12px; font-weight: 800; }
@media (max-width: 600px) { .formula { gap: 6px; font-size: 13px; }.formula strong { font-size: 18px; }.scene { min-height: 410px; padding-inline: 12px; }.controls { grid-template-columns: 1fr 1fr; }.gap-slider { grid-column: 1 / -1; } }
</style>
