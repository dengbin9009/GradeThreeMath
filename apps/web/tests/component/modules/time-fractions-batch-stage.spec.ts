import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TimeFractionsBatchStage from "../../../src/modules/time-fractions/TimeFractionsBatchStage.vue";

describe("TimeFractionsBatchStage", () => {
  it("turns M22 into an interactive calendar", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M22", parameters: { month: 9 } } });

    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M22");
    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("9月=30天");

    await wrapper.get('[data-action="flip-calendar"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("月份牌");
  });

  it("turns M23 into a double time line", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M23", parameters: { start: "8:15", end: "8:50" } } });

    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("8:15→8:50=35分钟");

    await wrapper.get('[data-action="stretch-time"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("时间条");
  });

  it("turns M24 into a unit-one mat", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M24", parameters: { whole: "一块蛋糕", parts: 4 } } });

    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("一块蛋糕÷4=1份");

    await wrapper.get('[data-action="choose-whole"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("单位1");
  });

  it("turns M25 into an equal-slice slider", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M25", parameters: { parts: 8, take: 3 } } });

    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("涂色=3/8");

    await wrapper.get('[data-action="shade-parts"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("涂色");
  });

  it("turns M26 into an overlay comparison", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M26", parameters: { denominator: 7, a: 3, b: 5 } } });

    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("5/7>3/7");

    await wrapper.get('[data-action="compare-fractions"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("同一个整体");
  });

  it("turns M27 into a fraction sharing table", async () => {
    const wrapper = mount(TimeFractionsBatchStage, { props: { moduleId: "M27", parameters: { total: 24, parts: 3 } } });

    expect(wrapper.get("[data-time-fraction-formula]").text()).toContain("24÷3=8");

    await wrapper.get('[data-action="share-items"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("先分再取");
  });
});
