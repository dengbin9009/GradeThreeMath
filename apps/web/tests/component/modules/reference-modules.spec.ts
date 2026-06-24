import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import M09PlaceValueLab from "../../../src/modules/m09/M09PlaceValueLab.vue";
import M12TrainBridge from "../../../src/modules/m12/M12TrainBridge.vue";
import M20ChickenRabbit from "../../../src/modules/m20/M20ChickenRabbit.vue";
import M21ProfitLoss from "../../../src/modules/m21/M21ProfitLoss.vue";

describe("reference animation modules", () => {
  it("M09 keeps numeral, rods and abacus place values synchronized", async () => {
    const wrapper = mount(M09PlaceValueLab, { props: { parameters: { n: 3056 } } });
    expect(wrapper.get("[data-numeral]").text()).toBe("3056");
    expect(wrapper.findAll('[data-place="hundreds"] [data-counter]')).toHaveLength(0);
    expect(wrapper.findAll('[data-place="tens"] [data-counter]')).toHaveLength(5);
  });

  it("M12 reveals that full passage distance includes train and bridge", async () => {
    const wrapper = mount(M12TrainBridge, { props: { parameters: { trainLength: 120, bridgeLength: 300 } } });
    expect(wrapper.text()).toContain("420 米");
    await wrapper.get('[data-step="tail-off-bridge"]').trigger("click");
    expect(wrapper.get("[data-train-frame]").attributes("src")).toContain("train-bridge-03-tail-off-bridge");
  });

  it("M20 displays actual chicken and rabbit objects then lifts two legs", async () => {
    const wrapper = mount(M20ChickenRabbit, { props: { parameters: { heads: 10, legs: 28 } } });
    expect(wrapper.findAll("[data-animal]")).toHaveLength(10);
    expect(wrapper.findAll('[data-animal="rabbit"]')).toHaveLength(4);
    await wrapper.get('[data-action="lift"]').trigger("click");
    expect(wrapper.get('[data-animal="rabbit"]').attributes("src")).toContain("rabbit-02-lift-two-legs");
    expect(wrapper.text()).toContain("剩下 8 条腿");
  });

  it("M21 turns total gap into equal per-person groups", async () => {
    const wrapper = mount(M21ProfitLoss, { props: { parameters: { moreEach: 3, short: 12, lessEach: 2, left: 8 } } });
    expect(wrapper.text()).toContain("4 人");
    await wrapper.get('[data-action="split"]').trigger("click");
    expect(wrapper.findAll("[data-person-group]")).toHaveLength(4);
  });
});
