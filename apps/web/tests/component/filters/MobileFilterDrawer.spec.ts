import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MobileFilterDrawer from "../../../src/components/filters/MobileFilterDrawer.vue";

describe("MobileFilterDrawer", () => {
  it("focuses its close button and restores the opener", async () => {
    const opener = document.createElement("button"); document.body.append(opener); opener.focus();
    const wrapper = mount(MobileFilterDrawer, { attachTo: document.body, props: { open: false }, slots: { default: "筛选内容" } });
    await wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    expect(document.activeElement).toBe(wrapper.get('[aria-label="关闭筛选"]').element);
    await wrapper.get('[aria-label="关闭筛选"]').trigger("click");
    await wrapper.setProps({ open: false });
    expect(document.activeElement).toBe(opener);
    wrapper.unmount(); opener.remove();
  });
});
