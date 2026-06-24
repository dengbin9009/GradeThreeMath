import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import OperationsBatchStage from "../../../src/modules/operations/OperationsBatchStage.vue";

describe("OperationsBatchStage", () => {
  it("turns M04 into a large area-array interaction", async () => {
    const wrapper = mount(OperationsBatchStage, { props: { moduleId: "M04", parameters: { a: 24, b: 13 } } });

    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M04");
    expect(wrapper.get("[data-operation-formula]").text()).toContain("(20+4)×(10+3)=312");

    await wrapper.get('[data-action="merge"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("部分积");
  });

  it("turns M05 into regroupable sharing trays", async () => {
    const wrapper = mount(OperationsBatchStage, { props: { moduleId: "M05", parameters: { total: 96, groups: 3 } } });

    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M05");
    expect(wrapper.get("[data-operation-formula]").text()).toContain("96÷3=32");

    await wrapper.get('[data-action="regroup"]').trigger("click");

    expect(wrapper.findAll("[data-tray]")).toHaveLength(3);
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("换成小单位");
  });

  it("turns M06 into a trial-quotient slider with integer feedback", async () => {
    const wrapper = mount(OperationsBatchStage, { props: { moduleId: "M06", parameters: { dividend: 156, divisor: 31 } } });
    const slider = wrapper.get<HTMLInputElement>("[data-trial-slider]");

    await slider.setValue(6);

    expect(wrapper.get("[data-operation-formula]").text()).toContain("31×6=186");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("太大");
  });

  it("turns M07 into a cover-the-unknown relation triangle", async () => {
    const wrapper = mount(OperationsBatchStage, { props: { moduleId: "M07", parameters: { a: 8, b: 7 } } });

    expect(wrapper.get("[data-relation-formula]").text()).toContain("8×7=56");

    await wrapper.get('[data-cover="factor-b"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("遮住谁");
  });

  it("turns M08 into a number-line magnet with whole-number estimates", async () => {
    const wrapper = mount(OperationsBatchStage, { props: { moduleId: "M08", parameters: { n: 48 } } });

    expect(wrapper.get("[data-operation-formula]").text()).toContain("48≈50");

    await wrapper.get('[data-action="snap"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("磁铁");
  });
});
