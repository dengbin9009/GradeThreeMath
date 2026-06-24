import { z } from "zod";
import type { Grade3MathBlueprint } from "./blueprint.types";

const id = (prefix: "K" | "M") => z.string().regex(new RegExp(`^${prefix}\\d{2}$`));

const knowledgeNodeSchema = z.object({
  id: id("K"),
  name: z.string().min(1),
  term: z.string().min(1),
  source: z.enum(["课内必会", "课标校准", "提升拓展"]),
  prerequisites: z.array(z.string()),
  masteryGoals: z.array(z.string().min(1)).min(1),
  mistakes: z.array(z.string().min(1)).min(1)
});

const variantSchema = z.object({
  id: z.string().regex(/^M\d{2}-V\d+$/),
  title: z.string().min(1),
  parameters: z.record(
    z.string(),
    z.union([
      z.number().refine(Number.isInteger, { message: "Numeric parameter must be an integer" }),
      z.string()
    ])
  ),
  promptTemplate: z.string().min(1),
  solutionSteps: z.array(z.string().min(1)).min(2),
  answerRule: z.string().min(1)
});

const animationSpecSchema = z.object({
  scene: z.string().min(1),
  manipulatives: z.array(z.string().min(1)).min(1),
  controls: z.array(z.string().min(1)).min(1),
  computedValues: z.array(z.string().min(1)).min(1),
  revealSteps: z.array(z.string().min(1)).min(2),
  childFeedback: z.string().min(1)
});

const archetypeSchema = z.object({
  id: id("M"),
  title: z.string().min(1),
  layer: z.enum(["课内", "拔高"]),
  knowledgeIds: z.array(id("K")).min(1),
  model: z.string().min(1),
  variants: z.array(variantSchema).min(3),
  animationSpec: animationSpecSchema,
  parentCoach: z.object({
    talkTrack: z.string().min(1),
    commonMistake: z.string().min(1),
    extensionPrompt: z.string().min(1)
  }),
  difficulty: z.enum(["基础", "提高", "拔高"])
});

const blueprintSchema = z.object({
  schemaVersion: z.string().min(1),
  metadata: z.object({
    title: z.string().min(1),
    audience: z.array(z.string()),
    scope: z.array(z.string()),
    navigationModel: z.array(z.string()),
    sources: z.array(z.object({ title: z.string(), url: z.string(), use: z.string() })),
    assumptions: z.array(z.string())
  }),
  knowledgeNodes: z.array(knowledgeNodeSchema).min(1),
  archetypes: z.array(archetypeSchema).min(1),
  knowledgeToArchetypes: z.record(z.string(), z.array(id("M")))
});

export function validateBlueprint(input: unknown): Grade3MathBlueprint {
  const parsed = blueprintSchema.parse(input);
  const knowledgeIds = new Set(parsed.knowledgeNodes.map((item) => item.id));
  const archetypeIds = new Set(parsed.archetypes.map((item) => item.id));

  for (const archetype of parsed.archetypes) {
    for (const knowledgeId of archetype.knowledgeIds) {
      if (!knowledgeIds.has(knowledgeId)) throw new Error(`Unknown knowledge reference: ${knowledgeId}`);
    }
    for (const variant of archetype.variants) {
      if (!variant.id.startsWith(`${archetype.id}-`)) {
        throw new Error(`Variant ${variant.id} does not belong to ${archetype.id}`);
      }
    }
  }

  for (const [knowledgeId, linkedArchetypes] of Object.entries(parsed.knowledgeToArchetypes)) {
    if (!knowledgeIds.has(knowledgeId)) throw new Error(`Unknown knowledge index key: ${knowledgeId}`);
    for (const archetypeId of linkedArchetypes) {
      if (!archetypeIds.has(archetypeId)) throw new Error(`Unknown archetype reference: ${archetypeId}`);
    }
  }

  return parsed as Grade3MathBlueprint;
}
