<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { ImageIcon, ChevronRight, SearchX } from "@lucide/vue";
import { useRoute, useRouter } from "vue-router";
import { useBlueprintStore } from "../app/stores/blueprint.store";
import { serializeFilterQuery, useFilterStore } from "../app/stores/filter.store";
import { moduleRegistry, type ModuleId } from "../modules/registry";
import ActiveFilterTags from "../components/filters/ActiveFilterTags.vue";

const route = useRoute();
const router = useRouter();
const blueprint = useBlueprintStore();
const filters = useFilterStore();

watch(() => route.query, (query) => filters.replaceFromQuery(query), { immediate: true, deep: true });
watch(
  () => [filters.search, filters.layers.join(","), filters.terms.join(","), filters.difficulties.join(","), filters.imageOnly] as const,
  () => {
    const next = serializeFilterQuery(filters.$state);
    if (JSON.stringify(next) !== JSON.stringify(route.query)) router.replace({ query: next });
  }
);

const knowledgeById = computed(() => Object.fromEntries(blueprint.knowledgeNodes.map((node) => [node.id, node.name])));
const results = computed(() => {
  const needle = filters.search.trim().toLocaleLowerCase("zh-CN");
  return blueprint.archetypes.filter((archetype) => {
    const definition = moduleRegistry[archetype.id as ModuleId];
    const searchable = [archetype.id, archetype.title, archetype.model, ...archetype.knowledgeIds.map((id) => knowledgeById.value[id] ?? id)].join(" ").toLocaleLowerCase("zh-CN");
    return (!needle || searchable.includes(needle))
      && (!filters.layers.length || filters.layers.includes(archetype.layer))
      && (!filters.difficulties.length || filters.difficulties.includes(archetype.difficulty))
      && (!filters.terms.length || archetype.knowledgeIds.some((id) => filters.terms.includes(id)))
      && (!filters.imageOnly || definition?.capabilities.imageAnimation);
  });
});

onMounted(() => blueprint.load());
</script>

<template>
  <section class="library-view">
    <header class="library-heading"><div><span>39 个核心模型</span><h1>三年级数学母题库</h1><p>从题目关系进入大画幅动画，再用变式练会同一种思考方法。</p></div><strong>{{ results.length }} <small>个结果</small></strong></header>
    <ActiveFilterTags />
    <div v-if="blueprint.loading" class="state">正在整理母题…</div>
    <div v-else-if="blueprint.error" class="state error" role="alert">{{ blueprint.error }}<button type="button" @click="blueprint.load()">重新加载</button></div>
    <div v-else-if="!results.length" class="state"><SearchX :size="30" /><strong>没有匹配的母题</strong><button type="button" @click="filters.clear()">清除筛选</button></div>
    <div v-else class="module-table">
      <RouterLink v-for="archetype in results" :key="archetype.id" :data-module-id="archetype.id" :to="`/learn/${archetype.id}/${archetype.variants[0]?.id}`" class="module-row">
        <span class="module-id">{{ archetype.id }}</span>
        <div class="module-copy"><div><h2>{{ archetype.title }}</h2><span v-if="moduleRegistry[archetype.id as ModuleId]?.capabilities.imageAnimation" data-image-animation><ImageIcon :size="14" />图片动画</span></div><p>{{ archetype.model }}</p></div>
        <div class="module-tags"><span>{{ archetype.layer }}</span><span>{{ archetype.difficulty }}</span><span>{{ archetype.variants.length }} 个变式</span></div>
        <ChevronRight class="arrow" :size="22" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.library-view { min-height: 100%; padding: 24px clamp(16px, 3vw, 42px) 60px; }
.library-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; padding: 8px 0 22px; }
.library-heading span { color: var(--color-primary); font-size: 13px; font-weight: 900; } h1 { margin: 5px 0 7px; font-size: clamp(28px, 4vw, 42px); letter-spacing: 0; } .library-heading p { margin: 0; color: var(--color-muted); }
.library-heading > strong { color: var(--color-primary); font-size: 36px; white-space: nowrap; }.library-heading small { color: var(--color-muted); font-size: 13px; }
.module-table { border-block: 1px solid var(--color-line); background: white; }
.module-row { min-height: 104px; display: grid; grid-template-columns: 58px minmax(0, 1fr) auto 32px; align-items: center; gap: 16px; padding: 14px 12px; color: inherit; text-decoration: none; border-bottom: 1px solid var(--color-line); }
.module-row:last-child { border-bottom: 0; }.module-row:hover { background: #f7fbfa; }.module-id { width: 48px; height: 48px; display: grid; place-items: center; color: white; background: var(--color-primary); border-radius: 6px; font-weight: 900; }
.module-copy { min-width: 0; }.module-copy > div { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }.module-copy h2 { margin: 0; font-size: 18px; }.module-copy p { margin: 7px 0 0; color: var(--color-muted); line-height: 1.55; }
[data-image-animation] { display: inline-flex; align-items: center; gap: 4px; padding: 3px 7px; color: #8a4b00; background: #fff1d6; border-radius: 999px; font-size: 12px; font-weight: 900; }.module-tags { display: flex; gap: 6px; }.module-tags span { padding: 4px 7px; color: var(--color-muted); background: #f1f4f8; border-radius: 4px; font-size: 12px; }.arrow { color: var(--color-muted); }
.state { min-height: 260px; display: grid; place-items: center; align-content: center; gap: 12px; color: var(--color-muted); background: white; border: 1px solid var(--color-line); }.state button { padding: 0 14px; border: 1px solid var(--color-line); border-radius: 6px; background: white; }
@media (max-width: 720px) { .library-heading > strong { display: none; }.module-row { grid-template-columns: 48px minmax(0, 1fr) 24px; gap: 10px; }.module-tags { grid-column: 2 / -1; }.arrow { grid-column: 3; grid-row: 1; }.module-copy p { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } }
</style>
