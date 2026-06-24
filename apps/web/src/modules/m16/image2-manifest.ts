import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M16",
  promptId: "m16-image2-cycle-ribbon",
  theme: "循环彩带",
  prompt: "Create a grade-three repeating pattern ribbon with reusable colored tiles, cycle frame, remainder marker, and landing pad, no text or numbers.",
  outputIntent: "layered cycle and remainder assets",
  actorName: "pattern-tile",
  stateName: "remainder-landing",
  measureName: "cycle-frame",
  feedbackName: "remainder-marker",
  rejectedName: "static-cycle-answer",
  rejectedReason: "静态彩带会把目标位置答案固定住，周期组和余数必须由参数动态定位。"
});
