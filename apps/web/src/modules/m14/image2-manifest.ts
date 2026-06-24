import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M14",
  promptId: "m14-image2-unit-rate-copier",
  theme: "批量生产线",
  prompt: "Create a grade-three unit-rate production line with one-unit box, copy machine, batch trays, and total counter props, no text or numbers.",
  outputIntent: "layered unit-rate and total assets",
  actorName: "unit-box",
  stateName: "copy-machine",
  measureName: "batch-tray",
  feedbackName: "copy-light",
  rejectedName: "static-copy-answer",
  rejectedReason: "静态复制机无法表达先求一份再复制，新总量必须由复制次数动态变化。"
});
