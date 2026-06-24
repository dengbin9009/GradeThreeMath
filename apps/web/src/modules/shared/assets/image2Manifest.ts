import type { ModuleId } from "../../module.types";

export type Image2AssetRole =
  | "background"
  | "actor"
  | "state-frame"
  | "measure-prop"
  | "feedback-prop"
  | "fallback-still";

export type Image2UseCase = "scientific-educational" | "illustration-story" | "stylized-concept";

export interface Image2PromptRecord {
  id: string;
  useCase: Image2UseCase;
  prompt: string;
  negativePrompt: string;
  outputIntent: string;
  createdAt: string;
}

export interface Image2LayerAsset {
  id: string;
  role: Image2AssetRole;
  path: string;
  promptId: string;
  transparent: boolean;
  repeatable: boolean;
  intrinsicSize: { width: number; height: number };
  altPolicy: "decorative" | "container-labeled" | "meaningful";
  mustNotContainText: boolean;
}

export interface Image2AssetManifest {
  moduleId: ModuleId;
  version: number;
  styleGuide: string;
  prompts: Image2PromptRecord[];
  assets: Image2LayerAsset[];
  fallbackStill: string;
  rejectedAssets: Array<{ path: string; reason: string }>;
}

const requiredRoles: Image2AssetRole[] = ["background", "actor", "measure-prop", "feedback-prop", "fallback-still"];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function isRepositoryRelativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !value.startsWith("/") &&
    !value.startsWith("~") &&
    !value.includes("..") &&
    !value.includes("\\") &&
    !value.includes("/tmp/") &&
    !value.includes("/var/folders/") &&
    !value.includes("/Users/")
  );
}

function validateAssetPath(path: string, label: string) {
  assert(isRepositoryRelativePath(path), `${label} must use a repository-relative path`);
}

export function validateImage2AssetManifest(manifest: Image2AssetManifest): Image2AssetManifest {
  assert(manifest.moduleId, "image2 manifest must include a module id");
  assert(Number.isInteger(manifest.version) && manifest.version > 0, `${manifest.moduleId} manifest version must be a positive integer`);
  assert(manifest.styleGuide.trim().length > 0, `${manifest.moduleId} manifest must include a style guide`);
  assert(manifest.prompts.length > 0, `${manifest.moduleId} manifest must include at least one prompt`);
  assert(manifest.assets.length > 0, `${manifest.moduleId} manifest must include assets`);

  const promptIds = new Set<string>();
  for (const prompt of manifest.prompts) {
    assert(prompt.id.trim().length > 0, `${manifest.moduleId} prompt id is required`);
    assert(!promptIds.has(prompt.id), `${manifest.moduleId} duplicate prompt id: ${prompt.id}`);
    promptIds.add(prompt.id);
    assert(prompt.prompt.trim().length > 0, `${manifest.moduleId}/${prompt.id} prompt is required`);
    assert(prompt.negativePrompt.trim().length > 0, `${manifest.moduleId}/${prompt.id} negative prompt is required`);
    assert(prompt.outputIntent.trim().length > 0, `${manifest.moduleId}/${prompt.id} output intent is required`);
  }

  const assetIds = new Set<string>();
  for (const asset of manifest.assets) {
    assert(asset.id.trim().length > 0, `${manifest.moduleId} asset id is required`);
    assert(!assetIds.has(asset.id), `${manifest.moduleId} duplicate asset id: ${asset.id}`);
    assetIds.add(asset.id);
    validateAssetPath(asset.path, `${manifest.moduleId}/${asset.id} path`);
    assert(promptIds.has(asset.promptId), `${manifest.moduleId}/${asset.id} references an unknown prompt`);
    assert(asset.mustNotContainText, `${manifest.moduleId}/${asset.id} must not contain text`);
    assert(Number.isInteger(asset.intrinsicSize.width) && asset.intrinsicSize.width > 0, `${manifest.moduleId}/${asset.id} width must be positive`);
    assert(Number.isInteger(asset.intrinsicSize.height) && asset.intrinsicSize.height > 0, `${manifest.moduleId}/${asset.id} height must be positive`);
  }

  for (const role of requiredRoles) {
    assert(manifest.assets.some((asset) => asset.role === role), `${manifest.moduleId} manifest is missing required role: ${role}`);
  }

  validateAssetPath(manifest.fallbackStill, `${manifest.moduleId} fallbackStill`);
  assert(
    manifest.assets.some((asset) => asset.role === "fallback-still" && asset.path === manifest.fallbackStill),
    `${manifest.moduleId} fallbackStill must reference a fallback-still asset`
  );

  for (const rejected of manifest.rejectedAssets) {
    validateAssetPath(rejected.path, `${manifest.moduleId} rejected asset path`);
    assert(rejected.reason.trim().length > 0, `${manifest.moduleId} rejected asset must include a reason`);
  }

  return manifest;
}

export function validateImage2AssetManifests(manifests: Image2AssetManifest[]): Image2AssetManifest[] {
  const moduleIds = new Set<ModuleId>();
  for (const manifest of manifests) {
    if (moduleIds.has(manifest.moduleId)) throw new Error(`Duplicate image2 manifest for ${manifest.moduleId}`);
    moduleIds.add(manifest.moduleId);
    validateImage2AssetManifest(manifest);
  }
  return manifests;
}
