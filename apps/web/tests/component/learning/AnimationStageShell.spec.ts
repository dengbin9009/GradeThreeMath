import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AnimationStageShell from "../../../src/components/learning/AnimationStageShell.vue";

describe("AnimationStageShell", () => {
  it("provides a large stage, feedback region and reset command", async () => {
    const wrapper = mount(AnimationStageShell, { slots: { default: "动画对象" }, props: { feedback: "再看一看车尾的位置" } });
    expect(wrapper.get("[data-animation-stage]").text()).toContain("动画对象");
    expect(wrapper.get('[aria-live="polite"]').text()).toContain("再看一看");
    await wrapper.get('button[aria-label="复位动画"]').trigger("click");
    expect(wrapper.emitted("reset")).toHaveLength(1);
  });
});
