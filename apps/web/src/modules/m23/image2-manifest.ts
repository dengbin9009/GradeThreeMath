import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M23",
  promptId: "m23-image2-double-timeline",
  theme: "双层时间轨",
  prompt: "Create a grade-three elapsed-time double timeline with clock tokens, start and end flags, minute ribbon, and noon flip marker, no text or numbers.",
  outputIntent: "layered elapsed time assets",
  actorName: "clock-token",
  stateName: "time-stretch",
  measureName: "minute-ribbon",
  feedbackName: "time-flag",
  rejectedName: "static-clock-answer",
  rejectedReason: "静态钟面无法表达起点到终点的时间条，经过时间必须由组件实时计算。"
});
