<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import { BookOpenText, ChevronLeft } from "@lucide/vue";
import { useRoute, useRouter } from "vue-router";
import { useBlueprintStore } from "../app/stores/blueprint.store";
import { useLearningStore } from "../app/stores/learning.store";
import AnimationStageShell from "../components/learning/AnimationStageShell.vue";
import CoachDrawer from "../components/learning/CoachDrawer.vue";
import ProblemHeader from "../components/learning/ProblemHeader.vue";
import VariantList from "../components/learning/VariantList.vue";
import { moduleRegistry, type ModuleId } from "../modules/registry";
import { getBaselineCoachNote } from "../modules/shared/upgrade/baselineCoachNotes";

const route = useRoute();
const router = useRouter();
const blueprint = useBlueprintStore();
const learning = useLearningStore();
const moduleId = computed(() => String(route.params.archetypeId) as ModuleId);
const archetype = computed(() => blueprint.archetypes.find((item) => item.id === moduleId.value));
const variant = computed(() => archetype.value?.variants.find((item) => item.id === route.params.variantId) ?? archetype.value?.variants[0]);
const definition = computed(() => moduleRegistry[moduleId.value]);
const ModuleComponent = computed(() => definition.value ? defineAsyncComponent(definition.value.component) : null);
const baselineModuleIds = ["M09", "M12", "M20", "M21", "M39"];
const stageWrappedModuleIds = [...baselineModuleIds, "M01", "M02", "M03", "M31"];
const stageWrapped = computed(() => stageWrappedModuleIds.includes(moduleId.value));
const baselineCoachNote = computed(() => baselineModuleIds.includes(moduleId.value) ? getBaselineCoachNote(moduleId.value) : null);
const resetRevision = ref(0);

function selectVariant(variantId: string) { router.replace({ name: "lesson", params: { archetypeId: moduleId.value, variantId } }); }
function resetSpecial() { resetRevision.value += 1; }

watch([archetype, variant], ([currentArchetype, currentVariant]) => {
  if (currentArchetype && currentVariant && route.params.variantId !== currentVariant.id) selectVariant(currentVariant.id);
}, { immediate: true });
onMounted(() => blueprint.load());
</script>

<template>
  <section v-if="archetype && variant" class="lesson-view">
    <div class="lesson-nav"><RouterLink to="/learn"><ChevronLeft :size="18" />返回母题库</RouterLink><button type="button" aria-label="打开家长辅导" @click="learning.openCoach()"><BookOpenText :size="18" />家长辅导</button></div>
    <ProblemHeader :archetype="archetype" :variant="variant" />
    <div class="lesson-workbench">
      <VariantList :variants="archetype.variants" :active-id="variant.id" @select="selectVariant" />
      <component
        :is="ModuleComponent"
        v-if="ModuleComponent && !stageWrapped"
        :module-id="moduleId"
        :archetype="archetype"
        :variant="variant"
        :parameters="variant.parameters"
      />
      <AnimationStageShell v-else-if="ModuleComponent" :feedback="archetype.animationSpec.childFeedback" @reset="resetSpecial">
        <div :data-special-module="moduleId" class="special-stage"><component :is="ModuleComponent" :key="`${moduleId}-${variant.id}-${resetRevision}`" :parameters="variant.parameters" /></div>
      </AnimationStageShell>
    </div>
    <CoachDrawer
      :open="learning.coachOpen"
      :archetype="archetype"
      :variant="variant"
      :animation-coach-note="baselineCoachNote"
      @close="learning.closeCoach()"
    />
  </section>
  <div v-else-if="blueprint.loading" class="lesson-state">正在打开母题…</div>
  <div v-else class="lesson-state" role="alert"><strong>没有找到这个母题</strong><RouterLink to="/learn">返回母题库</RouterLink></div>
</template>

<style scoped>
.lesson-view { min-height: 100%; background: var(--color-canvas); }.lesson-nav { min-height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: white; border-bottom: 1px solid var(--color-line); }.lesson-nav a, .lesson-nav button { display: flex; align-items: center; gap: 6px; color: var(--color-muted); text-decoration: none; }.lesson-nav button { padding-inline: 10px; border: 1px solid var(--color-line); border-radius: 6px; background: white; font-weight: 800; }
.lesson-workbench { max-width: 1500px; margin: 0 auto; padding: 8px 24px 40px; }.special-stage { min-height: 100%; height: 100%; }
.lesson-state { min-height: calc(100vh - var(--topbar-height)); display: grid; place-items: center; align-content: center; gap: 14px; }
@media (max-width: 600px) { .lesson-nav { padding: 0 12px; }.lesson-workbench { padding: 4px 0 24px; }.lesson-workbench :deep(.variant-list) { margin-inline: 12px; } }
</style>
