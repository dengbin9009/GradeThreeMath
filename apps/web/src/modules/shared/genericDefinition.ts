import { getModuleImageFrames } from "@math/shared";
import type { ModuleDefinition, ModuleId } from "../module.types";

export function createGenericModuleDefinition(id: ModuleId, options: { draggable?: boolean } = {}): ModuleDefinition {
  const assets = getModuleImageFrames(id).map((frame) => `/${frame.file}`);
  return {
    id,
    component: () => import("../generic/GenericMathModule.vue"),
    capabilities: {
      interactive: true,
      imageAnimation: assets.length > 0,
      draggable: Boolean(options.draggable),
      steppedReveal: true,
      answerCheck: true,
      resettable: true
    },
    defaultState: { step: 0 },
    normalize: (state) => ({ ...state, step: Math.max(0, Math.round(Number(state.step) || 0)) }),
    steps: ["观察条件", "动手建模", "看见关系", "完成验算"],
    assets
  };
}
