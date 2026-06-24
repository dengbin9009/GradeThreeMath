import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StepTrack from "../../../src/components/learning/StepTrack.vue";
import ResetButton from "../../../src/components/learning/ResetButton.vue";

describe("module controls", () => {
  it("selects a visible learning step", async () => {
    const wrapper = mount(StepTrack, { props: { steps: ["观察", "建模", "验算"], activeStep: 0 } });
    await wrapper.get('[data-step-index="1"]').trigger("click");
    expect(wrapper.emitted("select")?.[0]).toEqual([1]);
  });

  it("exposes an icon reset command", async () => {
    const wrapper = mount(ResetButton);
    await wrapper.get('button[aria-label="复位动画"]').trigger("click");
    expect(wrapper.emitted("reset")).toHaveLength(1);
  });
});
