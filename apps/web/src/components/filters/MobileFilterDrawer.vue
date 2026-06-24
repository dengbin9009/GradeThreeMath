<script setup lang="ts">
import { X } from "@lucide/vue";
import { nextTick, ref, watch } from "vue";
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();
const closeButton = ref<HTMLButtonElement | null>(null);
let opener: HTMLElement | null = null;
watch(() => props.open, async (open) => { if (open) { opener = document.activeElement as HTMLElement; await nextTick(); closeButton.value?.focus(); } else { opener?.focus(); opener = null; } });
</script>
<template><div v-if="open" class="layer" @click.self="emit('close')"><section role="dialog" aria-modal="true" aria-label="筛选母题"><header><strong>筛选母题</strong><button ref="closeButton" type="button" aria-label="关闭筛选" @click="emit('close')"><X :size="20" /></button></header><slot /></section></div></template>
<style scoped>.layer{position:fixed;z-index:45;inset:0;display:flex;align-items:flex-end;background:#17203342}.layer section{width:100%;max-height:82vh;overflow:auto;padding:14px;background:white;border-radius:8px 8px 0 0}.layer header{display:flex;align-items:center;justify-content:space-between}.layer button{border:0;background:transparent}</style>
