import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M01"),
  component: () => import("./M01OperationConveyor.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["观察算式", "选择先算部分", "显示中间量", "完成验算"]
} satisfies ModuleDefinition;
