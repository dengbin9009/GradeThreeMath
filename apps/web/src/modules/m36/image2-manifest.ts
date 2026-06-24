import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M36",
  promptId: "m36-image2-mirror-tiles",
  theme: "镜面瓷砖台",
  prompt: "Create a grade-three symmetry and tiling stage with mirror line, shape tiles, half-shape cards, and snap-to-grid guide, no text or numbers.",
  outputIntent: "layered symmetry and tiling assets",
  actorName: "shape-tile",
  stateName: "mirror-copy",
  measureName: "mirror-line",
  feedbackName: "snap-grid",
  rejectedName: "static-symmetry-answer",
  rejectedReason: "静态对称图无法折叠验证，镜面、补全和拼嵌状态必须动态更新。"
});
