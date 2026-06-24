import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M10",
  promptId: "m10-image2-shop-checkout",
  theme: "小商店收银台",
  prompt: "Create a grade-three shop checkout math stage with shelves, reusable item tokens, a basket, a receipt strip, and a cash register, no text or numbers.",
  outputIntent: "layered unit price, quantity, total price assets",
  actorName: "item",
  stateName: "checkout",
  measureName: "receipt",
  feedbackName: "cash-register",
  rejectedName: "printed-answer-receipt",
  rejectedReason: "静态收银条会把总价写死，单价、数量和总价必须由组件实时计算。"
});
