import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M34",
  promptId: "m34-image2-fence-perimeter",
  theme: "围栏绳卷",
  prompt: "Create a grade-three rectangle perimeter stage with fence rope, four side labels without text, corner posts, and wrap-around motion props, no text or numbers.",
  outputIntent: "layered rectangle perimeter assets",
  actorName: "fence-post",
  stateName: "rope-wrap",
  measureName: "side-ruler",
  feedbackName: "corner-check",
  rejectedName: "static-fence-answer",
  rejectedReason: "静态围栏图会漏掉围一圈过程，四条边必须在舞台上动态点亮。"
});
