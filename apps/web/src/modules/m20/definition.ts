import type { ModuleDefinition } from "../module.types";

export default {
  id: "M20",
  component: () => import("./M20ChickenRabbit.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: false, steppedReveal: true, answerCheck: true, resettable: true },
  defaultState: { pose: 0 },
  normalize: (state) => ({ ...state, pose: Math.max(0, Math.round(Number(state.pose) || 0)) }),
  steps: ["站好", "准备", "一起抬腿", "看结果"],
  assets: [
    "/assets/chicken-rabbit/chicken-00-standing.png",
    "/assets/chicken-rabbit/rabbit-00-standing.png",
    "/assets/chicken-rabbit/chicken-02-lift-two-legs.png",
    "/assets/chicken-rabbit/rabbit-02-lift-two-legs.png"
  ]
} satisfies ModuleDefinition;
