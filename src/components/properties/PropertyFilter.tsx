import React, { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Funnel, PlusIcon } from "lucide-react";
import { PropertyReview } from "./PropertyItem";
import {
  AppliedFilterModel,
  FilterLabels,
  Operator,
} from "@/models/FilterModel";
import PropertyFilterItem from "./PropertyFilterItem";
import { getUniqueValues } from "@/lib/utils";

export interface Filter {
  value: string;
  category: string;
  id: string;
}

export type FilterOptions = "Rating" | "Category" | "Channel" | "Time";

interface Props {
  reviews: PropertyReview[];
  appliedFilters: AppliedFilterModel[];
  availableFilterLabels: FilterLabels[];
  handleChangeSelectedOption: (option: AppliedFilterModel) => void;
  addFilter: () => void;
  clearAll: () => void;
  handleDeleteFilter: (id: string) => void;
}

export const filterByOptions: FilterLabels[] = [
  "rating",
  "channel",
  "time",
  "cleanliness",
  "communication",
  "respect_house_rules",
];

const PropertyFilter: FC<Props> = ({
  handleChangeSelectedOption,
  addFilter,
  clearAll,
  handleDeleteFilter,
  appliedFilters,
  reviews,
  availableFilterLabels,
}) => {
  const getUniqueValuesByLabel = (label: FilterLabels) => {
    if (label === "rating") {
      return getUniqueValues(reviews.map((r) => r.rating.toString()));
    }

    if (label === "channel") {
      return getUniqueValues(reviews.map((r) => r.type));
    }

    if (label === "time") {
      return getUniqueValues(reviews.map((r) => r.submittedAt));
    }

    if (
      ["cleanliness", "communication", "respect_house_rules"].includes(label)
    ) {
      return getUniqueValues(
        reviews.flatMap((r) =>
          r.reviewCategory
            .filter((c) => c.category === label)
            .map((v) => v.rating.toString())
        )
      );
    }

    return [];
  };

  const getValidOperatorsByLabel = (label: FilterLabels): Operator[] => {
    if (label === "channel") return ["equals"];
    return ["equals", "between", "greater than", "less than"];
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Funnel className="w-4 h-4 text-amber-500" />
          <span className="font-medium">Filter</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[450px] p-6 rounded-xl shadow-xl border border-gray-100 bg-white">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Add filters to refine your view
        </h4>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {!appliedFilters.length ? (
              <p className="text-center text-gray-500 text-sm">
                -- Add filters --
              </p>
            ) : (
              <>
                {appliedFilters.map((filter) => {
                  return (
                    <PropertyFilterItem
                      {...filter}
                      availableFilterLabels={availableFilterLabels}
                      validOperatorOptions={getValidOperatorsByLabel(
                        filter.label
                      )}
                      uniqueValues={getUniqueValuesByLabel(filter.label)}
                      key={filter.id}
                      handleChangeFilter={(value) => {
                        handleChangeSelectedOption(value);
                      }}
                      handleDeleteFilter={(id) => {
                        handleDeleteFilter(id);
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          {
            <Button
              variant="ghost"
              disabled={availableFilterLabels.length === 0}
              className="flex items-center gap-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700 rounded-lg px-3 py-1.5"
              onClick={addFilter}
            >
              <PlusIcon className="w-4 h-4" /> Add filter
            </Button>
          }

          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg px-3 py-1.5"
            onClick={clearAll}
          >
            Clear all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PropertyFilter;
