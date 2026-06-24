import { createGeometryStatisticsImage2Manifest } from "../geometry-statistics/image2ManifestFactory";

export default createGeometryStatisticsImage2Manifest({
  moduleId: "M28",
  promptId: "m28-image2-ruler-zoom",
  theme: "伸缩尺带",
  prompt: "Create a grade-three length unit conversion stage with stretch ruler tape, meter decimeter centimeter markers, movable object token, and unit lights, no text or numbers.",
  outputIntent: "layered length conversion assets",
  actorName: "object-token",
  stateName: "ruler-zoom",
  measureName: "unit-ruler",
  feedbackName: "unit-light",
  rejectedName: "printed-conversion",
  rejectedReason: "静态换算图会把厘米数写死，单位进率和对象长度必须动态呈现。"
});
