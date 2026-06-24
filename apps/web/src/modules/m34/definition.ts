import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M34", { draggable: true }),
  component: () => import("../geometry-statistics/GeometryStatisticsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["围上长边", "围上宽边", "四边合计", "检查公式"]
} satisfies ModuleDefinition;
