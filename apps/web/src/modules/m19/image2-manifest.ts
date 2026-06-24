import { createApplicationImage2Manifest } from "../applications/image2ManifestFactory";

export default createApplicationImage2Manifest({
  moduleId: "M19",
  promptId: "m19-image2-apple-boxes",
  theme: "盒子分配桌",
  prompt: "Create a grade-three apple distribution table with reusable apples, labeled empty boxes without text, listing cards, and remaining tray, no text or numbers.",
  outputIntent: "layered distribution and listing assets",
  actorName: "apple",
  stateName: "list-ways",
  measureName: "box-table",
  feedbackName: "list-card",
  rejectedName: "static-apple-list",
  rejectedReason: "静态苹果列表无法体现不同盒子和是否允许空盒，方案数必须按条件动态生成。"
});
