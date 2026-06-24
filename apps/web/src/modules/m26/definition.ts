import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M26", { draggable: true }),
  component: () => import("../time-fractions/TimeFractionsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["统一整体", "叠放阴影", "比较大小", "解释原因"]
} satisfies ModuleDefinition;
