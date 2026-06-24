import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M37", { draggable: true }),
  component: () => import("../geometry-statistics/GeometryStatisticsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["调节角度", "观察边长", "按角分类", "按边分类"]
} satisfies ModuleDefinition;
