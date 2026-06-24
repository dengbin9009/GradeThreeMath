import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M17",
  promptId: "m17-image2-flow-machine",
  theme: "路径机器",
  prompt: "Create a grade-three flowchart reasoning machine with input token, operation gates, arrows, reverse lever, and path lights, no text or numbers.",
  outputIntent: "layered forward and reverse flow assets",
  actorName: "number-token",
  stateName: "reverse-lever",
  measureName: "arrow-path",
  feedbackName: "path-light",
  rejectedName: "static-flow-output",
  rejectedReason: "静态流程图无法正推逆推切换，输入、输出和路径必须由组件实时控制。"
});
