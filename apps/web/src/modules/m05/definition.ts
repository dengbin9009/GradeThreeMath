import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M05", { draggable: true }),
  component: () => import("../operations/OperationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["看总量", "平均放入托盘", "需要时换成小单位", "读出商和余数"]
} satisfies ModuleDefinition;
