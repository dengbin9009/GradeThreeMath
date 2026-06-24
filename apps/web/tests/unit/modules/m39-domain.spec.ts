import { describe, expect, it } from "vitest";
import { buildBorrowReturnReplay } from "../../../src/modules/m39/m39.domain";

describe("M39 domain", () => {
  it("builds integer scene counts while reversing return then borrow", () => {
    const replay = buildBorrowReturnReplay({ borrowed: 22.4, returned: 11.6, remaining: 13.2 });
    expect(replay.map((scene) => scene.shelf)).toEqual([13, 1, 23, 13]);
    expect(replay[2]).toMatchObject({ borrowedBasket: 22, returnedBasket: 12 });
    expect(replay.flatMap((scene) => Object.values(scene)).every(Number.isInteger)).toBe(true);
  });
});
