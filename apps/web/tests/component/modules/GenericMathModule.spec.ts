import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GenericMathModule from "../../../src/modules/generic/GenericMathModule.vue";

const archetype = {
  id: "M10", title: "单价数量总价", animationSpec: { childFeedback: "看清三个量", revealSteps: ["看单价", "加数量", "到收银台", "算总价"] }
};
const variant = {
  id: "M10-V1", parameters: { price: 8, quantity: 4 }, answerRule: "总价=单价×数量。"
};

describe("GenericMathModule", () => {
  it("uses a large module-specific frame and integer controls", async () => {
    const wrapper = mount(GenericMathModule, { props: { moduleId: "M10", archetype, variant } });
    expect(wrapper.get("[data-scene-frame]").attributes("src")).toContain("m10-shopping-00-single-item");
    await wrapper.get('[data-increment="price"]').trigger("click");
    expect(wrapper.get('[data-value="price"]').text()).toBe("9");
    expect(wrapper.text()).not.toMatch(/9\.0/);
  });

  it("advances frames, reveals feedback and resets", async () => {
    const wrapper = mount(GenericMathModule, { props: { moduleId: "M10", archetype, variant } });
    await wrapper.get('[aria-label="下一步"]').trigger("click");
    expect(wrapper.get("[data-scene-frame]").attributes("src")).toContain("m10-shopping-01-add-items");
    await wrapper.get('[data-action="check"]').trigger("click");
    expect(wrapper.text()).toContain("总价=单价×数量");
    await wrapper.get('[aria-label="复位动画"]').trigger("click");
    expect(wrapper.get("[data-scene-frame]").attributes("src")).toContain("m10-shopping-00-single-item");
  });
});
