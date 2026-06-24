import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M11",
  promptId: "m11-image2-motion-timeline",
  theme: "运动时间轴",
  prompt: "Create a grade-three speed time distance stage with a track, reusable vehicle token, time markers, distance ribbon, and finish flag, no text or numbers.",
  outputIntent: "layered speed-time-distance assets",
  actorName: "vehicle",
  stateName: "moving",
  measureName: "distance-ribbon",
  feedbackName: "finish-flag",
  rejectedName: "static-road-answer",
  rejectedReason: "静态路线无法表达速度、时间和路程三量联动，路程条必须随参数变化。"
});
