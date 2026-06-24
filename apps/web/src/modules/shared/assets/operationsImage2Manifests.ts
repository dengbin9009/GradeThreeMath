import m04Manifest from "../../m04/image2-manifest";
import m05Manifest from "../../m05/image2-manifest";
import m06Manifest from "../../m06/image2-manifest";
import m07Manifest from "../../m07/image2-manifest";
import m08Manifest from "../../m08/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const operationsImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m04Manifest,
  m05Manifest,
  m06Manifest,
  m07Manifest,
  m08Manifest
]);
