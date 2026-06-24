import { defineStore } from "pinia";
import type { LocationQuery, LocationQueryRaw } from "vue-router";

export interface FilterState {
  search: string;
  layers: string[];
  terms: string[];
  difficulties: string[];
  imageOnly: boolean;
}

export const emptyFilterState = (): FilterState => ({
  search: "",
  layers: [],
  terms: [],
  difficulties: [],
  imageOnly: false
});

const first = (value: LocationQuery[string]): string => Array.isArray(value) ? value[0] ?? "" : value ?? "";
const list = (value: LocationQuery[string]): string[] => first(value).split(",").map((item) => item.trim()).filter(Boolean);

export function parseFilterQuery(query: LocationQuery | Record<string, string>): FilterState {
  return {
    search: first(query.q ?? ""),
    layers: list(query.layer ?? ""),
    terms: list(query.term ?? ""),
    difficulties: list(query.difficulty ?? ""),
    imageOnly: first(query.image ?? "") === "1"
  };
}

export function serializeFilterQuery(state: FilterState): LocationQueryRaw {
  const query: Record<string, string> = {};
  if (state.search.trim()) query.q = state.search.trim();
  if (state.layers.length) query.layer = state.layers.join(",");
  if (state.terms.length) query.term = state.terms.join(",");
  if (state.difficulties.length) query.difficulty = state.difficulties.join(",");
  if (state.imageOnly) query.image = "1";
  return query;
}

export const useFilterStore = defineStore("filters", {
  state: emptyFilterState,
  actions: {
    replaceFromQuery(query: LocationQuery) {
      Object.assign(this, parseFilterQuery(query));
    },
    clear() {
      Object.assign(this, emptyFilterState());
    }
  }
});
