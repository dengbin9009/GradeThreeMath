import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M24",
  promptId: "m24-image2-unit-one-mat",
  theme: "单位 1 工作垫",
  prompt: "Create a grade-three whole-and-part mat with whole object cards, equal partition guides, part clips, and unit-one badge, no text or numbers.",
  outputIntent: "layered unit one and part-whole assets",
  actorName: "whole-card",
  stateName: "partition-guide",
  measureName: "unit-one-bracket",
  feedbackName: "unit-badge",
  rejectedName: "static-unit-one-answer",
  rejectedReason: "静态整体图容易混淆不同整体，单位 1 必须由孩子选择后高亮。"
});
