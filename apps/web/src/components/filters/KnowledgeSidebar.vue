<script setup lang="ts">
import { ImageIcon, X } from "@lucide/vue";
import { useFilterStore } from "../../app/stores/filter.store";
import { useBlueprintStore } from "../../app/stores/blueprint.store";
defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();
const filters = useFilterStore();
const blueprint = useBlueprintStore();
const toggle = (list: string[], value: string) => list.includes(value) ? list.splice(list.indexOf(value), 1) : list.push(value);
</script>

<template>
  <aside :class="['sidebar', { open }]" aria-label="母题筛选">
    <header><strong>筛选母题</strong><button type="button" aria-label="关闭筛选" @click="$emit('close')"><X :size="20" /></button></header>
    <section><h2>层级</h2><label v-for="item in ['课内','拔高']" :key="item"><input type="checkbox" :value="item" :checked="filters.layers.includes(item)" @change="toggle(filters.layers, item)" />{{ item }}</label></section>
    <section><h2>难度</h2><label v-for="item in ['基础','提高','拔高']" :key="item"><input type="checkbox" :value="item" :checked="filters.difficulties.includes(item)" @change="toggle(filters.difficulties, item)" />{{ item }}</label></section>
    <section><h2>动画</h2><label><input v-model="filters.imageOnly" data-image-only type="checkbox" /><ImageIcon :size="16" />图片动画</label></section>
    <section class="knowledge"><h2>知识点</h2><label v-for="node in blueprint.knowledgeNodes" :key="node.id"><input type="checkbox" :value="node.id" :checked="filters.terms.includes(node.id)" @change="toggle(filters.terms, node.id)" />{{ node.id }} {{ node.name }}</label></section>
    <button class="clear" data-action="clear-sidebar" type="button" @click="filters.clear()">清除全部</button>
  </aside>
</template>

<style scoped>
.sidebar { width: var(--sidebar-width); min-height: calc(100vh - var(--topbar-height)); padding: 16px; overflow-y: auto; border-right: 1px solid var(--color-line); background: #fbfcfe; }.sidebar header { display: flex; justify-content: space-between; align-items: center; }.sidebar header button { display: none; border: 0; background: transparent; }.sidebar section { padding: 14px 0; border-bottom: 1px solid var(--color-line); }.sidebar h2 { margin: 0 0 10px; color: var(--color-muted); font-size: 12px; text-transform: uppercase; }.sidebar label { min-height: 36px; display: flex; align-items: center; gap: 8px; }.sidebar input { width: 18px; height: 18px; }.knowledge { display: grid; gap: 3px; }.knowledge label { color: var(--color-muted); font-size: 13px; }.clear { width: 100%; margin-top: 16px; border: 1px solid var(--color-line); border-radius: 6px; background: white; }
@media (max-width: 900px) { .sidebar { position: fixed; z-index: 30; inset: var(--topbar-height) auto 0 0; transform: translateX(-100%); box-shadow: 12px 0 30px #17203322; }.sidebar.open { transform: translateX(0); }.sidebar header button { display: grid; place-items: center; } }
</style>
