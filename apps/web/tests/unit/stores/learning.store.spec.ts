import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useLearningStore } from "../../../src/app/stores/learning.store";

describe("learning store", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("keeps navigation chrome separate from module state", () => {
    const store = useLearningStore();
    store.openCoach();
    store.setSessionSummary("M39", "M39-V1", 2);
    expect(store.coachOpen).toBe(true);
    expect(store.sessionSummary).toEqual({ archetypeId: "M39", variantId: "M39-V1", step: 2 });
    store.closeCoach();
    expect(store.sessionSummary?.step).toBe(2);
  });
});
