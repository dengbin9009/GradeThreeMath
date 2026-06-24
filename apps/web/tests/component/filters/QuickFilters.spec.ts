import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import MoreFiltersPopover from "../../../src/components/filters/MoreFiltersPopover.vue";
import QuickFilters from "../../../src/components/filters/QuickFilters.vue";
import { useFilterStore } from "../../../src/app/stores/filter.store";

describe("quick filter controls", () => {
  it("toggles image animation and common difficulty filters", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(QuickFilters, { global: { plugins: [pinia] } });

    await wrapper.get('[data-quick-filter="image"]').trigger("click");
    await wrapper.get('[data-quick-filter="difficulty-基础"]').trigger("click");

    const filters = useFilterStore();
    expect(filters.imageOnly).toBe(true);
    expect(filters.difficulties).toEqual(["基础"]);
  });

  it("keeps extra filters in a named popover", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(MoreFiltersPopover, { global: { plugins: [pinia] } });

    await wrapper.get('[aria-expanded="false"]').trigger("click");
    expect(wrapper.get('[role="menu"]').text()).toContain("课内");
    await wrapper.get('input[value="拔高"]').setValue(true);
    expect(useFilterStore().layers).toEqual(["拔高"]);
  });
});
