import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ApplicationsBatchStage from "../../../src/modules/applications/ApplicationsBatchStage.vue";

describe("ApplicationsBatchStage", () => {
  it("turns M10 into a shop checkout scene", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M10", parameters: { price: 12, count: 5 } } });

    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M10");
    expect(wrapper.get("[data-application-formula]").text()).toContain("12×5=60");

    await wrapper.get('[data-action="checkout"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("收银条");
  });

  it("turns M11 into a motion timeline", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M11", parameters: { speed: 60, time: 3 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("60×3=180");

    await wrapper.get('[data-action="drive"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("路程条");
  });

  it("turns M13 into a line segment model", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M13", parameters: { sum: 72, times: 3 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("72÷4=18");

    await wrapper.get('[data-action="split-units"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("同样的一份");
  });

  it("turns M14 into a unit-rate copier", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M14", parameters: { total: 48, count: 6, newCount: 9 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("48÷6=8");

    await wrapper.get('[data-action="copy-unit"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("复制机");
  });

  it("turns M15 into a point-gap fence", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M15", parameters: { length: 40, gap: 5 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("40÷5+1=9");

    await wrapper.get('[data-action="plant-points"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("点和段");
  });

  it("turns M16 into a cycle ribbon", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M16", parameters: { pattern: "红黄蓝", position: 20 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("20÷3=6……2");

    await wrapper.get('[data-action="locate-remainder"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("余数块");
  });

  it("turns M17 into a reversible flow machine", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M17", parameters: { start: 8, add: 5, times: 3 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("(8+5)×3=39");

    await wrapper.get('[data-action="reverse-flow"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("倒车");
  });

  it("turns M18 into a combination matrix", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M18", parameters: { tops: 3, pants: 2 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("3×2=6");

    await wrapper.get('[data-action="make-cards"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("不重不漏");
  });

  it("turns M19 into an apple distribution table", async () => {
    const wrapper = mount(ApplicationsBatchStage, { props: { moduleId: "M19", parameters: { apples: 8, boxes: 2 } } });

    expect(wrapper.get("[data-application-formula]").text()).toContain("8-1=7");

    await wrapper.get('[data-action="list-ways"]').trigger("click");

    expect(wrapper.get("[data-playful-feedback]").text()).toContain("列表");
  });
});
