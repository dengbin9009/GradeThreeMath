<script setup lang="ts">
import { RotateCcw } from "@lucide/vue";
defineEmits<{ reset: [] }>();
</script>

<template><button type="button" aria-label="复位动画" title="复位动画" @click="$emit('reset')"><RotateCcw :size="18" /></button></template>

<style scoped>
button { min-width: 40px; min-height: 40px; display: grid; place-items: center; border: 0; border-radius: 6px; background: transparent; }
</style>
