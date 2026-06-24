import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import M01OperationConveyor from "../../../src/modules/m01/M01OperationConveyor.vue";
import M02OperationTree from "../../../src/modules/m02/M02OperationTree.vue";
import M03PlaceValueBlocks from "../../../src/modules/m03/M03PlaceValueBlocks.vue";
import M31CompositeArea from "../../../src/modules/m31/M31CompositeArea.vue";

describe("second-stage sample animation modules", () => {
  it("M01 lets children switch operation order and see the intermediate result", async () => {
    const wrapper = mount(M01OperationConveyor, { props: { parameters: { a: 3, b: 4, c: 5 } } });
    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M01");
    expect(wrapper.get("[data-conveyor-boxes]").text()).toContain("3");
    expect(wrapper.get("[data-middle-result]").text()).toContain("12");
    await wrapper.get('[data-order="combine-last"]').trigger("click");
    expect(wrapper.get("[data-middle-result]").text()).toContain("20");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("重新排队");
  });

  it("M02 highlights the bracket subtree before sending the result back", async () => {
    const wrapper = mount(M02OperationTree, { props: { parameters: { a: 56, b: 18, c: 3 } } });
    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M02");
    expect(wrapper.get("[data-bracket-subtree]").text()).toContain("56 - 18");
    expect(wrapper.get("[data-subtree-result]").text()).toContain("38");
    await wrapper.get('[data-step="send-root"]').trigger("click");
    expect(wrapper.get("[data-root-result]").text()).toContain("12");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("先加工");
  });

  it("M03 splits a number into place-value blocks and carries the final product", async () => {
    const wrapper = mount(M03PlaceValueBlocks, { props: { parameters: { n: 236, m: 3 } } });
    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M03");
    expect(wrapper.get("[data-place-partials]").text()).toContain("200×3=600");
    expect(wrapper.get("[data-total-product]").text()).toContain("708");
    await wrapper.get('[data-action="carry"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("进位小车");
  });

  it("M31 switches between split and fill methods without changing the area", async () => {
    const wrapper = mount(M31CompositeArea, { props: { parameters: { outerLength: 10, outerWidth: 8, missingLength: 3, missingWidth: 2 } } });
    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M31");
    expect(wrapper.get("[data-area-formula]").text()).toContain("10×8 - 3×2 = 74");
    await wrapper.get('[data-method="split"]').trigger("click");
    expect(wrapper.get("[data-area-formula]").text()).toContain("30 + 44 = 74");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("整块好算");
  });
});
