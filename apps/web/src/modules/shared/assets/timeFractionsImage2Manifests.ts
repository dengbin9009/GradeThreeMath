import m22Manifest from "../../m22/image2-manifest";
import m23Manifest from "../../m23/image2-manifest";
import m24Manifest from "../../m24/image2-manifest";
import m25Manifest from "../../m25/image2-manifest";
import m26Manifest from "../../m26/image2-manifest";
import m27Manifest from "../../m27/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const timeFractionsImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m22Manifest,
  m23Manifest,
  m24Manifest,
  m25Manifest,
  m26Manifest,
  m27Manifest
]);
