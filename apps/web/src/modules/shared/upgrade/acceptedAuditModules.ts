import { applicationsImage2Manifests } from "../assets/applicationsImage2Manifests";
import { baselineImage2Manifests } from "../assets/baselineImage2Manifests";
import { geometryStatisticsImage2Manifests } from "../assets/geometryStatisticsImage2Manifests";
import type { Image2AssetManifest } from "../assets/image2Manifest";
import { validateImage2AssetManifests } from "../assets/image2Manifest";
import { operationsImage2Manifests } from "../assets/operationsImage2Manifests";
import { sampleImage2Manifests } from "../assets/sampleImage2Manifests";
import { timeFractionsImage2Manifests } from "../assets/timeFractionsImage2Manifests";
import { moduleIds, type ModuleId } from "../../registry";

export type AuditPrimaryAction = {
  selector: string;
  kind?: "click" | "range";
  value?: string;
};

export type AcceptedAuditModule = {
  id: ModuleId;
  variantId: string;
  path: string;
  stageSelector: string;
  integerTextSelector: string;
  primaryAction: AuditPrimaryAction;
  feedbackText: string;
};

const allManifestCandidates = [
  ...baselineImage2Manifests,
  ...sampleImage2Manifests,
  ...operationsImage2Manifests,
  ...applicationsImage2Manifests,
  ...timeFractionsImage2Manifests,
  ...geometryStatisticsImage2Manifests,
];

const manifestByModuleId = new Map<ModuleId, Image2AssetManifest>();

for (const manifest of allManifestCandidates) {
  if (!manifestByModuleId.has(manifest.moduleId)) {
    manifestByModuleId.set(manifest.moduleId, manifest);
  }
}

export const allUpgradedImage2Manifests = moduleIds.map((moduleId) => {
  const manifest = manifestByModuleId.get(moduleId);
  if (!manifest) {
    throw new Error(`Missing image2 manifest for ${moduleId}`);
  }
  return manifest;
});

const stageSelector = (moduleId: ModuleId) =>
  `[data-upgrade-stage="scene"][data-module-id="${moduleId}"]`;

const variantPath = (moduleId: ModuleId, variantId = `${moduleId}-V1`) =>
  `/learn/${moduleId}/${variantId}`;

export const auditModuleIds = [...moduleIds];

export const acceptedAuditModules: AcceptedAuditModule[] = [
  {
    id: "M01",
    variantId: "M01-V1",
    path: variantPath("M01"),
    stageSelector: stageSelector("M01"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-order="combine-last"]' },
    feedbackText: "重新排队",
  },
  {
    id: "M02",
    variantId: "M02-V1",
    path: variantPath("M02"),
    stageSelector: stageSelector("M02"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-step="send-root"]' },
    feedbackText: "先加工",
  },
  {
    id: "M03",
    variantId: "M03-V1",
    path: variantPath("M03"),
    stageSelector: stageSelector("M03"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="carry"]' },
    feedbackText: "进位小车",
  },
  {
    id: "M04",
    variantId: "M04-V1",
    path: variantPath("M04"),
    stageSelector: stageSelector("M04"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="merge"]' },
    feedbackText: "部分积",
  },
  {
    id: "M05",
    variantId: "M05-V1",
    path: variantPath("M05"),
    stageSelector: stageSelector("M05"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="regroup"]' },
    feedbackText: "换成小单位",
  },
  {
    id: "M06",
    variantId: "M06-V1",
    path: variantPath("M06"),
    stageSelector: stageSelector("M06"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: "[data-trial-slider]", kind: "range", value: "6" },
    feedbackText: "太大",
  },
  {
    id: "M07",
    variantId: "M07-V1",
    path: variantPath("M07"),
    stageSelector: stageSelector("M07"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-cover="factor-b"]' },
    feedbackText: "遮住谁",
  },
  {
    id: "M08",
    variantId: "M08-V1",
    path: variantPath("M08"),
    stageSelector: stageSelector("M08"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="snap"]' },
    feedbackText: "磁铁",
  },
  {
    id: "M09",
    variantId: "M09-V1",
    path: variantPath("M09"),
    stageSelector: stageSelector("M09"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: "#place-number" },
    feedbackText: "零也占位",
  },
  {
    id: "M10",
    variantId: "M10-V1",
    path: variantPath("M10"),
    stageSelector: stageSelector("M10"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="checkout"]' },
    feedbackText: "收银条",
  },
  {
    id: "M11",
    variantId: "M11-V1",
    path: variantPath("M11"),
    stageSelector: stageSelector("M11"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="drive"]' },
    feedbackText: "路程条",
  },
  {
    id: "M12",
    variantId: "M12-V1",
    path: variantPath("M12"),
    stageSelector: stageSelector("M12"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-step="tail-off-bridge"]' },
    feedbackText: "车尾离桥",
  },
  {
    id: "M13",
    variantId: "M13-V1",
    path: variantPath("M13"),
    stageSelector: stageSelector("M13"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="split-units"]' },
    feedbackText: "同样的一份",
  },
  {
    id: "M14",
    variantId: "M14-V1",
    path: variantPath("M14"),
    stageSelector: stageSelector("M14"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="copy-unit"]' },
    feedbackText: "复制机",
  },
  {
    id: "M15",
    variantId: "M15-V1",
    path: variantPath("M15"),
    stageSelector: stageSelector("M15"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="plant-points"]' },
    feedbackText: "点和段",
  },
  {
    id: "M16",
    variantId: "M16-V1",
    path: variantPath("M16"),
    stageSelector: stageSelector("M16"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="locate-remainder"]' },
    feedbackText: "余数块",
  },
  {
    id: "M17",
    variantId: "M17-V1",
    path: variantPath("M17"),
    stageSelector: stageSelector("M17"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="reverse-flow"]' },
    feedbackText: "倒车",
  },
  {
    id: "M18",
    variantId: "M18-V1",
    path: variantPath("M18"),
    stageSelector: stageSelector("M18"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="make-cards"]' },
    feedbackText: "不重不漏",
  },
  {
    id: "M19",
    variantId: "M19-V1",
    path: variantPath("M19"),
    stageSelector: stageSelector("M19"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="list-ways"]' },
    feedbackText: "列表",
  },
  {
    id: "M20",
    variantId: "M20-V1",
    path: variantPath("M20"),
    stageSelector: stageSelector("M20"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="lift"]' },
    feedbackText: "一对一收走",
  },
  {
    id: "M21",
    variantId: "M21-V1",
    path: variantPath("M21"),
    stageSelector: stageSelector("M21"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="split"]' },
    feedbackText: "每人差",
  },
  {
    id: "M22",
    variantId: "M22-V1",
    path: variantPath("M22"),
    stageSelector: stageSelector("M22"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="flip-calendar"]' },
    feedbackText: "月份牌",
  },
  {
    id: "M23",
    variantId: "M23-V1",
    path: variantPath("M23"),
    stageSelector: stageSelector("M23"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="stretch-time"]' },
    feedbackText: "时间条",
  },
  {
    id: "M24",
    variantId: "M24-V1",
    path: variantPath("M24"),
    stageSelector: stageSelector("M24"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="choose-whole"]' },
    feedbackText: "单位1",
  },
  {
    id: "M25",
    variantId: "M25-V1",
    path: variantPath("M25"),
    stageSelector: stageSelector("M25"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="shade-parts"]' },
    feedbackText: "涂色",
  },
  {
    id: "M26",
    variantId: "M26-V1",
    path: variantPath("M26"),
    stageSelector: stageSelector("M26"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="compare-fractions"]' },
    feedbackText: "同一个整体",
  },
  {
    id: "M27",
    variantId: "M27-V1",
    path: variantPath("M27"),
    stageSelector: stageSelector("M27"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="share-items"]' },
    feedbackText: "先分再取",
  },
  {
    id: "M28",
    variantId: "M28-V1",
    path: variantPath("M28"),
    stageSelector: stageSelector("M28"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="zoom-ruler"]' },
    feedbackText: "尺带",
  },
  {
    id: "M29",
    variantId: "M29-V1",
    path: variantPath("M29"),
    stageSelector: stageSelector("M29"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="tile-area"]' },
    feedbackText: "铺砖",
  },
  {
    id: "M30",
    variantId: "M30-V1",
    path: variantPath("M30"),
    stageSelector: stageSelector("M30"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="drag-size"]' },
    feedbackText: "行列",
  },
  {
    id: "M31",
    variantId: "M31-V2",
    path: variantPath("M31", "M31-V2"),
    stageSelector: stageSelector("M31"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-method="split"]' },
    feedbackText: "整块好算",
  },
  {
    id: "M32",
    variantId: "M32-V1",
    path: variantPath("M32"),
    stageSelector: stageSelector("M32"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="count-grid"]' },
    feedbackText: "半格",
  },
  {
    id: "M33",
    variantId: "M33-V1",
    path: variantPath("M33"),
    stageSelector: stageSelector("M33"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="trace-boundary"]' },
    feedbackText: "边界",
  },
  {
    id: "M34",
    variantId: "M34-V1",
    path: variantPath("M34"),
    stageSelector: stageSelector("M34"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="wrap-fence"]' },
    feedbackText: "四条边",
  },
  {
    id: "M35",
    variantId: "M35-V1",
    path: variantPath("M35"),
    stageSelector: stageSelector("M35"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="reshape-rope"]' },
    feedbackText: "面积榜",
  },
  {
    id: "M36",
    variantId: "M36-V1",
    path: variantPath("M36"),
    stageSelector: stageSelector("M36"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="mirror-shape"]' },
    feedbackText: "镜面",
  },
  {
    id: "M37",
    variantId: "M37-V1",
    path: variantPath("M37"),
    stageSelector: stageSelector("M37"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="classify-triangle"]' },
    feedbackText: "分类牌",
  },
  {
    id: "M38",
    variantId: "M38-V1",
    path: variantPath("M38"),
    stageSelector: stageSelector("M38"),
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-action="raise-bars"]' },
    feedbackText: "刻度",
  },
  {
    id: "M39",
    variantId: "M39-V1",
    path: variantPath("M39"),
    stageSelector: '[data-zone="shelf"]',
    integerTextSelector: "[data-animation-stage]",
    primaryAction: { selector: '[data-step="undo-borrow"]' },
    feedbackText: "13 - 12 + 22 = 23",
  },
];

export function validateAcceptedAuditModules(
  modules: AcceptedAuditModule[],
): AcceptedAuditModule[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  if (modules.length !== moduleIds.length) {
    errors.push(`Expected ${moduleIds.length} audit modules, got ${modules.length}`);
  }

  modules.forEach((module, index) => {
    const expectedId = moduleIds[index];
    if (module.id !== expectedId) {
      errors.push(`Audit order ${index} expected ${expectedId}, got ${module.id}`);
    }

    if (seen.has(module.id)) {
      errors.push(`Duplicate audit module ${module.id}`);
    }
    seen.add(module.id);

    const expectedPath = `/learn/${module.id}/${module.variantId}`;
    if (module.path !== expectedPath) {
      errors.push(`${module.id} path should be ${expectedPath}, got ${module.path}`);
    }

    if (!module.variantId) {
      errors.push(`${module.id} missing variantId`);
    }
    if (!module.stageSelector) {
      errors.push(`${module.id} missing stageSelector`);
    }
    if (!module.integerTextSelector) {
      errors.push(`${module.id} missing integerTextSelector`);
    }
    if (!module.primaryAction.selector) {
      errors.push(`${module.id} missing primary action selector`);
    }
    if (!module.feedbackText) {
      errors.push(`${module.id} missing feedbackText`);
    }
  });

  validateImage2AssetManifests(allUpgradedImage2Manifests);

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return modules;
}
