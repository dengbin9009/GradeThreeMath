import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UserActionsMenu from "../../../src/components/admin/UserActionsMenu.vue";

const user = { id: "u1", username: "student01", displayName: "小明", role: "user" as const, isActive: true, validFrom: "2026-06-01T00:00:00.000Z", validUntil: null, mustChangePassword: false, version: 2 };

describe("UserActionsMenu", () => {
  it("offers password reset and session revocation without exposing a password", async () => {
    const wrapper = mount(UserActionsMenu, { props: { user } });
    await wrapper.get('button[aria-label="更多用户操作"]').trigger("click");
    expect(wrapper.text()).toContain("重置临时密码");
    await wrapper.get('[data-action="revoke"]').trigger("click");
    expect(wrapper.emitted("revoke")?.[0]).toEqual([user]);
  });
});
