import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M35",
  promptId: "m35-image2-same-rope-area",
  theme: "同绳变形场",
  prompt: "Create a grade-three same-perimeter rectangle stage with flexible rope frame, grid area board, shape options, and area ranking badge, no text or numbers.",
  outputIntent: "layered perimeter-area comparison assets",
  actorName: "rope-corner",
  stateName: "reshape",
  measureName: "area-grid",
  feedbackName: "ranking-badge",
  rejectedName: "static-best-area",
  rejectedReason: "静态最大面积图无法列举不同长宽，同周长变形和面积比较必须动态呈现。"
});
