import { createGenericModuleDefinition } from "../shared/genericDefinition";
import type { ModuleDefinition } from "../module.types";

export default {
  ...createGenericModuleDefinition("M10", { draggable: true }),
  component: () => import("../applications/ApplicationsBatchStage.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  steps: ["找单价和数量", "商品放入篮子", "拉出收银条", "总价验算"]
} satisfies ModuleDefinition;
