export type Operator = "between" | "equals" | "greater than" | "less than";

export type Categories =
  | "cleanliness"
  | "communication"
  | "respect_house_rules";

export type FilterLabels = "rating" | Categories | "channel" | "time";

export type SelectedValue = string | Date | null;

export interface AppliedFilterModel {
  label: FilterLabels;
  operator: Operator;
  selectedValues: [SelectedValue, SelectedValue] | [SelectedValue];
  id: string;
}
