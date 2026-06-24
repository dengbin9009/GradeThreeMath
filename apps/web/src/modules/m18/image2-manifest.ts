import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M18",
  promptId: "m18-image2-combination-matrix",
  theme: "组合试衣台",
  prompt: "Create a grade-three combination matrix stage with outfit cards, row and column trays, generated combination cards, and duplicate catcher, no text or numbers.",
  outputIntent: "layered combination matrix assets",
  actorName: "choice-card",
  stateName: "matrix-fill",
  measureName: "grid-tray",
  feedbackName: "duplicate-catcher",
  rejectedName: "static-combination-grid",
  rejectedReason: "静态矩阵不能体现逐个生成组合卡，行列数量和组合数必须动态计算。"
});
