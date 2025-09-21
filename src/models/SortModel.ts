import { FilterLabels } from "./FilterModel";

export type SortDirection = "asc" | "desc";

export interface AppliedSortModel {
  label: FilterLabels;
  direction: SortDirection;
  id: string;
}
