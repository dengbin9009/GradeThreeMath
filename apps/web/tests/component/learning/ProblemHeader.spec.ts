import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProblemHeader from "../../../src/components/learning/ProblemHeader.vue";

describe("ProblemHeader", () => {
  it("places the problem theme, prompt and known quantities first", () => {
    const wrapper = mount(ProblemHeader, {
      props: {
        archetype: { id: "M12", title: "火车过桥", layer: "拔高", difficulty: "提高", model: "完整过桥路程包含车长和桥长" },
        variant: { id: "M12-V1", title: "求总路程", parameters: { trainLength: 120, bridgeLength: 300 }, promptTemplate: "火车长 {trainLength} 米，桥长 {bridgeLength} 米。" }
      }
    });
    expect(wrapper.get("h1").text()).toContain("火车过桥");
    expect(wrapper.text()).toContain("火车长 120 米，桥长 300 米。");
    expect(wrapper.findAll("[data-known]")).toHaveLength(2);
  });
});
