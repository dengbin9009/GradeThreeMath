import type { ModuleDefinition } from "../module.types";

export default {
  id: "M21",
  component: () => import("./M21ProfitLoss.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  defaultState: { split: 0 },
  normalize: (state) => ({ ...state, split: Math.max(0, Math.round(Number(state.split) || 0)) }),
  steps: ["比较方案", "找到总差", "按每人差分组", "验算人数"],
  assets: [
    "/assets/module-frames/m21-profit-loss/m21-profit-loss-02-compare-gap.png",
    "/assets/module-frames/m21-profit-loss/m21-profit-loss-03-split-gap.png"
  ]
} satisfies ModuleDefinition;
