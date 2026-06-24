import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M28", { draggable: true }),
  component: () => import("../geometry-statistics/GeometryStatisticsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["选择合适单位", "拉伸尺带", "统一单位", "比较长短"]
} satisfies ModuleDefinition;
