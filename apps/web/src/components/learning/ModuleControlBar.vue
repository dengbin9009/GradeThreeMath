<script setup lang="ts">
import { RotateCcw, ScanSearch } from "@lucide/vue";
import IntegerStepper from "../../modules/shared/IntegerStepper.vue";

const props = withDefaults(defineProps<{ parameters: Record<string, number | string>; disabled?: boolean }>(), {
  disabled: false
});
const emit = defineEmits<{
  "update:parameters": [value: Record<string, number | string>];
  check: [];
  reset: [];
}>();

function updateParameter(key: string, value: number) {
  emit("update:parameters", { ...props.parameters, [key]: value });
}
</script>

<template>
  <section class="module-control-bar" aria-label="母题参数控制">
    <div class="parameter-grid">
      <IntegerStepper
        v-for="(value, key) in parameters"
        :key="String(key)"
        :label="String(key)"
        :model-value="Number(value)"
        :min="0"
        :max="9999"
        @update:model-value="updateParameter(String(key), $event)"
      />
    </div>
    <div class="control-actions">
      <button data-action="check-answer" type="button" :disabled="disabled" @click="emit('check')">
        <ScanSearch :size="18" />检查
      </button>
      <button data-action="reset-module" type="button" :disabled="disabled" @click="emit('reset')">
        <RotateCcw :size="18" />复位
      </button>
    </div>
  </section>
</template>

<style scoped>
.module-control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: white;
}

.parameter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  flex: 1;
}

.control-actions {
  display: flex;
  gap: 8px;
}

.control-actions button {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: white;
  font-weight: 800;
}

@media (max-width: 720px) {
  .module-control-bar,
  .control-actions {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
