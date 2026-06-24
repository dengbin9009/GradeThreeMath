<script setup lang="ts">
const props = withDefaults(defineProps<{
  moduleId: string;
  aspectRatio?: string;
  minHeights?: { desktop: number; tablet: number; mobile: number };
  reducedMotion?: boolean;
}>(), {
  aspectRatio: "16 / 9",
  minHeights: () => ({ desktop: 480, tablet: 420, mobile: 320 }),
  reducedMotion: false
});
</script>

<template>
  <section
    class="scene-stage"
    data-upgrade-stage="scene"
    :data-module-id="moduleId"
    :data-reduced-motion-state="props.reducedMotion ? 'reduced' : 'motion'"
    :style="{
      '--scene-aspect-ratio': props.aspectRatio,
      '--scene-min-desktop': `${props.minHeights.desktop}px`,
      '--scene-min-tablet': `${props.minHeights.tablet}px`,
      '--scene-min-mobile': `${props.minHeights.mobile}px`,
      aspectRatio: props.aspectRatio
    }"
  >
    <slot />
  </section>
</template>

<style scoped>
.scene-stage {
  position: relative;
  display: grid;
  overflow: hidden;
  min-height: var(--scene-min-desktop);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-surface);
  isolation: isolate;
}

@media (max-width: 1199px) {
  .scene-stage {
    min-height: var(--scene-min-tablet);
  }
}

@media (max-width: 767px) {
  .scene-stage {
    min-height: var(--scene-min-mobile);
  }
}
</style>
