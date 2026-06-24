import { reactive, ref } from "vue";

export type FeedbackState = "idle" | "hint" | "correct" | "adjust";
export interface ModuleFeedback { state: FeedbackState; message: string }

export function useModuleSession(
  initialState: Record<string, number | string>,
  normalize: (state: Record<string, number | string>) => Record<string, number | string>
) {
  const initial = normalize({ ...initialState });
  const parameters = reactive<Record<string, number | string>>({ ...initial });
  const step = ref(0);
  const revision = ref(0);
  const feedback = ref<ModuleFeedback>({ state: "idle", message: "先观察题目中的数量关系。" });

  function replace(next: Record<string, number | string>) {
    Object.keys(parameters).forEach((key) => delete parameters[key]);
    Object.assign(parameters, normalize(next));
  }
  function setParameter(key: string, value: number | string) {
    replace({ ...parameters, [key]: typeof value === "number" ? Math.round(value) : value });
    feedback.value = { state: "adjust", message: "数量变了，再观察舞台和算式是否同步。" };
  }
  function reset() {
    replace({ ...initial });
    step.value = 0;
    feedback.value = { state: "idle", message: "先观察题目中的数量关系。" };
    revision.value += 1;
  }
  return { parameters, step, revision, feedback, setParameter, reset };
}
