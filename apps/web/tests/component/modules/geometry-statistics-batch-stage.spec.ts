import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GeometryStatisticsBatchStage from "../../../src/modules/geometry-statistics/GeometryStatisticsBatchStage.vue";

describe("GeometryStatisticsBatchStage", () => {
  it("turns M28 into a ruler conversion stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M28", parameters: { meters: 3, centimeters: 40 } } });
    expect(wrapper.get('[data-upgrade-stage="scene"]').attributes("data-module-id")).toBe("M28");
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("3米40厘米=340厘米");
    await wrapper.get('[data-action="zoom-ruler"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("尺带");
  });

  it("turns M29 into a tiling area stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M29", parameters: { rows: 4, cols: 6 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("4×6=24");
    await wrapper.get('[data-action="tile-area"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("铺砖");
  });

  it("turns M30 into a draggable rectangle area stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M30", parameters: { length: 8, width: 5 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("8×5=40");
    await wrapper.get('[data-action="drag-size"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("行列");
  });

  it("turns M32 into a transparent-grid estimate stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M32", parameters: { fullCells: 20, halfCells: 6 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("20+6÷2=23");
    await wrapper.get('[data-action="count-grid"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("半格");
  });

  it("turns M33 into a boundary tracing stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M33", parameters: { shape: "凹形" } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("边界一周=周长");
    await wrapper.get('[data-action="trace-boundary"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("边界");
  });

  it("turns M34 into a fence perimeter stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M34", parameters: { length: 12, width: 7 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("(12+7)×2=38");
    await wrapper.get('[data-action="wrap-fence"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("四条边");
  });

  it("turns M35 into a same-rope area comparison stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M35", parameters: { perimeter: 24 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("24÷2=12");
    await wrapper.get('[data-action="reshape-rope"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("面积榜");
  });

  it("turns M36 into a mirror symmetry stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M36", parameters: { shape: "长方形" } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("长方形=2条对称轴");
    await wrapper.get('[data-action="mirror-shape"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("镜面");
  });

  it("turns M37 into a triangle classification stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M37", parameters: { angle: 90 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("90°=直角三角形");
    await wrapper.get('[data-action="classify-triangle"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("分类牌");
  });

  it("turns M38 into a bar-chart scale stage", async () => {
    const wrapper = mount(GeometryStatisticsBatchStage, { props: { moduleId: "M38", parameters: { scale: 5 } } });
    expect(wrapper.get("[data-geometry-formula]").text()).toContain("4格×5=20人");
    await wrapper.get('[data-action="raise-bars"]').trigger("click");
    expect(wrapper.get("[data-playful-feedback]").text()).toContain("刻度");
  });
});
