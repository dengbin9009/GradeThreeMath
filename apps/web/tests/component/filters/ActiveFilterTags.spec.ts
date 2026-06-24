import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import ActiveFilterTags from "../../../src/components/filters/ActiveFilterTags.vue";
import { useFilterStore } from "../../../src/app/stores/filter.store";

describe("ActiveFilterTags", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("removes one filter or clears all filters", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const filters = useFilterStore();
    filters.layers = ["拔高"];
    filters.imageOnly = true;
    const wrapper = mount(ActiveFilterTags, { global: { plugins: [pinia] } });
    await wrapper.get('[data-filter-value="拔高"]').trigger("click");
    expect(filters.layers).toEqual([]);
    expect(wrapper.text()).toContain("图片动画");
    await wrapper.get('[data-action="clear-filters"]').trigger("click");
    expect(filters.imageOnly).toBe(false);
  });
});
