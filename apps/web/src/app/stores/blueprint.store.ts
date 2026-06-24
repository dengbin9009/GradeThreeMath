import { defineStore } from "pinia";
import type { Grade3MathBlueprint } from "@math/shared";

export const useBlueprintStore = defineStore("blueprint", {
  state: () => ({ blueprint: null as Grade3MathBlueprint | null, loading: false, error: "" }),
  getters: {
    archetypes: (state) => state.blueprint?.archetypes ?? [],
    knowledgeNodes: (state) => state.blueprint?.knowledgeNodes ?? []
  },
  actions: {
    async load() {
      if (this.blueprint || this.loading) return;
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("/api/blueprint", { credentials: "include" });
        if (!response.ok) throw new Error(response.status === 401 ? "登录状态已失效。" : "学习内容暂时无法加载。");
        this.blueprint = await response.json() as Grade3MathBlueprint;
      } catch (caught) {
        this.error = caught instanceof Error ? caught.message : "学习内容暂时无法加载。";
      } finally { this.loading = false; }
    }
  }
});
