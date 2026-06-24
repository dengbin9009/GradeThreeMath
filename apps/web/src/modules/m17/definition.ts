import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M17", { draggable: true }),
  component: () => import("../applications/ApplicationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["输入起点", "经过运算门", "正向输出", "逆向验算"]
} satisfies ModuleDefinition;
