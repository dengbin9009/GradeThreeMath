import { describe, expect, it } from "vitest";
import { useModuleSession } from "../../../src/modules/shared/useModuleSession";

describe("useModuleSession", () => {
  it("normalizes integer parameters and resets feedback, step and revision", () => {
    const session = useModuleSession({ amount: 3.7 }, (state) => ({ amount: Math.max(1, Math.round(Number(state.amount))) }));
    expect(session.parameters.amount).toBe(4);
    session.setParameter("amount", 7.8);
    expect(session.parameters.amount).toBe(8);
    session.step.value = 2;
    session.feedback.value = { state: "correct", message: "正确" };
    session.reset();
    expect(session.parameters.amount).toBe(4);
    expect(session.step.value).toBe(0);
    expect(session.feedback.value.state).toBe("idle");
    expect(session.revision.value).toBe(1);
  });
});
