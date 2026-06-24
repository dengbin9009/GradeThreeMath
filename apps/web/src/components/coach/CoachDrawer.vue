<script setup lang="ts">
import type { Archetype, Variant } from "@math/shared";
import type { BaselineCoachNote } from "../../modules/shared/upgrade/baselineCoachNotes";
import LearningCoachDrawer from "../learning/CoachDrawer.vue";

withDefaults(defineProps<{
  open: boolean;
  archetype: Archetype;
  variant: Variant;
  animationCoachNote?: BaselineCoachNote | null;
}>(), { animationCoachNote: null });

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <LearningCoachDrawer
    :open="open"
    :archetype="archetype"
    :variant="variant"
    :animation-coach-note="animationCoachNote"
    @close="emit('close')"
  />
</template>
