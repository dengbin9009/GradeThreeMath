import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M25",
  promptId: "m25-image2-equal-slices",
  theme: "等分切割台",
  prompt: "Create a grade-three equal-slice fraction stage with rectangle mat, movable cut lines, shade clips, and equal-size checker, no text or numbers.",
  outputIntent: "layered unit fraction and several-parts assets",
  actorName: "slice",
  stateName: "shade-parts",
  measureName: "cut-line",
  feedbackName: "equal-checker",
  rejectedName: "unequal-static-slices",
  rejectedReason: "静态切块无法证明每份相等，等分线和涂色份数必须动态呈现。"
});
