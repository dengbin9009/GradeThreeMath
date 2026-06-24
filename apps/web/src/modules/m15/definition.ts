import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M15", { draggable: true }),
  component: () => import("../applications/ApplicationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["先数间隔", "判断端点", "摆点和段", "核对点数"]
} satisfies ModuleDefinition;
