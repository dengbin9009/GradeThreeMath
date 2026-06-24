import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import KnownUnknownStrip from "../../../src/components/learning/KnownUnknownStrip.vue";
import IntegerStepper from "../../../src/modules/shared/IntegerStepper.vue";
import LearningFeedback from "../../../src/components/learning/LearningFeedback.vue";

describe("learning primitives", () => {
  it("renders known integer quantities and the unknown question", () => {
    const wrapper = mount(KnownUnknownStrip, { props: { parameters: { total: 24, unit: "本" }, unknown: "原来有多少本" } });
    expect(wrapper.findAll("[data-known]")).toHaveLength(2);
    expect(wrapper.get("[data-unknown]").text()).toContain("原来有多少本");
  });

  it("emits only bounded integers from the stepper", async () => {
    const wrapper = mount(IntegerStepper, { props: { label: "数量", modelValue: 3.6, min: 1, max: 5 } });
    await wrapper.get('[aria-label="数量增加"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([5]);
  });

  it.each(["idle", "hint", "correct", "adjust"] as const)("shows the %s feedback state", (state) => {
    const wrapper = mount(LearningFeedback, { props: { state, message: "继续观察数量关系" } });
    expect(wrapper.attributes("data-feedback-state")).toBe(state);
    expect(wrapper.text()).toContain("继续观察");
  });
});
