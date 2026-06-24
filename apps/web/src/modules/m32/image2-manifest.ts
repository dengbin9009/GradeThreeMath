import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M32",
  promptId: "m32-image2-transparent-grid",
  theme: "透明网格观察窗",
  prompt: "Create a grade-three area estimation stage with transparent grid, irregular shape, full-cell markers, half-cell cards, and estimate badge, no text or numbers.",
  outputIntent: "layered area estimation assets",
  actorName: "half-cell-card",
  stateName: "grid-overlay",
  measureName: "transparent-grid",
  feedbackName: "estimate-badge",
  rejectedName: "static-grid-answer",
  rejectedReason: "静态估测图无法体现整格、半格和单位面积变化，估算必须由组件实时计算。"
});
