import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M31", { draggable: true }),
  component: () => import("./M31CompositeArea.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["观察能否切成长方形", "标出每块长宽", "分别求面积", "相加或相减"]
} satisfies ModuleDefinition;
