<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";

const props = defineProps<{ parameters: Record<string, number | string> }>();
const carried = ref(false);
const n = computed(() => Math.max(1, Math.round(Number(props.parameters.n ?? props.parameters.price ?? 236))));
const m = computed(() => Math.max(1, Math.round(Number(props.parameters.m ?? props.parameters.count ?? 3))));
const hundreds = computed(() => Math.floor(n.value / 100) * 100);
const tens = computed(() => Math.floor((n.value % 100) / 10) * 10);
const ones = computed(() => n.value % 10);
const partials = computed(() => [hundreds.value, tens.value, ones.value].filter((part) => part > 0).map((part) => ({ part, product: part * m.value })));
const total = computed(() => n.value * m.value);
</script>

<template>
  <SceneStage module-id="M03" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 480, mobile: 540 }">
    <div class="blocks-stage">
      <div class="workbench">
        <div class="number-card">{{ n }} × {{ m }}</div>
        <div class="place-columns">
          <div v-for="item in partials" :key="item.part" class="place-column">
            <span>{{ item.part }}</span>
            <i v-for="block in Math.min(8, Math.ceil(item.part / 10))" :key="block" />
            <strong>{{ item.part }}×{{ m }}={{ item.product }}</strong>
          </div>
        </div>
        <div data-place-partials class="partials">
          <span v-for="item in partials" :key="`p-${item.part}`">{{ item.part }}×{{ m }}={{ item.product }}</span>
        </div>
        <div data-total-product class="total">{{ total }}</div>
      </div>
      <div data-playful-feedback class="feedback">{{ carried ? '进位小车把散块打包，答案稳稳到站。' : '每一位都要乘，十位出来的是几十。' }}</div>
      <div class="controls"><button data-action="carry" @click="carried = true">开进位小车</button><button @click="carried = false">看位值拆分</button></div>
    </div>
  </SceneStage>
</template>

<style scoped>
.blocks-stage { min-height: 100%; display: grid; grid-template-rows: 1fr auto auto; background: #f1f5f9; }
.workbench { min-height: 380px; position: relative; display: grid; align-content: center; gap: 20px; padding: 30px; }
.number-card, .total { width: max-content; margin: 0 auto; padding: 10px 18px; border-radius: 8px; background: white; color: var(--color-primary); font-size: 28px; font-weight: 900; box-shadow: 0 8px 22px #17203318; }
.place-columns { display: grid; grid-template-columns: repeat(3, minmax(120px, 1fr)); gap: 14px; }
.place-column { min-height: 170px; padding: 14px; display: grid; align-content: end; justify-items: center; gap: 6px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #ffffffdd; }
.place-column i { width: 46px; height: 20px; border-radius: 5px; background: #f59e0b; box-shadow: 0 3px 0 #b45309; }
.partials { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; }
.partials span { padding: 7px 10px; border-radius: 6px; background: #e0f2fe; color: #075985; font-weight: 900; }
.feedback { margin: 0 auto 10px; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border: 1px solid #bfdbfe; border-radius: 7px; background: white; color: #1d4ed8; font-weight: 900; text-align: center; }
.controls { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--color-line); }
.controls { position: relative; z-index: 2; }
.controls button { border: 0; background: white; font-weight: 900; }
.controls button:first-child { color: white; background: var(--color-primary); }
@media (max-width: 640px) { .place-columns { grid-template-columns: 1fr; }.workbench { min-height: auto; padding: 16px; }.place-column { min-height: 104px; }.place-column i { display: none; } }
</style>
