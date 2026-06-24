import type { ModuleId } from "../../module.types";

export interface BaselineCoachNote {
  moduleId: ModuleId;
  childPrompt: string;
  oneSentenceCoach: string;
  commonMistakeCue: string;
}

const baselineModuleIds: ModuleId[] = ["M09", "M12", "M20", "M21", "M39"];

export const baselineCoachNotes: BaselineCoachNote[] = [
  {
    moduleId: "M09",
    childPrompt: "换一个工具看，同一个数有没有变样子？",
    oneSentenceCoach: "让孩子把算筹、算盘和计算器当成三种语言，说的都是同一个位值结构。",
    commonMistakeCue: "容易把没有珠子的位当成不存在，要提醒孩子零也占着位置。"
  },
  {
    moduleId: "M12",
    childPrompt: "车头过桥了吗？再看看车尾离开了吗？",
    oneSentenceCoach: "火车过桥的路程要从车头上桥算到车尾离桥，所以要把车长和桥长合在一起看。",
    commonMistakeCue: "常见错因是只算桥长，忽略整列火车也要完全通过。"
  },
  {
    moduleId: "M20",
    childPrompt: "先假设都抬起两条腿，地上还剩哪些腿？",
    oneSentenceCoach: "抬腿法不是猜动物，而是把每只先看成同样少两条腿，再用剩下的腿数找兔子。",
    commonMistakeCue: "孩子容易直接除总腿数，忘了每个头都已经先贡献了两条腿。"
  },
  {
    moduleId: "M21",
    childPrompt: "两种分法差了多少？每一份又差多少？",
    oneSentenceCoach: "盈亏调整要先找总差额，再看每份差额，份数就是这两个差额的倍数关系。",
    commonMistakeCue: "常见错因是把盈和亏相减，其实一个多一个少时要合成总差。"
  },
  {
    moduleId: "M39",
    childPrompt: "先撤销最后发生的事，书本会回到哪里？",
    oneSentenceCoach: "借还还原要倒着走，先撤销还回，再撤销借出，书架数量会一步步回到最初。",
    commonMistakeCue: "孩子容易按题目顺序正着算，导致借出篮和还回篮的变化方向反了。"
  }
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function validateBaselineCoachNotes(notes: BaselineCoachNote[]): BaselineCoachNote[] {
  const seen = new Set<ModuleId>();
  for (const note of notes) {
    assert(baselineModuleIds.includes(note.moduleId), `${note.moduleId} is not a baseline module`);
    assert(!seen.has(note.moduleId), `${note.moduleId} has duplicate coach notes`);
    seen.add(note.moduleId);
    assert(note.childPrompt.trim().length > 0, `${note.moduleId} child prompt is required`);
    assert(note.oneSentenceCoach.trim().length > 0, `${note.moduleId} coach sentence is required`);
    assert(note.commonMistakeCue.trim().length > 0, `${note.moduleId} common mistake cue is required`);
  }

  for (const moduleId of baselineModuleIds) {
    assert(seen.has(moduleId), `${moduleId} is missing coach notes`);
  }

  return notes;
}

export function getBaselineCoachNote(moduleId: ModuleId): BaselineCoachNote {
  const note = baselineCoachNotes.find((item) => item.moduleId === moduleId);
  if (!note) throw new Error(`Missing baseline coach note: ${moduleId}`);
  return note;
}

validateBaselineCoachNotes(baselineCoachNotes);
