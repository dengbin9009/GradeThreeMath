import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M06", { draggable: true }),
  component: () => import("../operations/OperationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["先估商", "拖动试商滑杆", "比较乘积和被除数", "确认余数小于除数"]
} satisfies ModuleDefinition;
