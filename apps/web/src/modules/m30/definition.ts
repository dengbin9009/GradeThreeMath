import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M30", { draggable: true }),
  component: () => import("../geometry-statistics/GeometryStatisticsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["拖动长宽", "看行列格", "相乘求面积", "反向求边长"]
} satisfies ModuleDefinition;
