<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";

const props = withDefaults(defineProps<{
  feedbackId: string;
  message: string;
  targetObject: string;
  motion?: "none" | "highlight" | "nudge" | "slide" | "bounce-once";
  durationMs?: number;
  reducedMotion?: boolean;
}>(), {
  motion: "highlight",
  durationMs: 1200,
  reducedMotion: false
});

const emit = defineEmits<{ dismiss: [] }>();

const displayedMotion = computed(() => {
  if (!props.reducedMotion) return props.motion;
  return props.motion === "none" ? "none" : "highlight";
});

let timer: ReturnType<typeof setTimeout> | undefined;

function scheduleDismiss() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => emit("dismiss"), props.durationMs);
}

onMounted(scheduleDismiss);
onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
watch(() => [props.feedbackId, props.durationMs], scheduleDismiss);
</script>

<template>
  <aside
    class="playful-feedback"
    :class="`motion-${displayedMotion}`"
    :data-feedback-id="feedbackId"
    :data-target-object="targetObject"
    :data-feedback-motion="displayedMotion"
    data-blocks-input="false"
    aria-live="polite"
  >
    {{ message }}
  </aside>
</template>

<style scoped>
.playful-feedback {
  display: inline-flex;
  align-items: center;
  max-width: min(320px, 80%);
  padding: 8px 10px;
  border: 1px solid color-mix(in srgb, var(--color-warning) 34%, white);
  border-radius: 8px;
  background: rgb(255 255 255 / 92%);
  color: var(--color-ink);
  box-shadow: 0 8px 22px rgb(15 23 42 / 12%);
  pointer-events: none;
}

.motion-highlight {
  outline: 2px solid color-mix(in srgb, var(--color-warning) 55%, white);
}

.motion-nudge,
.motion-slide,
.motion-bounce-once {
  transform: translateY(-2px);
}
</style>
