import m01Manifest from "../../m01/image2-manifest";
import m02Manifest from "../../m02/image2-manifest";
import m03Manifest from "../../m03/image2-manifest";
import m31Manifest from "../../m31/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const sampleImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m01Manifest,
  m02Manifest,
  m03Manifest,
  m31Manifest
]);
