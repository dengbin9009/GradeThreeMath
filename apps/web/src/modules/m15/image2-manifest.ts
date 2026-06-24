import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M15",
  promptId: "m15-image2-point-gap-fence",
  theme: "点段栅栏",
  prompt: "Create a grade-three planting and queue model with a fence line, movable point flags, interval segments, endpoint toggles, and count badge, no text or numbers.",
  outputIntent: "layered point-gap planting assets",
  actorName: "flag",
  stateName: "plant-points",
  measureName: "interval-line",
  feedbackName: "endpoint-badge",
  rejectedName: "fixed-fence-answer",
  rejectedReason: "静态栅栏无法切换两端都种、两端不种和圆形情况，点段数量需动态呈现。"
});
