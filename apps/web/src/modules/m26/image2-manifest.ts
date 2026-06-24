import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M26",
  promptId: "m26-image2-fraction-overlay",
  theme: "同整体叠片台",
  prompt: "Create a grade-three fraction comparison overlay stage with transparent fraction strips, same-whole stamp, comparison pointer, and denominator tray, no text or numbers.",
  outputIntent: "layered fraction comparison assets",
  actorName: "fraction-strip",
  stateName: "overlay",
  measureName: "same-whole-frame",
  feedbackName: "compare-pointer",
  rejectedName: "static-comparison-answer",
  rejectedReason: "静态比较图会固定答案，分数叠片和同整体检查必须动态切换。"
});
