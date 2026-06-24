import { createPinia } from "pinia";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { describe, expect, it } from "vitest";
import LessonView from "../../../src/views/LessonView.vue";
import { useBlueprintStore } from "../../../src/app/stores/blueprint.store";

describe("LessonView", () => {
  it("renders the selected problem and opens the parent coach", async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: "/learn/:archetypeId/:variantId?", component: LessonView }] });
    await router.push("/learn/M39/M39-V1");
    await router.isReady();
    const pinia = createPinia();
    const blueprint = useBlueprintStore(pinia);
    blueprint.blueprint = {
      knowledgeNodes: [],
      archetypes: [{
        id: "M39", title: "借还还原问题", layer: "拔高", difficulty: "拔高", model: "倒着做相反动作", knowledgeIds: [],
        variants: [{ id: "M39-V1", title: "求原来", parameters: { borrowed: 22, returned: 12, remaining: 13 }, promptTemplate: "借出 {borrowed} 本，还回 {returned} 本，剩 {remaining} 本。", solutionSteps: ["看现在"], answerRule: "原来=剩下-还回+借出" }],
        animationSpec: { childFeedback: "倒放变化", revealSteps: ["看现在"] },
        parentCoach: { talkTrack: "先说清变化顺序。", commonMistake: "逆推符号不变。", extensionPrompt: "怎样验算？" }
      }]
    } as never;

    const wrapper = mount(LessonView, { global: { plugins: [pinia, router], stubs: { M39BorrowReturn: { template: '<div data-special-module="M39">动画</div>' } } } });
    await flushPromises();
    expect(wrapper.get("h1").text()).toContain("借还还原问题");
    expect(wrapper.find('[data-special-module="M39"]').exists()).toBe(true);
    await wrapper.get('button[aria-label="打开家长辅导"]').trigger("click");
    expect(wrapper.get('[role="dialog"]').text()).toContain("先说清变化顺序");
  });
});
