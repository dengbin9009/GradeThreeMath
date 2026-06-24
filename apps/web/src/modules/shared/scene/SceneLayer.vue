<script setup lang="ts">
defineProps<{
  layerId: string;
  kind: "background" | "actors" | "overlay" | "feedback";
  zIndex: number;
}>();
</script>

<template>
  <div
    class="scene-layer"
    :data-stage-layer="layerId"
    :data-layer-kind="kind"
    :style="{ zIndex }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scene-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.scene-layer[data-layer-kind="actors"],
.scene-layer[data-layer-kind="feedback"] {
  pointer-events: auto;
}
</style>
