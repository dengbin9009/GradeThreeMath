import m28Manifest from "../../m28/image2-manifest";
import m29Manifest from "../../m29/image2-manifest";
import m30Manifest from "../../m30/image2-manifest";
import m31Manifest from "../../m31/image2-manifest";
import m32Manifest from "../../m32/image2-manifest";
import m33Manifest from "../../m33/image2-manifest";
import m34Manifest from "../../m34/image2-manifest";
import m35Manifest from "../../m35/image2-manifest";
import m36Manifest from "../../m36/image2-manifest";
import m37Manifest from "../../m37/image2-manifest";
import m38Manifest from "../../m38/image2-manifest";
import type { Image2AssetManifest } from "./image2Manifest";
import { validateImage2AssetManifests } from "./image2Manifest";

export const geometryStatisticsImage2Manifests: Image2AssetManifest[] = validateImage2AssetManifests([
  m28Manifest,
  m29Manifest,
  m30Manifest,
  m31Manifest,
  m32Manifest,
  m33Manifest,
  m34Manifest,
  m35Manifest,
  m36Manifest,
  m37Manifest,
  m38Manifest
]);
