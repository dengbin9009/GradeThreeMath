import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import KnowledgeSidebar from "../../../src/components/filters/KnowledgeSidebar.vue";
import { useBlueprintStore } from "../../../src/app/stores/blueprint.store";
import { useFilterStore } from "../../../src/app/stores/filter.store";

describe("KnowledgeSidebar", () => {
  it("combines layer, difficulty, knowledge and image filters then clears them", async () => {
    const pinia = createPinia(); setActivePinia(pinia);
    useBlueprintStore().blueprint = { archetypes: [], knowledgeNodes: [{ id: "K20", name: "鸡兔同笼" }] } as never;
    const wrapper = mount(KnowledgeSidebar, { props: { open: true }, global: { plugins: [pinia] } });
    await wrapper.get('input[value="课内"]').setValue(true);
    await wrapper.get('input[value="基础"]').setValue(true);
    await wrapper.get('input[value="K20"]').setValue(true);
    await wrapper.get('input[data-image-only]').setValue(true);
    expect(useFilterStore().$state).toMatchObject({ layers: ["课内"], difficulties: ["基础"], terms: ["K20"], imageOnly: true });
    await wrapper.get('[data-action="clear-sidebar"]').trigger("click");
    expect(useFilterStore().terms).toEqual([]);
  });
});
