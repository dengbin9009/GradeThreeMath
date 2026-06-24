import { describe, expect, it } from "vitest";
import {
  type Image2AssetManifest,
  type Image2LayerAsset,
  validateImage2AssetManifest,
  validateImage2AssetManifests
} from "../../../src/modules/shared/assets/image2Manifest";

const validManifest: Image2AssetManifest = {
  moduleId: "M01",
  version: 1,
  styleGuide: "明亮、干净、立体教具感",
  prompts: [
    {
      id: "p-background",
      useCase: "scientific-educational",
      prompt: "Create a classroom math conveyor background with no text.",
      negativePrompt: "No formula, answer, variable number, watermark, brand, or text.",
      outputIntent: "background",
      createdAt: "2026-06-24"
    }
  ],
  assets: [
    {
      id: "background",
      role: "background",
      path: "apps/web/src/assets/module-frames/m01/image2/background-v1.webp",
      promptId: "p-background",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "number-box",
      role: "actor",
      path: "apps/web/src/assets/module-frames/m01/image2/actor-number-box-v1.png",
      promptId: "p-background",
      transparent: true,
      repeatable: true,
      intrinsicSize: { width: 256, height: 256 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "ruler",
      role: "measure-prop",
      path: "apps/web/src/assets/module-frames/m01/image2/prop-ruler-v1.png",
      promptId: "p-background",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 512, height: 128 },
      altPolicy: "meaningful",
      mustNotContainText: true
    },
    {
      id: "queue-sign",
      role: "feedback-prop",
      path: "apps/web/src/assets/module-frames/m01/image2/feedback-queue-sign-v1.png",
      promptId: "p-background",
      transparent: true,
      repeatable: false,
      intrinsicSize: { width: 320, height: 240 },
      altPolicy: "decorative",
      mustNotContainText: true
    },
    {
      id: "fallback",
      role: "fallback-still",
      path: "apps/web/src/assets/module-frames/m01/image2/fallback-still-v1.webp",
      promptId: "p-background",
      transparent: false,
      repeatable: false,
      intrinsicSize: { width: 1600, height: 900 },
      altPolicy: "meaningful",
      mustNotContainText: true
    }
  ],
  fallbackStill: "apps/web/src/assets/module-frames/m01/image2/fallback-still-v1.webp",
  rejectedAssets: []
};

const replaceAssets = (assets: Image2LayerAsset[]): Image2AssetManifest => ({ ...validManifest, assets });
const firstAsset = (): Image2LayerAsset => validManifest.assets[0]!;

describe("image2 asset manifests", () => {
  it("accepts a complete layered manifest", () => {
    expect(validateImage2AssetManifest(validManifest)).toEqual(validManifest);
  });

  it("rejects missing required roles", () => {
    const missingFallback = {
      ...validManifest,
      assets: validManifest.assets.filter((asset) => asset.role !== "fallback-still")
    };
    expect(() => validateImage2AssetManifest(missingFallback)).toThrow(/fallback-still/i);
  });

  it("rejects absolute, home and temporary paths", () => {
    for (const path of ["/tmp/generated.png", "/Users/dengbin/generated.png", "~/generated.png"]) {
      const manifest = replaceAssets([{ ...firstAsset(), path }]);
      expect(() => validateImage2AssetManifest(manifest)).toThrow(/repository-relative/i);
    }
  });

  it("rejects accepted assets that allow text or use unknown prompts", () => {
    expect(() =>
      validateImage2AssetManifest({
        ...validManifest,
        assets: [{ ...firstAsset(), mustNotContainText: false }]
      })
    ).toThrow(/must not contain text/i);

    expect(() =>
      validateImage2AssetManifest({
        ...validManifest,
        assets: [{ ...firstAsset(), promptId: "missing" }]
      })
    ).toThrow(/prompt/i);
  });

  it("validates fallback references and rejected asset reasons", () => {
    expect(() =>
      validateImage2AssetManifest({
        ...validManifest,
        fallbackStill: "apps/web/src/assets/module-frames/m01/image2/missing.webp"
      })
    ).toThrow(/fallback/i);

    expect(() =>
      validateImage2AssetManifest({
        ...validManifest,
        rejectedAssets: [{ path: "apps/web/src/assets/module-frames/m01/image2/bad.png", reason: "" }]
      })
    ).toThrow(/rejected/i);
  });

  it("rejects duplicate module manifests", () => {
    expect(() => validateImage2AssetManifests([validManifest, validManifest])).toThrow(/duplicate/i);
  });
});
