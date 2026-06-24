import type { ModuleId } from "../module.types";
import type { Image2AssetManifest } from "../shared/assets/image2Manifest";

export function createApplicationImage2Manifest(config: {
  moduleId: Extract<ModuleId, "M10" | "M11" | "M13" | "M14" | "M15" | "M16" | "M17" | "M18" | "M19">;
  promptId: string;
  theme: string;
  prompt: string;
  outputIntent: string;
  actorName: string;
  stateName: string;
  measureName: string;
  feedbackName: string;
  rejectedName: string;
  rejectedReason: string;
}): Image2AssetManifest {
  const moduleKey = config.moduleId.toLowerCase();
  const basePath = `apps/web/src/assets/module-frames/${moduleKey}/image2`;
  return {
    moduleId: config.moduleId,
    version: 1,
    styleGuide: `${config.theme}，明亮教具感，大舞台背景、可动对象、量线道具和反馈道具分层。`,
    prompts: [
      {
        id: config.promptId,
        useCase: "scientific-educational",
        prompt: config.prompt,
        negativePrompt: "No formula, answer, variable number, watermark, brand, or readable text.",
        outputIntent: config.outputIntent,
        createdAt: "2026-06-24"
      }
    ],
    assets: [
      { id: "background", role: "background", path: `${basePath}/background-v1.webp`, promptId: config.promptId, transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "decorative", mustNotContainText: true },
      { id: "actor", role: "actor", path: `${basePath}/actor-${config.actorName}-v1.png`, promptId: config.promptId, transparent: true, repeatable: true, intrinsicSize: { width: 260, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
      { id: "state-frame", role: "state-frame", path: `${basePath}/state-${config.stateName}-v1.png`, promptId: config.promptId, transparent: true, repeatable: false, intrinsicSize: { width: 620, height: 360 }, altPolicy: "meaningful", mustNotContainText: true },
      { id: "measure-prop", role: "measure-prop", path: `${basePath}/prop-${config.measureName}-v1.png`, promptId: config.promptId, transparent: true, repeatable: false, intrinsicSize: { width: 700, height: 280 }, altPolicy: "meaningful", mustNotContainText: true },
      { id: "feedback-prop", role: "feedback-prop", path: `${basePath}/feedback-${config.feedbackName}-v1.png`, promptId: config.promptId, transparent: true, repeatable: false, intrinsicSize: { width: 280, height: 220 }, altPolicy: "decorative", mustNotContainText: true },
      { id: "fallback", role: "fallback-still", path: `${basePath}/fallback-still-v1.webp`, promptId: config.promptId, transparent: false, repeatable: false, intrinsicSize: { width: 1600, height: 900 }, altPolicy: "meaningful", mustNotContainText: true }
    ],
    fallbackStill: `${basePath}/fallback-still-v1.webp`,
    rejectedAssets: [{ path: `${basePath}/static-${config.rejectedName}-v0.webp`, reason: config.rejectedReason }]
  };
}
