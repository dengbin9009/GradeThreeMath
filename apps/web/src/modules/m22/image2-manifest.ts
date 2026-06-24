import { createTimeFractionImage2Manifest } from "../time-fractions/image2ManifestFactory";

export default createTimeFractionImage2Manifest({
  moduleId: "M22",
  promptId: "m22-image2-calendar-flip",
  theme: "翻页日历台",
  prompt: "Create a grade-three calendar flip stage with month cards, February stretch card, leap-year toggle, and date path markers, no text or numbers.",
  outputIntent: "layered calendar and leap year assets",
  actorName: "month-card",
  stateName: "leap-toggle",
  measureName: "date-path",
  feedbackName: "calendar-stamp",
  rejectedName: "printed-calendar-answer",
  rejectedReason: "静态日历会把月份天数写死，月份、平闰年和日期路径必须动态更新。"
});
