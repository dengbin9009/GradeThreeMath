import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M18", { draggable: true }),
  component: () => import("../applications/ApplicationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["列出选择", "生成矩阵", "逐格配对", "确认不重不漏"]
} satisfies ModuleDefinition;
