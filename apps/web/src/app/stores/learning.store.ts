import { defineStore } from "pinia";

interface SessionSummary {
  archetypeId: string;
  variantId: string;
  step: number;
}

export const useLearningStore = defineStore("learning", {
  state: () => ({
    sidebarOpen: true,
    coachOpen: false,
    activeArchetypeId: "",
    activeVariantId: "",
    sessionSummary: null as SessionSummary | null
  }),
  actions: {
    openCoach() {
      this.coachOpen = true;
    },
    closeCoach() {
      this.coachOpen = false;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    setSessionSummary(archetypeId: string, variantId: string, step: number) {
      this.activeArchetypeId = archetypeId;
      this.activeVariantId = variantId;
      this.sessionSummary = { archetypeId, variantId, step };
    },
    selectVariant(archetypeId: string, variantId: string) {
      this.setSessionSummary(archetypeId, variantId, 0);
    },
    advanceStep(step: number) {
      if (!this.sessionSummary) return;
      this.sessionSummary = { ...this.sessionSummary, step };
    }
  }
});
