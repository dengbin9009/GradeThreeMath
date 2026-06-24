import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M07", { draggable: true }),
  component: () => import("../operations/OperationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["摆出关系三角", "盖住未知量", "选择乘或除", "反向验算"]
} satisfies ModuleDefinition;
