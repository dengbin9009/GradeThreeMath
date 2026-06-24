import type { ModuleDefinition } from "../module.types";

export default {
  id: "M09",
  component: () => import("./M09PlaceValueLab.vue"),
  capabilities: { interactive: true, imageAnimation: false, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  defaultState: { n: 3056 },
  normalize: (state) => ({ ...state, n: Math.max(1, Math.round(Number(state.n ?? 3056))) }),
  steps: ["算筹", "算盘", "计算器", "估算检查"],
  assets: []
} satisfies ModuleDefinition;
