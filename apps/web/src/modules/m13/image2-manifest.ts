import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M13",
  promptId: "m13-image2-line-segments",
  theme: "弹力线段工坊",
  prompt: "Create a grade-three comparison line-segment workshop with stretchable bars, equal unit blocks, difference bracket, and check stamp, no text or numbers.",
  outputIntent: "layered sum-difference-times line segment assets",
  actorName: "unit-block",
  stateName: "split-units",
  measureName: "bracket",
  feedbackName: "unit-stamp",
  rejectedName: "solved-line-diagram",
  rejectedReason: "静态线段图会固定份数和答案，等份块需要由不同题目条件动态生成。"
});
