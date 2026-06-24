import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M38", { draggable: true }),
  component: () => import("../geometry-statistics/GeometryStatisticsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["确定一格代表量", "升起柱子", "读出数据", "比较差值"]
} satisfies ModuleDefinition;
