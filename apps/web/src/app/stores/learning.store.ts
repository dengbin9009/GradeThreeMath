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
      this.sessionSummary = { archetypeId, variantId, step };
    }
  }
});
