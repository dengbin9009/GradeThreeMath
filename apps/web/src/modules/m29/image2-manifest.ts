import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M29",
  promptId: "m29-image2-area-tiles",
  theme: "方格铺砖场",
  prompt: "Create a grade-three area unit tiling stage with square tiles, grid mat, unit-area stamp, and tile snap guide, no text or numbers.",
  outputIntent: "layered area unit tiling assets",
  actorName: "tile",
  stateName: "tile-grid",
  measureName: "unit-square",
  feedbackName: "snap-guide",
  rejectedName: "static-tile-answer",
  rejectedReason: "静态铺砖图无法体现行列数量变化，单位面积和总面积必须动态计算。"
});
