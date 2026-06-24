<script setup lang="ts">
import { computed } from "vue";
import KnownUnknownStrip from "./KnownUnknownStrip.vue";

interface ArchetypeHeader { id: string; title: string; layer: string; difficulty: string; model: string }
interface VariantHeader { id: string; title: string; parameters: Record<string, number | string>; promptTemplate: string }
const props = defineProps<{ archetype: ArchetypeHeader; variant: VariantHeader }>();
const prompt = computed(() => props.variant.promptTemplate.replace(/\{([^}]+)\}/g, (_, key: string) => String(props.variant.parameters[key] ?? `{${key}}`)));
</script>

<template>
  <header class="problem-header">
    <div class="problem-meta">
      <span>{{ archetype.id }}</span><span>{{ archetype.layer }}</span><span>{{ archetype.difficulty }}</span>
    </div>
    <h1>{{ archetype.title }}</h1>
    <p class="prompt">{{ prompt }}</p>
    <KnownUnknownStrip :parameters="variant.parameters" :unknown="variant.title" />
  </header>
</template>

<style scoped>
.problem-header { display: grid; gap: 12px; padding: 22px 24px 18px; background: white; border-bottom: 1px solid var(--color-line); }
.problem-meta { display: flex; gap: 8px; flex-wrap: wrap; }.problem-meta span { padding: 3px 8px; font-size: 12px; font-weight: 800; color: var(--color-primary); background: var(--color-primary-soft); border-radius: 999px; }
h1 { margin: 0; font-size: clamp(24px, 3vw, 36px); line-height: 1.15; letter-spacing: 0; }.prompt { margin: 0; font-size: 17px; line-height: 1.7; }
@media (max-width: 600px) { .problem-header { padding: 16px; } }
</style>
