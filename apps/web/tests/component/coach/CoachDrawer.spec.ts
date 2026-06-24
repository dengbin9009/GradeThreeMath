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

  it("shows animation coach notes only when a reference module provides them", () => {
    const wrapper = mount(CoachDrawer, { props: { open: true, archetype: archetype as never, variant: variant as never } });
    expect(wrapper.find("[data-animation-coach-note]").exists()).toBe(false);

    wrapper.unmount();
    const withNote = mount(CoachDrawer, {
      props: {
        open: true,
        archetype: archetype as never,
        variant: variant as never,
        animationCoachNote: {
          moduleId: "M39",
          childPrompt: "先撤销最后发生的事。",
          oneSentenceCoach: "倒着看书本怎么回架。",
          commonMistakeCue: "容易按题目顺序正着算。"
        }
      }
    });
    expect(withNote.get("[data-animation-coach-note]").text()).toContain("倒着看书本怎么回架");
  });
});
