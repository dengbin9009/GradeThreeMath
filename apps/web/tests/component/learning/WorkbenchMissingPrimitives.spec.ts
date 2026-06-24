import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Archetype } from "@math/shared";

import ModuleControlBar from "../../../src/components/learning/ModuleControlBar.vue";
import ArchetypeResultRow from "../../../src/components/learning/ArchetypeResultRow.vue";
import DraggableObject from "../../../src/modules/shared/DraggableObject.vue";
import SceneStatus from "../../../src/modules/shared/SceneStatus.vue";

const archetype = {
  id: "M20",
  title: "鸡兔同笼",
  model: "抬腿法",
  layer: "拔高",
  difficulty: "提高",
  knowledgeIds: ["K20"],
  variants: [
    { id: "M20-V1", title: "基础识别", parameters: {}, promptTemplate: "", solutionSteps: [], answerRule: "" },
    { id: "M20-V2", title: "标准计算", parameters: {}, promptTemplate: "", solutionSteps: [], answerRule: "" }
  ],
  animationSpec: {
    scene: "动物舞台",
    manipulatives: [],
    controls: [],
    computedValues: [],
    revealSteps: [],
    childFeedback: "先抬腿"
  },
  parentCoach: {
    talkTrack: "先看头数",
    commonMistake: "忘记每只先抬两条腿",
    extensionPrompt: "怎样验算"
  }
} as Archetype;

describe("workbench missing primitives", () => {
  it("ModuleControlBar edits integer parameters and emits reset/check actions", async () => {
    const wrapper = mount(ModuleControlBar, {
      props: { parameters: { heads: 10, legs: 28 }, disabled: false }
    });

    await wrapper.get('[aria-label="heads增加"]').trigger("click");
    expect(wrapper.emitted("update:parameters")?.[0]).toEqual([{ heads: 11, legs: 28 }]);

    await wrapper.get('[data-action="check-answer"]').trigger("click");
    await wrapper.get('[data-action="reset-module"]').trigger("click");
    expect(wrapper.emitted("check")).toHaveLength(1);
    expect(wrapper.emitted("reset")).toHaveLength(1);
  });

  it("ArchetypeResultRow renders a compact accessible result link", () => {
    const wrapper = mount(ArchetypeResultRow, {
      props: { archetype, imageAnimation: true },
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: '<a :href="to"><slot /></a>'
          }
        }
      }
    });
    expect(wrapper.get('[data-module-id="M20"]').attributes("href")).toBe("/learn/M20/M20-V1");
    expect(wrapper.text()).toContain("鸡兔同笼");
    expect(wrapper.text()).toContain("图片动画");
  });

  it("DraggableObject emits integer coordinates after pointer movement", async () => {
    const wrapper = mount(DraggableObject, {
      props: { x: 10, y: 20, label: "书本" },
      slots: { default: "书" }
    });

    wrapper.get("[data-draggable-object]").element.dispatchEvent(new PointerEvent("pointermove", {
      buttons: 1,
      clientX: 42.4,
      clientY: 51.6
    }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("move")?.[0]).toEqual([{ x: 42, y: 52 }]);
  });

  it("SceneStatus announces the current scene state", () => {
    const wrapper = mount(SceneStatus, { props: { state: "hint", message: "先看数量关系" } });
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("data-scene-state")).toBe("hint");
    expect(wrapper.text()).toContain("先看数量关系");
  });
});
