import type { ModuleId } from "../../module.types";
import { moduleIds } from "../../registry";

export type UpgradeStatus = "not-started" | "planned" | "in-progress" | "accepted" | "blocked";
export type UpgradeBatch = "baseline" | "sample" | "operations" | "applications" | "time-fractions" | "geometry-statistics" | "final";

export interface AnimationUpgradeRecord {
  moduleId: ModuleId;
  status: UpgradeStatus;
  batch: UpgradeBatch;
  qualityLevel: 1 | 2 | 3;
  stageTheme: string;
  primaryInteraction: string;
  playfulFeedbackIds: string[];
  assetManifestPath: string;
  acceptancePath: string;
  notes: string[];
}

const baselineModules = new Set<ModuleId>(["M09", "M12", "M20", "M21", "M39"]);
const sampleModules = new Set<ModuleId>(["M01", "M02", "M03", "M31"]);

const modulePlan: Record<ModuleId, Pick<AnimationUpgradeRecord, "batch" | "stageTheme" | "primaryInteraction">> = {
  M01: { batch: "sample", stageTheme: "运算传送带", primaryInteraction: "调整运算顺序" },
  M02: { batch: "sample", stageTheme: "运算树剧场", primaryInteraction: "点亮括号优先级" },
  M03: { batch: "sample", stageTheme: "位值积木工坊", primaryInteraction: "移动位值积木并进位" },
  M04: { batch: "operations", stageTheme: "面积阵列地毯", primaryInteraction: "拆分整十和个位区域" },
  M05: { batch: "operations", stageTheme: "分物托盘", primaryInteraction: "平均分配并观察余数" },
  M06: { batch: "operations", stageTheme: "试商升降台", primaryInteraction: "滑动试商并比较乘积" },
  M07: { batch: "operations", stageTheme: "关系三角柜", primaryInteraction: "盖住未知量并验算" },
  M08: { batch: "operations", stageTheme: "数轴望远镜", primaryInteraction: "缩放数轴找近似数" },
  M09: { batch: "baseline", stageTheme: "数字工具实验台", primaryInteraction: "切换算筹算盘计算器" },
  M10: { batch: "applications", stageTheme: "小商店收银台", primaryInteraction: "拖商品并合计总价" },
  M11: { batch: "applications", stageTheme: "运动时间轴", primaryInteraction: "拖动速度或时间" },
  M12: { batch: "baseline", stageTheme: "火车桥梁大场景", primaryInteraction: "拖动车头通过桥梁" },
  M13: { batch: "applications", stageTheme: "弹力线段工坊", primaryInteraction: "拉伸线段图" },
  M14: { batch: "applications", stageTheme: "批量生产线", primaryInteraction: "先归一再复制" },
  M15: { batch: "applications", stageTheme: "点段栅栏", primaryInteraction: "切换端点和间隔" },
  M16: { batch: "applications", stageTheme: "循环彩带", primaryInteraction: "圈周期并定位余数" },
  M17: { batch: "applications", stageTheme: "路径机器", primaryInteraction: "顺推或逆推流程" },
  M18: { batch: "applications", stageTheme: "组合试衣台", primaryInteraction: "生成不重复搭配" },
  M19: { batch: "applications", stageTheme: "盒子分配桌", primaryInteraction: "拖苹果进盒子" },
  M20: { batch: "baseline", stageTheme: "抬腿观察台", primaryInteraction: "切换假设并观察腿数差" },
  M21: { batch: "baseline", stageTheme: "筹码差额裁判台", primaryInteraction: "分组筹码差额" },
  M22: { batch: "time-fractions", stageTheme: "翻页日历台", primaryInteraction: "翻月份和平闰年" },
  M23: { batch: "time-fractions", stageTheme: "双层时间轨", primaryInteraction: "拖起点终点" },
  M24: { batch: "time-fractions", stageTheme: "单位 1 工作垫", primaryInteraction: "切换整体并取部分" },
  M25: { batch: "time-fractions", stageTheme: "等分切割台", primaryInteraction: "滑动份数并取份" },
  M26: { batch: "time-fractions", stageTheme: "同整体叠片台", primaryInteraction: "叠放比较阴影" },
  M27: { batch: "time-fractions", stageTheme: "分物分享桌", primaryInteraction: "先等分再取份" },
  M28: { batch: "geometry-statistics", stageTheme: "伸缩尺带", primaryInteraction: "切换单位刻度" },
  M29: { batch: "geometry-statistics", stageTheme: "方格铺砖场", primaryInteraction: "拖单位砖铺满" },
  M30: { batch: "geometry-statistics", stageTheme: "拖拉方格板", primaryInteraction: "拖长宽看行列" },
  M31: { batch: "sample", stageTheme: "拼补图形工作台", primaryInteraction: "切割平移补形" },
  M32: { batch: "geometry-statistics", stageTheme: "透明网格观察窗", primaryInteraction: "覆盖网格估面积" },
  M33: { batch: "geometry-statistics", stageTheme: "边界巡线车", primaryInteraction: "沿边界跑一圈" },
  M34: { batch: "geometry-statistics", stageTheme: "围栏绳卷", primaryInteraction: "围出完整周长" },
  M35: { batch: "geometry-statistics", stageTheme: "同绳变形场", primaryInteraction: "固定周长改面积" },
  M36: { batch: "geometry-statistics", stageTheme: "镜面瓷砖台", primaryInteraction: "拖镜面和图块" },
  M37: { batch: "geometry-statistics", stageTheme: "弯杆三角架", primaryInteraction: "拖顶点分类" },
  M38: { batch: "geometry-statistics", stageTheme: "数据柱图升降台", primaryInteraction: "调整数据和刻度" },
  M39: { batch: "baseline", stageTheme: "动态书架还原台", primaryInteraction: "移动书本逆推还原" }
};

export const upgradeRecords: AnimationUpgradeRecord[] = moduleIds.map((moduleId) => {
  const plan = modulePlan[moduleId];
  const accepted = baselineModules.has(moduleId);
  const planned = sampleModules.has(moduleId);
  return {
    moduleId,
    status: accepted ? "accepted" : planned ? "planned" : "not-started",
    batch: plan.batch,
    qualityLevel: accepted ? 3 : planned ? 2 : 1,
    stageTheme: plan.stageTheme,
    primaryInteraction: plan.primaryInteraction,
    playfulFeedbackIds: accepted ? [`${moduleId}-baseline-feedback`] : [],
    assetManifestPath: accepted || planned ? `apps/web/src/modules/${moduleId.toLowerCase()}/image2-manifest.ts` : "",
    acceptancePath: accepted ? "docs/acceptance/reference-module-visual.md" : "",
    notes: accepted ? ["保留现有核心交互方向，接入统一质量门。"] : []
  };
});

export function validateUpgradeRecords(records: AnimationUpgradeRecord[]): AnimationUpgradeRecord[] {
  const seen = new Set<ModuleId>();
  for (const record of records) {
    if (seen.has(record.moduleId)) throw new Error(`duplicate upgrade record: ${record.moduleId}`);
    seen.add(record.moduleId);
    if (record.status === "accepted" && !record.assetManifestPath) {
      throw new Error(`${record.moduleId} accepted records must include an asset manifest path`);
    }
    if (record.status === "accepted" && record.qualityLevel !== 3) {
      throw new Error(`${record.moduleId} accepted records must use quality level 3`);
    }
    if (record.assetManifestPath && record.assetManifestPath.startsWith("/")) {
      throw new Error(`${record.moduleId} asset manifest path must be repository-relative`);
    }
  }
  if (records.length === moduleIds.length) {
    const ids = records.map((record) => record.moduleId);
    if (ids.join(",") !== moduleIds.join(",")) {
      throw new Error("upgrade records must follow M01-M39 order");
    }
  }
  return records;
}

export function getAnimationUpgradeRecord(moduleId: ModuleId): AnimationUpgradeRecord {
  const record = upgradeRecords.find((item) => item.moduleId === moduleId);
  if (!record) throw new Error(`Unknown animation upgrade record: ${moduleId}`);
  return record;
}

validateUpgradeRecords(upgradeRecords);
