import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M04", { draggable: true }),
  component: () => import("../operations/OperationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["拆成长宽", "看四块部分积", "合并面积阵列", "用总积验算"]
} satisfies ModuleDefinition;
