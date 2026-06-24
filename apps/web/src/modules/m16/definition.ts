import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M16", { draggable: true }),
  component: () => import("../applications/ApplicationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["圈出周期", "分完整组", "定位余数", "读出答案"]
} satisfies ModuleDefinition;
