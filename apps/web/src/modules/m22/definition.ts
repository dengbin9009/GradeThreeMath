import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M22", { draggable: true }),
  component: () => import("../time-fractions/TimeFractionsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["翻月份牌", "判断大小月", "检查平闰年", "数日期路径"]
} satisfies ModuleDefinition;
