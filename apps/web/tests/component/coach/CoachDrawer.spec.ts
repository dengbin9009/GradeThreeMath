import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CoachDrawer from "../../../src/components/learning/CoachDrawer.vue";

const archetype = { parentCoach: { talkTrack: "先说关系", commonMistake: "符号弄反", extensionPrompt: "怎样验算" } };
const variant = { title: "基础题", solutionSteps: ["第一步"] };

describe("CoachDrawer", () => {
  it("moves focus inside, closes on Escape and restores the opener", async () => {
    const opener = document.createElement("button");
    document.body.append(opener); opener.focus();
    const wrapper = mount(CoachDrawer, { attachTo: document.body, props: { open: false, archetype: archetype as never, variant: variant as never } });
    await wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.get('[aria-label="关闭家长辅导"]').element).toBe(document.activeElement);
    await wrapper.get('[role="dialog"]').trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("close")).toHaveLength(1);
    await wrapper.setProps({ open: false });
    expect(document.activeElement).toBe(opener);
    wrapper.unmount(); opener.remove();
  });
});
