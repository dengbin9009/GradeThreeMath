import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M27", { draggable: true }),
  component: () => import("../time-fractions/TimeFractionsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["平均分总数", "求一份", "取需要份数", "回到结果"]
} satisfies ModuleDefinition;
