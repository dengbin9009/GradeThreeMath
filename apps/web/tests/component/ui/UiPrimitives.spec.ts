import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconButton from "../../../src/components/ui/IconButton.vue";
import Tooltip from "../../../src/components/ui/Tooltip.vue";
import VisuallyHidden from "../../../src/components/ui/VisuallyHidden.vue";

describe("UI primitives", () => {
  it("renders accessible icon-only actions", async () => {
    const wrapper = mount(IconButton, {
      props: { label: "复位动画", pressed: true },
      slots: { default: "↺" }
    });

    expect(wrapper.get("button").attributes("aria-label")).toBe("复位动画");
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("true");
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("keeps tooltip copy and hidden text available to assistive tech", () => {
    const tooltip = mount(Tooltip, {
      props: { text: "拖动改变数量" },
      slots: { default: "<button>拖</button>" }
    });
    const hidden = mount(VisuallyHidden, { slots: { default: "只给读屏读到" } });

    expect(tooltip.get('[role="tooltip"]').text()).toBe("拖动改变数量");
    expect(hidden.text()).toBe("只给读屏读到");
  });
});
