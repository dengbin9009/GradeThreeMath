import { validateBlueprint } from "./blueprint.schema";
import type { Archetype, ArchetypeId, Grade3MathBlueprint, KnowledgeId, KnowledgeNode } from "./blueprint.types";

export interface BlueprintRepository {
  readonly blueprint: Grade3MathBlueprint;
  getKnowledge(id: string): KnowledgeNode;
  getArchetype(id: string): Archetype;
  getArchetypesForKnowledge(id: string): Archetype[];
  search(query: string): Archetype[];
}

export function createBlueprintRepository(input: unknown): BlueprintRepository {
  const blueprint = validateBlueprint(input);
  const knowledge = new Map(blueprint.knowledgeNodes.map((item) => [item.id, item]));
  const archetypes = new Map(blueprint.archetypes.map((item) => [item.id, item]));

  return {
    blueprint,
    getKnowledge(rawId) {
      const item = knowledge.get(rawId as KnowledgeId);
      if (!item) throw new Error(`Unknown knowledge id: ${rawId}`);
      return item;
    },
    getArchetype(rawId) {
      const item = archetypes.get(rawId as ArchetypeId);
      if (!item) throw new Error(`Unknown archetype id: ${rawId}`);
      return item;
    },
    getArchetypesForKnowledge(rawId) {
      if (!knowledge.has(rawId as KnowledgeId)) throw new Error(`Unknown knowledge id: ${rawId}`);
      return (blueprint.knowledgeToArchetypes[rawId as KnowledgeId] ?? []).map((item) => {
        const archetype = archetypes.get(item);
        if (!archetype) throw new Error(`Unknown archetype id: ${item}`);
        return archetype;
      });
    },
    search(query) {
      const normalized = query.trim().toLocaleLowerCase("zh-CN");
      if (!normalized) return blueprint.archetypes;
      return blueprint.archetypes.filter((item) => {
        const knowledgeNames = item.knowledgeIds.map((knowledgeId) => knowledge.get(knowledgeId)?.name ?? "");
        const haystack = [
          item.id,
          item.title,
          item.model,
          ...knowledgeNames,
          ...item.animationSpec.manipulatives,
          ...item.animationSpec.controls,
          ...item.animationSpec.revealSteps
        ].join(" ").toLocaleLowerCase("zh-CN");
        return haystack.includes(normalized);
      });
    }
  };
}
