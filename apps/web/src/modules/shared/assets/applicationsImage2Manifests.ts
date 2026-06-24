import m10Manifest from "../../m10/image2-manifest";
import m11Manifest from "../../m11/image2-manifest";
import m13Manifest from "../../m13/image2-manifest";
import m14Manifest from "../../m14/image2-manifest";
import m15Manifest from "../../m15/image2-manifest";
import m16Manifest from "../../m16/image2-manifest";
import m17Manifest from "../../m17/image2-manifest";
import m18Manifest from "../../m18/image2-manifest";
import m19Manifest from "../../m19/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const applicationsImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m10Manifest,
  m11Manifest,
  m13Manifest,
  m14Manifest,
  m15Manifest,
  m16Manifest,
  m17Manifest,
  m18Manifest,
  m19Manifest
]);
