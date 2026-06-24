import type { ModuleDefinition } from "../module.types";

export default {
  id: "M39",
  component: () => import("./M39BorrowReturn.vue"),
  capabilities: { interactive: true, imageAnimation: true, draggable: true, steppedReveal: true, answerCheck: true, resettable: true },
  defaultState: { step: 0 },
  normalize: (state) => ({ ...state, step: Math.max(0, Math.round(Number(state.step) || 0)) }),
  steps: ["看现在", "撤销还回", "撤销借出", "正向验算"],
  assets: ["/assets/module-frames/m39-borrow-return/book-token.svg"]
} satisfies ModuleDefinition;
