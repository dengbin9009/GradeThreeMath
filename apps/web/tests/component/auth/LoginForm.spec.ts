import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LoginForm from "../../../src/components/auth/LoginForm.vue";

describe("LoginForm", () => {
  it("submits username and password with accessible labels", async () => {
    const wrapper = mount(LoginForm);
    await wrapper.get('input[name="username"]').setValue("student01");
    await wrapper.get('input[name="password"]').setValue("four-word-temporary-passphrase");
    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")?.[0]).toEqual([{ username: "student01", password: "four-word-temporary-passphrase" }]);
    expect(wrapper.get('label[for="login-username"]').text()).toContain("登录名");
  });

  it("shows a generic error without exposing account state", () => {
    const wrapper = mount(LoginForm, { props: { error: "登录名、密码或账号状态不可用。" } });
    expect(wrapper.get('[role="alert"]').text()).toBe("登录名、密码或账号状态不可用。");
  });
});
