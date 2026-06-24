import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M33",
  promptId: "m33-image2-boundary-trace",
  theme: "边界巡线车",
  prompt: "Create a grade-three perimeter concept stage with boundary tracing car, shape outline, inner false path blocker, and one-round finish marker, no text or numbers.",
  outputIntent: "layered boundary tracing assets",
  actorName: "trace-car",
  stateName: "boundary-loop",
  measureName: "outline-path",
  feedbackName: "finish-marker",
  rejectedName: "static-perimeter-path",
  rejectedReason: "静态描边无法区分边界和内部路线，巡线状态必须随操作高亮。"
});
