export type KnowledgeId = `K${number}`;
export type ArchetypeId = `M${number}`;
export type VariantId = `${ArchetypeId}-V${number}`;

export type KnowledgeSource = "课内必会" | "课标校准" | "提升拓展";
export type ArchetypeLayer = "课内" | "拔高";
export type Difficulty = "基础" | "提高" | "拔高";

export interface KnowledgeNode {
  id: KnowledgeId;
  name: string;
  term: string;
  source: KnowledgeSource;
  prerequisites: string[];
  masteryGoals: string[];
  mistakes: string[];
}

export interface Variant {
  id: VariantId;
  title: string;
  parameters: Record<string, number | string>;
  promptTemplate: string;
  solutionSteps: string[];
  answerRule: string;
}

export interface AnimationSpec {
  scene: string;
  manipulatives: string[];
  controls: string[];
  computedValues: string[];
  revealSteps: string[];
  childFeedback: string;
}

export interface ParentCoach {
  talkTrack: string;
  commonMistake: string;
  extensionPrompt: string;
}

export interface Archetype {
  id: ArchetypeId;
  title: string;
  layer: ArchetypeLayer;
  knowledgeIds: KnowledgeId[];
  model: string;
  variants: Variant[];
  animationSpec: AnimationSpec;
  parentCoach: ParentCoach;
  difficulty: Difficulty;
}

export interface BlueprintMetadata {
  title: string;
  audience: string[];
  scope: string[];
  navigationModel: string[];
  sources: Array<{ title: string; url: string; use: string }>;
  assumptions: string[];
}

export interface Grade3MathBlueprint {
  schemaVersion: string;
  metadata: BlueprintMetadata;
  knowledgeNodes: KnowledgeNode[];
  archetypes: Archetype[];
  knowledgeToArchetypes: Record<KnowledgeId, ArchetypeId[]>;
}
