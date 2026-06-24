import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M02"),
  component: () => import("./M02OperationTree.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["高亮括号", "计算子树", "把结果送回主算式", "完成计算"]
} satisfies ModuleDefinition;
