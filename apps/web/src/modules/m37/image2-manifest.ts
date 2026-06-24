import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M37",
  promptId: "m37-image2-triangle-classifier",
  theme: "弯杆三角架",
  prompt: "Create a grade-three triangle classification stage with adjustable rods, angle badge, side-length markers, and category cards, no text or numbers.",
  outputIntent: "layered triangle classification assets",
  actorName: "rod",
  stateName: "angle-adjust",
  measureName: "angle-badge",
  feedbackName: "category-card",
  rejectedName: "static-triangle-label",
  rejectedReason: "静态三角形标签无法体现按边和按角两种分类，角度和边长状态必须动态呈现。"
});
