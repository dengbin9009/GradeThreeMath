import { describe, expect, it } from "vitest";
import { parseFilterQuery, serializeFilterQuery } from "../../../src/app/stores/filter.store";

describe("filter query contract", () => {
  it("parses known multi-value filters and ignores unknown values", () => {
    expect(parseFilterQuery({ q: "鸡兔", layer: "课内,拔高", term: "三上", image: "1", ignored: "x" })).toEqual({
      search: "鸡兔",
      layers: ["课内", "拔高"],
      terms: ["三上"],
      difficulties: [],
      imageOnly: true
    });
  });

  it("serializes filters in a stable compact form", () => {
    expect(serializeFilterQuery({
      search: "M20",
      layers: ["拔高", "课内"],
      terms: [],
      difficulties: ["提高"],
      imageOnly: false
    })).toEqual({ q: "M20", layer: "拔高,课内", difficulty: "提高" });
  });
});
