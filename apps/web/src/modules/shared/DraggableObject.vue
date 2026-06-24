<script setup lang="ts">
const props = defineProps<{ x: number; y: number; label: string }>();
const emit = defineEmits<{ move: [value: { x: number; y: number }] }>();

function move(event: PointerEvent) {
  if (event.buttons === 0) return;
  emit("move", { x: Math.round(event.clientX), y: Math.round(event.clientY) });
}
</script>

<template>
  <div
    class="draggable-object"
    data-draggable-object
    role="button"
    tabindex="0"
    :aria-label="label"
    :style="{ transform: `translate(${Math.round(props.x)}px, ${Math.round(props.y)}px)` }"
    @pointermove="move"
  >
    <slot />
  </div>
</template>

<style scoped>
.draggable-object {
  position: absolute;
  inset: 0 auto auto 0;
  width: max-content;
  touch-action: none;
  cursor: grab;
  user-select: none;
}

.draggable-object:active {
  cursor: grabbing;
}
</style>
