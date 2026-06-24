import { createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { describe, expect, it } from "vitest";
import LibraryView from "../../../src/views/LibraryView.vue";
import { useBlueprintStore } from "../../../src/app/stores/blueprint.store";

const archetypes = [
  { id: "M12", title: "火车过桥", layer: "拔高", difficulty: "提高", knowledgeIds: ["K01"], model: "路程模型", variants: [{ id: "M12-V1", title: "完整过桥" }] },
  { id: "M27", title: "分数应用", layer: "课内", difficulty: "基础", knowledgeIds: ["K02"], model: "分物模型", variants: [{ id: "M27-V1", title: "求部分" }] }
];

describe("LibraryView", () => {
  it("filters modules from the URL and marks image animations", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/learn", component: LibraryView }, { path: "/learn/:archetypeId/:variantId", component: { template: "<div />" } }]
    });
    await router.push("/learn?q=火车&image=1");
    await router.isReady();
    const pinia = createPinia();
    const blueprint = useBlueprintStore(pinia);
    blueprint.blueprint = { archetypes, knowledgeNodes: [{ id: "K01", name: "速度路程" }, { id: "K02", name: "分数" }] } as never;

    const wrapper = mount(LibraryView, { global: { plugins: [pinia, router] } });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("火车过桥");
    expect(wrapper.text()).not.toContain("分数应用");
    expect(wrapper.get('[data-module-id="M12"] [data-image-animation]').text()).toContain("图片动画");
    expect(wrapper.get('[data-module-id="M12"]').attributes("href")).toContain("M12-V1");
  });
});
