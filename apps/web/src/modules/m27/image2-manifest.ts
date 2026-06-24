import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M27",
  promptId: "m27-image2-fraction-sharing",
  theme: "分物分享桌",
  prompt: "Create a grade-three fraction-of-a-set sharing table with reusable item tokens, equal trays, take-part clips, and share-first reminder, no text or numbers.",
  outputIntent: "layered fraction application assets",
  actorName: "item-token",
  stateName: "share-first",
  measureName: "equal-tray",
  feedbackName: "take-clip",
  rejectedName: "static-share-answer",
  rejectedReason: "静态分物图无法表达先等分再取份，份数和取份数必须实时改变。"
});
