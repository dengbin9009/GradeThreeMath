import { describe, expect, it } from "vitest";
import * as migrated from "../../src/domain/core";

describe("legacy domain compatibility", () => {
  it("keeps the migrated public mathematics functions available", () => {
    expect(Object.keys(migrated).sort()).toEqual(expect.arrayContaining([
      "buildPlaceValueToolModel",
      "calculateTrainBridge",
      "solveChickenRabbitFromAllChickens",
      "solveProfitLoss",
      "solveBorrowReturn"
    ]));
  });

  it("preserves reference results for the five animation baselines after legacy deletion", () => {
    expect(migrated.buildPlaceValueToolModel({ number: 3056, focus: "abacus" }).columns.map((place) => place.digit)).toEqual([3, 0, 5, 6]);
    expect(migrated.calculateTrainBridge({ trainLength: 120, bridgeLength: 480, speed: 60 })).toMatchObject({ totalDistance: 600, time: 10 });
    expect(migrated.solveChickenRabbitFromAllChickens({ heads: 35, legs: 94 })).toMatchObject({ chickens: 23, rabbits: 12 });
    expect(migrated.solveProfitLoss({ short: 12, left: 8, moreEach: 3, lessEach: 2 })).toMatchObject({ people: 4 });
    expect(migrated.solveBorrowReturn({ borrowed: 22, returned: 12, remaining: 13 })).toMatchObject({ original: 23 });
  });

  it("preserves integer results across representative domains", () => {
    const samples = [
      migrated.calculateSequentialOperations({ start: 96, operations: [["divide", 4], ["divide", 3]] }),
      migrated.calculateElapsedMinutes({ startHour: 9, startMinute: 45, endHour: 11, endMinute: 10 }),
      migrated.calculateRectangleArea({ length: 12, width: 8 }),
      migrated.readBarValue({ bars: 7, scale: 5 })
    ];
    expect(JSON.stringify(samples)).not.toMatch(/\.\d/);
  });
});
