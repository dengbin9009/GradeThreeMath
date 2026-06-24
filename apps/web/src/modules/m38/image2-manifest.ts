import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M38",
  promptId: "m38-image2-bar-chart-scale",
  theme: "数据柱图升降台",
  prompt: "Create a grade-three bar chart stage with adjustable bars, scale ladder, data cards, and warning cap for wrong scale, no text or numbers.",
  outputIntent: "layered bar chart scale assets",
  actorName: "bar",
  stateName: "raise-bars",
  measureName: "scale-ladder",
  feedbackName: "scale-cap",
  rejectedName: "static-chart-answer",
  rejectedReason: "静态柱图无法体现一格代表多少，柱高和刻度必须随数据动态变化。"
});
