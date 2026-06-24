import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createBlueprintRepository } from "../../src/content/blueprint.repository";
import { validateBlueprint } from "../../src/content/blueprint.schema";

const source = JSON.parse(
  readFileSync(new URL("../../../../data/grade3-math-blueprint.json", import.meta.url), "utf8")
);

describe("blueprint repository", () => {
  it("validates the complete content baseline", () => {
    const result = validateBlueprint(source);
    expect(result.knowledgeNodes).toHaveLength(38);
    expect(result.archetypes).toHaveLength(39);
    expect(result.archetypes.flatMap((item) => item.variants)).toHaveLength(117);
  });

  it("indexes K and M identifiers without broken references", () => {
    const repository = createBlueprintRepository(source);
    expect(repository.getKnowledge("K12").name).toBe("火车过桥与隧道");
    expect(repository.getArchetype("M12").knowledgeIds).toContain("K12");
    expect(repository.getArchetypesForKnowledge("K12").map((item) => item.id)).toEqual(["M12"]);
  });

  it("searches identifiers and Chinese teaching terms", () => {
    const repository = createBlueprintRepository(source);
    expect(repository.search("M20").map((item) => item.id)).toContain("M20");
    expect(repository.search("鸡兔").map((item) => item.id)).toContain("M20");
    expect(repository.search("抬腿").map((item) => item.id)).toContain("M20");
  });

  it("fails explicitly for unknown identifiers", () => {
    const repository = createBlueprintRepository(source);
    expect(() => repository.getKnowledge("K99")).toThrow(/K99/);
    expect(() => repository.getArchetype("M99")).toThrow(/M99/);
  });

  it("rejects fractional parameters and broken references", () => {
    const fractional = structuredClone(source);
    fractional.archetypes[0].variants[0].parameters.a = 1.5;
    expect(() => validateBlueprint(fractional)).toThrow(/integer/i);

    const broken = structuredClone(source);
    broken.archetypes[0].knowledgeIds = ["K99"];
    expect(() => validateBlueprint(broken)).toThrow(/K99/);
  });
});
