import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import SceneStage from "../../../src/modules/shared/scene/SceneStage.vue";
import SceneLayer from "../../../src/modules/shared/scene/SceneLayer.vue";
import MeasureOverlay from "../../../src/modules/shared/scene/MeasureOverlay.vue";
import PlayfulFeedbackBubble from "../../../src/modules/shared/scene/PlayfulFeedbackBubble.vue";
import { normalizeIntegerControlValue } from "../../../src/modules/shared/scene/integerControls";

describe("shared scene primitives", () => {
  it("renders a stable stage with layers and reduced motion state", () => {
    const wrapper = mount(SceneStage, {
      props: {
        moduleId: "M01",
        aspectRatio: "16 / 9",
        minHeights: { desktop: 480, tablet: 420, mobile: 320 },
        reducedMotion: true
      },
      slots: {
        default: '<div data-test-child="yes">舞台对象</div>'
      }
    });

    const stage = wrapper.get('[data-module-id="M01"]');
    expect(stage.attributes("data-upgrade-stage")).toBe("scene");
    expect(stage.attributes("data-reduced-motion-state")).toBe("reduced");
    expect(stage.attributes("style")).toContain("16 / 9");
    expect(stage.text()).toContain("舞台对象");
  });

  it("renders named scene layers with z-index hooks", () => {
    const wrapper = mount(SceneLayer, {
      props: { layerId: "actors", kind: "actors", zIndex: 20 },
      slots: { default: "<span>数字箱</span>" }
    });

    expect(wrapper.get("[data-stage-layer]").attributes("data-stage-layer")).toBe("actors");
    expect(wrapper.get("[data-stage-layer]").attributes("data-layer-kind")).toBe("actors");
    expect(wrapper.get("[data-stage-layer]").attributes("style")).toContain("z-index: 20");
    expect(wrapper.text()).toContain("数字箱");
  });

  it("renders computed labels and quantity lines", () => {
    const wrapper = mount(MeasureOverlay, {
      props: {
        labels: [
          { id: "distance", label: "总路程", value: "420 米", attachTo: "train" },
          { id: "formula", label: "关系式", value: "120 + 300 = 420" }
        ]
      }
    });

    expect(wrapper.findAll("[data-computed-label]")).toHaveLength(2);
    expect(wrapper.get('[data-computed-label="distance"]').text()).toContain("总路程");
    expect(wrapper.get('[data-computed-label="formula"]').text()).toContain("120 + 300 = 420");
  });

  it("shows playful feedback without blocking input and downgrades motion", () => {
    const wrapper = mount(PlayfulFeedbackBubble, {
      props: {
        feedbackId: "queue-again",
        message: "顺序错了，数字箱先回队尾。",
        targetObject: "number-box",
        motion: "bounce-once",
        durationMs: 1200,
        reducedMotion: true
      }
    });

    const feedback = wrapper.get('[data-feedback-id="queue-again"]');
    expect(feedback.attributes("data-feedback-motion")).toBe("highlight");
    expect(feedback.attributes("data-blocks-input")).toBe("false");
    expect(feedback.text()).toContain("回队尾");
  });

  it("emits dismiss after the requested duration", () => {
    vi.useFakeTimers();
    const wrapper = mount(PlayfulFeedbackBubble, {
      props: {
        feedbackId: "done",
        message: "这一步对齐了。",
        targetObject: "ruler",
        motion: "highlight",
        durationMs: 800
      }
    });

    vi.advanceTimersByTime(799);
    expect(wrapper.emitted("dismiss")).toBeUndefined();
    vi.advanceTimersByTime(1);
    expect(wrapper.emitted("dismiss")).toHaveLength(1);
    vi.useRealTimers();
  });
});

describe("integer controls", () => {
  it("normalizes values to bounded integers", () => {
    expect(normalizeIntegerControlValue(4.6, { min: 1, max: 8, step: 1 })).toBe(5);
    expect(normalizeIntegerControlValue(-20, { min: 1, max: 8, step: 1 })).toBe(1);
    expect(normalizeIntegerControlValue(25, { min: 1, max: 8, step: 1 })).toBe(8);
  });

  it("snaps to integer step increments from the minimum", () => {
    expect(normalizeIntegerControlValue(13, { min: 2, max: 20, step: 5 })).toBe(12);
    expect(normalizeIntegerControlValue(15, { min: 2, max: 20, step: 5 })).toBe(17);
  });
});
