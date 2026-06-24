import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AdminUsersView from "../../../src/views/AdminUsersView.vue";

describe("AdminUsersView", () => {
  it("shows searchable user rows and a create action", async () => {
    const wrapper = mount(AdminUsersView, {
      props: {
        initialUsers: [{
          id: "usr_1", username: "student01", displayName: "小明", role: "user", isActive: true,
          validFrom: "2026-06-01T00:00:00.000Z", validUntil: null, mustChangePassword: false, version: 1
        }]
      }
    });
    expect(wrapper.text()).toContain("student01");
    expect(wrapper.get('button[aria-label="添加用户"]').attributes("aria-label")).toBe("添加用户");
    await wrapper.get('input[type="search"]').setValue("不存在");
    expect(wrapper.text()).toContain("没有匹配的用户");
  });
});
