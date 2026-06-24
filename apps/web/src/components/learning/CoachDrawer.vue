<script setup lang="ts">
import { X, MessageCircleQuestion, TriangleAlert, Sparkles, Clapperboard } from "@lucide/vue";
import { nextTick, ref, watch } from "vue";
import type { Archetype, Variant } from "@math/shared";
import type { BaselineCoachNote } from "../../modules/shared/upgrade/baselineCoachNotes";

const props = defineProps<{ open: boolean; archetype: Archetype; variant: Variant; animationCoachNote?: BaselineCoachNote | null }>();
const emit = defineEmits<{ close: [] }>();
const closeButton = ref<HTMLButtonElement | null>(null);
let opener: HTMLElement | null = null;

watch(() => props.open, async (open) => {
  if (open) {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    await nextTick();
    closeButton.value?.focus();
  } else {
    opener?.focus();
    opener = null;
  }
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") emit("close");
}
</script>

<template>
  <div v-if="open" class="coach-layer" @click.self="$emit('close')">
    <aside role="dialog" aria-modal="true" aria-labelledby="coach-title" class="coach-drawer" @keydown="onKeydown">
      <header><div><small>陪练助手</small><h2 id="coach-title">怎么陪孩子想</h2></div><button ref="closeButton" type="button" aria-label="关闭家长辅导" @click="$emit('close')"><X :size="21" /></button></header>
      <section><MessageCircleQuestion :size="20" /><div><h3>先这样问</h3><p>{{ archetype.parentCoach.talkTrack }}</p></div></section>
      <section><TriangleAlert :size="20" /><div><h3>留意这个误区</h3><p>{{ archetype.parentCoach.commonMistake }}</p></div></section>
      <section><Sparkles :size="20" /><div><h3>再往前一步</h3><p>{{ archetype.parentCoach.extensionPrompt }}</p></div></section>
      <section v-if="animationCoachNote" data-animation-coach-note><Clapperboard :size="20" /><div><h3>看动画时抓住这句</h3><p>{{ animationCoachNote.oneSentenceCoach }}</p><p class="coach-cue">{{ animationCoachNote.childPrompt }}</p><p>{{ animationCoachNote.commonMistakeCue }}</p></div></section>
      <section class="solution"><h3>{{ variant.title }}的思考顺序</h3><ol><li v-for="step in variant.solutionSteps" :key="step">{{ step }}</li></ol></section>
    </aside>
  </div>
</template>

<style scoped>
.coach-layer { position: fixed; z-index: 50; inset: 0; display: flex; justify-content: flex-end; background: #17203342; }
.coach-drawer { width: min(420px, 100%); height: 100%; padding: 22px; overflow-y: auto; background: white; box-shadow: -12px 0 32px #17203322; }
header { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--color-line); }
header small { color: var(--color-primary); font-weight: 900; } h2 { margin: 4px 0 0; font-size: 24px; } header button { display: grid; place-items: center; border: 0; background: transparent; }
section { display: grid; grid-template-columns: 26px 1fr; gap: 10px; padding: 18px 0; border-bottom: 1px solid var(--color-line); } section > svg { color: var(--color-primary); margin-top: 2px; }
h3, p { margin: 0; } h3 { font-size: 15px; } p, li { margin-top: 7px; color: var(--color-muted); line-height: 1.7; }
.coach-cue { color: var(--color-primary); font-weight: 900; }
.solution { display: block; } ol { padding-left: 20px; }
@media (max-width: 600px) { .coach-layer { align-items: flex-end; }.coach-drawer { width: 100%; height: min(78vh, 650px); border-radius: 8px 8px 0 0; } }
</style>
