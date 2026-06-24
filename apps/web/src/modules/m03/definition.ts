import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M03"),
  component: () => import("./M03PlaceValueBlocks.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["位值拆分", "分别相乘", "处理进位", "合并答案"]
} satisfies ModuleDefinition;
