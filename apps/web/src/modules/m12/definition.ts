import type { ModuleDefinition } from "../module.types";

export default {
  id: "M12",
  component: () => import("./M12TrainBridge.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  defaultState: { step: 0 },
  normalize: (state) => ({ ...state, step: Math.max(0, Math.round(Number(state.step) || 0)) }),
  steps: ["到桥前", "车头上桥", "整车上桥", "车尾离桥"],
  assets: [
    "/assets/train-bridge/train-bridge-00-before-bridge.png",
    "/assets/train-bridge/train-bridge-01-head-on-bridge.png",
    "/assets/train-bridge/train-bridge-02-whole-train-on-bridge.png",
    "/assets/train-bridge/train-bridge-03-tail-off-bridge.png"
  ]
} satisfies ModuleDefinition;
