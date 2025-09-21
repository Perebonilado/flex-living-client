import React, { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PlusIcon, SortAsc, TrashIcon } from "lucide-react";
import { AppliedSortModel, SortDirection } from "@/models/SortModel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FilterLabels } from "@/models/FilterModel";
import { filterByOptions } from "./PropertyFilter";

interface Props {
  appliedSort: AppliedSortModel[];
  availableSortLabels: FilterLabels[];
  handleChangeSort: (sort: AppliedSortModel) => void;
  addSort: () => void;
  deleteSort: (id: string) => void;
  clearAll: () => void;
}

export const sortDirections: SortDirection[] = ["asc", "desc"];

const PropertySort: FC<Props> = ({
  addSort,
  appliedSort,
  availableSortLabels,
  clearAll,
  deleteSort,
  handleChangeSort,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <SortAsc className="w-4 h-4 text-amber-500" /> Sort
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[450px] p-6 rounded-xl shadow-xl border border-gray-100 bg-white">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Sort data</h4>

        <div className="flex flex-col gap-4">
          {!appliedSort.length ? (
            <p className="text-center text-gray-500 text-sm">
              -- Add sorting --
            </p>
          ) : (
            <>
              {appliedSort.map((sort) => {
                return (
                  <div className="flex items-center gap-4" key={sort.id}>
                    <Select
                      value={sort.label}
                      onValueChange={(value) => {
                        handleChangeSort({
                          ...sort,
                          label: value as FilterLabels,
                        });
                      }}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {filterByOptions.map((opt, idx) => (
                            <SelectItem
                              value={opt}
                              key={idx}
                              disabled={!availableSortLabels.includes(opt)}
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select
                      value={sort.direction}
                      onValueChange={(value) => {
                        handleChangeSort({
                          ...sort,
                          direction: value as SortDirection,
                        });
                      }}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-200">
                        <SelectValue placeholder="Sort Direction" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {sortDirections.map((opt, idx) => (
                            <SelectItem value={opt} key={idx}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end">
                      <TrashIcon
                        className="cursor-pointer"
                        onClick={() => {
                          deleteSort(sort.id);
                        }}
                        color="red"
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          {appliedSort.length == 0 && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700 rounded-lg px-3 py-1.5"
              onClick={addSort}
            >
              <PlusIcon className="w-4 h-4" /> Add Sort
            </Button>
          )}

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

export default PropertySort;
