import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Variant } from "@math/shared";

import ParentTalkTrack from "../../../src/components/coach/ParentTalkTrack.vue";
import SolutionSteps from "../../../src/components/coach/SolutionSteps.vue";
import VariantList from "../../../src/components/coach/VariantList.vue";

const variants: Variant[] = [
  { id: "M39-V1", title: "基础识别", parameters: {}, promptTemplate: "", solutionSteps: ["看现在"], answerRule: "" },
  { id: "M39-V2", title: "逆向求量", parameters: {}, promptTemplate: "", solutionSteps: ["倒着撤销"], answerRule: "" }
];

describe("coach variant helpers", () => {
  it("initializes variants and emits the selected variant id", async () => {
    const wrapper = mount(VariantList, { props: { variants, activeId: "M39-V1" } });
    expect(wrapper.get('[aria-current="page"]').text()).toContain("基础识别");

    await wrapper.get('[data-variant-id="M39-V2"]').trigger("click");
    expect(wrapper.emitted("select")?.[0]).toEqual(["M39-V2"]);
  });

  it("renders parent talk track and solution steps", () => {
    const talk = mount(ParentTalkTrack, {
      props: { talkTrack: "先问发生了什么", commonMistake: "方向弄反", extensionPrompt: "怎样验算" }
    });
    expect(talk.text()).toContain("先问发生了什么");
    expect(talk.text()).toContain("方向弄反");

    const steps = mount(SolutionSteps, { props: { title: "思考顺序", steps: ["看现在", "撤销还回"] } });
    expect(steps.findAll("li")).toHaveLength(2);
  });
});
