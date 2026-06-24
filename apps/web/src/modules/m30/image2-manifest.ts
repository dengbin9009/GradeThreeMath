import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M30",
  promptId: "m30-image2-rectangle-area",
  theme: "拖拉方格板",
  prompt: "Create a grade-three rectangle and square area stage with draggable length and width handles, grid board, row-column labels, and area counter, no text or numbers.",
  outputIntent: "layered rectangle area assets",
  actorName: "grid-cell",
  stateName: "drag-size",
  measureName: "side-handle",
  feedbackName: "area-counter",
  rejectedName: "static-rectangle-answer",
  rejectedReason: "静态长方形无法表达拖长宽和行列变化，面积必须随边长动态更新。"
});
