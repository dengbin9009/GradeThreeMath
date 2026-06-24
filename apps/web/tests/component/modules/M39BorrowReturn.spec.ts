import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import M39BorrowReturn from "../../../src/modules/m39/M39BorrowReturn.vue";

describe("M39 borrow-return animation", () => {
  it("updates individual books in one coherent scene across reverse steps", async () => {
    const wrapper = mount(M39BorrowReturn, { props: { parameters: { borrowed: 22, returned: 12, remaining: 13 } } });
    expect(wrapper.findAll('[data-zone="shelf"] [data-book]')).toHaveLength(13);
    expect(wrapper.findAll('[data-zone="returned"] [data-book]')).toHaveLength(0);

    await wrapper.get('[data-step="undo-return"]').trigger("click");
    expect(wrapper.findAll('[data-zone="shelf"] [data-book]')).toHaveLength(1);
    expect(wrapper.findAll('[data-zone="returned"] [data-book]')).toHaveLength(12);

    await wrapper.get('[data-step="undo-borrow"]').trigger("click");
    expect(wrapper.findAll('[data-zone="shelf"] [data-book]')).toHaveLength(23);
    expect(wrapper.findAll('[data-zone="borrowed"] [data-book]')).toHaveLength(22);
    expect(wrapper.text()).toContain("13 - 12 + 22 = 23");
  });
});
