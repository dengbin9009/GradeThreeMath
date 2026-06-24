<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";

const props = defineProps<{ parameters: Record<string, number | string> }>();
type Step = "highlight" | "subtree" | "send-root";
const step = ref<Step>("highlight");
const n = (key: string, fallback: number) => Math.max(1, Math.round(Number(props.parameters[key]) || fallback));
const a = computed(() => n("a", n("total", 56)));
const b = computed(() => n("b", n("used", 18)));
const c = computed(() => n("c", n("days", 3)));
const subtree = computed(() => a.value - b.value);
const root = computed(() => Math.floor(subtree.value / c.value));
const bracketExpression = computed(() => `${a.value} - ${b.value}`);
</script>

<template>
  <SceneStage module-id="M02" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 480, mobile: 520 }">
    <div class="tree-stage">
      <div class="tree">
        <div class="root" data-root-result>{{ step === 'send-root' ? root : '?' }}</div>
        <div class="branch-line" />
        <div data-bracket-subtree class="subtree" :class="{ active: step !== 'send-root' }">{{ bracketExpression }}</div>
        <div class="divider">÷ {{ c }}</div>
        <div data-subtree-result class="subtree-result">{{ a }} - {{ b }} = {{ subtree }}</div>
      </div>
      <div data-playful-feedback class="feedback">{{ step === 'send-root' ? '括号盒子先加工，再把结果送回树根。' : '括号聚光灯亮着，其他节点先暂停一下。' }}</div>
      <div class="controls">
        <button data-step="highlight" :class="{ active: step === 'highlight' }" @click="step = 'highlight'">高亮括号</button>
        <button data-step="subtree" :class="{ active: step === 'subtree' }" @click="step = 'subtree'">计算子树</button>
        <button data-step="send-root" :class="{ active: step === 'send-root' }" @click="step = 'send-root'">送回主算式</button>
      </div>
    </div>
  </SceneStage>
</template>

<style scoped>
.tree-stage { min-height: 100%; display: grid; grid-template-rows: 1fr auto auto; background: #f3f7ee; }
.tree { min-height: 380px; position: relative; display: grid; place-items: center; align-content: center; gap: 24px; padding: 28px; }
.root, .subtree, .divider, .subtree-result { position: relative; z-index: 1; border-radius: 8px; background: white; font-weight: 900; box-shadow: 0 8px 22px #17203318; }
.root { width: 110px; height: 76px; display: grid; place-items: center; color: var(--color-primary); font-size: 34px; border: 3px solid #2563eb; }
.branch-line { width: min(520px, 78%); height: 120px; border: 6px solid #94a3b8; border-top: 0; border-radius: 0 0 60px 60px; margin-top: -20px; }
.subtree { display: inline-flex; align-items: center; gap: 18px; padding: 18px 28px; border: 3px solid #cbd5e1; font-size: 28px; }
.subtree.active { border-color: #f59e0b; background: #fff7ed; }
.divider { padding: 10px 18px; color: #0f766e; }
.subtree-result { padding: 10px 14px; color: #475569; }
.feedback { margin: 0 auto 10px; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border: 1px solid #fed7aa; border-radius: 7px; background: white; color: #9a3412; font-weight: 900; text-align: center; }
.controls { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--color-line); }
.controls button { border: 0; border-right: 1px solid var(--color-line); background: white; font-weight: 900; }
.controls .active { color: white; background: var(--color-primary); }
@media (max-width: 620px) { .tree { min-height: 410px; }.subtree { font-size: 22px; }.controls { grid-template-columns: 1fr; } }
</style>
