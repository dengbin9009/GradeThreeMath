<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ label: string; modelValue: number; min?: number; max?: number; step?: number }>(), { min: 0, max: 9999, step: 1 });
const emit = defineEmits<{ "update:modelValue": [value: number] }>();
const normalized = computed(() => Math.min(props.max, Math.max(props.min, Math.round(props.modelValue))));
const change = (direction: -1 | 1) => emit("update:modelValue", Math.min(props.max, Math.max(props.min, Math.round(normalized.value + direction * props.step))));
</script>

<template>
  <div class="integer-stepper">
    <span>{{ label }}</span>
    <button type="button" :aria-label="`${label}减少`" @click="change(-1)">−</button>
    <output>{{ normalized }}</output>
    <button type="button" :aria-label="`${label}增加`" @click="change(1)">＋</button>
  </div>
</template>

<style scoped>
.integer-stepper { display: grid; grid-template-columns: minmax(72px, 1fr) 40px 48px 40px; gap: 4px; align-items: center; }.integer-stepper button { min-width: 40px; border: 1px solid var(--color-line); border-radius: 5px; background: white; }.integer-stepper output { text-align: center; font-weight: 900; color: var(--color-primary); }
</style>
