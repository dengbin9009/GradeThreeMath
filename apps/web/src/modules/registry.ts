import type { ModuleDefinition, ModuleId } from "./module.types";
export type { ModuleId } from "./module.types";
import m01 from "./m01/definition";
import m02 from "./m02/definition";
import m03 from "./m03/definition";
import m04 from "./m04/definition";
import m05 from "./m05/definition";
import m06 from "./m06/definition";
import m07 from "./m07/definition";
import m08 from "./m08/definition";
import m09 from "./m09/definition";
import m10 from "./m10/definition";
import m11 from "./m11/definition";
import m12 from "./m12/definition";
import m13 from "./m13/definition";
import m14 from "./m14/definition";
import m15 from "./m15/definition";
import m16 from "./m16/definition";
import m17 from "./m17/definition";
import m18 from "./m18/definition";
import m19 from "./m19/definition";
import m20 from "./m20/definition";
import m21 from "./m21/definition";
import m22 from "./m22/definition";
import m23 from "./m23/definition";
import m24 from "./m24/definition";
import m25 from "./m25/definition";
import m26 from "./m26/definition";
import m27 from "./m27/definition";
import m28 from "./m28/definition";
import m29 from "./m29/definition";
import m30 from "./m30/definition";
import m31 from "./m31/definition";
import m32 from "./m32/definition";
import m33 from "./m33/definition";
import m34 from "./m34/definition";
import m35 from "./m35/definition";
import m36 from "./m36/definition";
import m37 from "./m37/definition";
import m38 from "./m38/definition";
import m39 from "./m39/definition";

export const moduleIds = Array.from(
  { length: 39 },
  (_, index) => `M${String(index + 1).padStart(2, "0")}` as ModuleId
);

export const moduleRegistry: Record<ModuleId, ModuleDefinition> = {
  M01: m01, M02: m02, M03: m03, M04: m04, M05: m05, M06: m06, M07: m07, M08: m08, M09: m09,
  M10: m10, M11: m11, M12: m12, M13: m13, M14: m14, M15: m15, M16: m16, M17: m17, M18: m18, M19: m19,
  M20: m20, M21: m21, M22: m22, M23: m23, M24: m24, M25: m25, M26: m26, M27: m27,
  M28: m28, M29: m29, M30: m30, M31: m31, M32: m32, M33: m33, M34: m34, M35: m35, M36: m36, M37: m37, M38: m38, M39: m39
};

export function getModuleDefinition(id: ModuleId): ModuleDefinition {
  return moduleRegistry[id];
}
