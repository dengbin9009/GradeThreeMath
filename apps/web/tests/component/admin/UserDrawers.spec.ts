import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CreateUserDrawer from "../../../src/components/admin/CreateUserDrawer.vue";
import EditValidityDrawer from "../../../src/components/admin/EditValidityDrawer.vue";

describe("admin user drawers", () => {
  it("collects a new user's login and validity", async () => {
    const wrapper = mount(CreateUserDrawer, { props: { open: true } });
    await wrapper.get('[name="username"]').setValue("student02");
    await wrapper.get('[name="displayName"]').setValue("小华");
    await wrapper.get('[name="temporaryPassword"]').setValue("four-word-temporary-passphrase");
    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")?.[0]?.[0]).toMatchObject({ username: "student02", displayName: "小华" });
  });

  it("submits suspension and version with a validity update", async () => {
    const wrapper = mount(EditValidityDrawer, {
      props: { open: true, user: { id: "u1", username: "student01", displayName: "小明", role: "user", isActive: true, validFrom: "2026-06-01T00:00:00.000Z", validUntil: null, mustChangePassword: false, version: 3 } }
    });
    await wrapper.get('[name="isActive"]').setValue(false);
    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")?.[0]?.[0]).toMatchObject({ id: "u1", isActive: false, version: 3 });
  });
});
