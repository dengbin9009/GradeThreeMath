import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M23", { draggable: true }),
  component: () => import("../time-fractions/TimeFractionsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["放起点", "放终点", "拉开时间条", "合成经过时间"]
} satisfies ModuleDefinition;
