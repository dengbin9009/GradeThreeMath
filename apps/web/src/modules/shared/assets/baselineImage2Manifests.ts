import m09Manifest from "../../m09/image2-manifest";
import m12Manifest from "../../m12/image2-manifest";
import m20Manifest from "../../m20/image2-manifest";
import m21Manifest from "../../m21/image2-manifest";
import m39Manifest from "../../m39/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const baselineImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m09Manifest,
  m12Manifest,
  m20Manifest,
  m21Manifest,
  m39Manifest
]);
