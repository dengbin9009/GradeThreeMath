import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M08", { draggable: true }),
  component: () => import("../operations/OperationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["把原数放上数轴", "比较左右距离", "吸到最近整十", "用近似数验算"]
} satisfies ModuleDefinition;
