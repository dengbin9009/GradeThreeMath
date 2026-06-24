import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M25", { draggable: true }),
  component: () => import("../time-fractions/TimeFractionsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["等分整体", "取一份", "涂几份", "写出分数"]
} satisfies ModuleDefinition;
