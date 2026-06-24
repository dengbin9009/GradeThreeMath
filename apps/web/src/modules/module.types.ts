import type { Component } from "vue";

export type ModuleId =
  | "M01" | "M02" | "M03" | "M04" | "M05" | "M06" | "M07" | "M08" | "M09"
  | "M10" | "M11" | "M12" | "M13" | "M14" | "M15" | "M16" | "M17" | "M18" | "M19"
  | "M20" | "M21" | "M22" | "M23" | "M24" | "M25" | "M26" | "M27" | "M28" | "M29"
  | "M30" | "M31" | "M32" | "M33" | "M34" | "M35" | "M36" | "M37" | "M38" | "M39";

export interface ModuleCapabilities {
  interactive: true;
  imageAnimation: boolean;
  draggable: boolean;
  steppedReveal: boolean;
  answerCheck: boolean;
  resettable: true;
}

export interface ModuleDefinition {
  id: ModuleId;
  component: () => Promise<{ default: Component }>;
  capabilities: ModuleCapabilities;
  defaultState: Record<string, number | string>;
  normalize: (state: Record<string, number | string>) => Record<string, number | string>;
  steps: string[];
  assets: string[];
}
