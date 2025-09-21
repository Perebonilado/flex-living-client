import {
  AppliedFilterModel,
  FilterLabels,
  Operator,
} from "@/models/FilterModel";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { isNumeric } from "@/lib/utils";
import { TrashIcon } from "lucide-react";

interface Props extends AppliedFilterModel {
  uniqueValues: string[];
  validOperatorOptions: Operator[];
  availableFilterLabels: FilterLabels[];
  handleChangeFilter: (value: AppliedFilterModel) => void;
  handleDeleteFilter: (id: string) => void;
}

const filterByOptions: FilterLabels[] = [
  "channel",
  "rating",
  "time",
  "cleanliness",
  "communication",
  "respect_house_rules",
];

const operators: Operator[] = [
  "between",
  "equals",
  "greater than",
  "less than",
];

const PropertyFilterItem: FC<Props> = ({
  id,
  label,
  operator,
  selectedValues,
  uniqueValues,
  validOperatorOptions,
  availableFilterLabels,
  handleChangeFilter,
  handleDeleteFilter,
}) => {
  return (
    <div className="flex flex-col gap-4 py-3 border-b border-b-gray-300">
      <div className="flex items-center gap-4">
        <Select
          value={label}
          onValueChange={(value) => {
            handleChangeFilter({
              id,
              label: value as FilterLabels,
              operator: "equals",
              selectedValues: [null, null],
            });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-200">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>

          <SelectContent className="bg-white">
            <SelectGroup>
              {filterByOptions.map((opt, idx) => (
                <SelectItem
                  value={opt}
                  key={idx}
                  disabled={!availableFilterLabels.includes(opt)}
                >
                  {opt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={operator}
          onValueChange={(value) => {
            handleChangeFilter({
              id,
              label,
              operator: value as Operator,
              selectedValues: [null, null],
            });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-200">
            <SelectValue placeholder="Operator" />
          </SelectTrigger>

          <SelectContent className="bg-white">
            <SelectGroup>
              {validOperatorOptions.map((opt, idx) => (
                <SelectItem value={opt} key={idx}>
                  {opt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        {["equals"].includes(operator) && (
          <>
            <Select
              value={(selectedValues[0] as string) || ""}
              onValueChange={(value) => {
                handleChangeFilter({
                  id,
                  label,
                  operator,
                  selectedValues: [value],
                });
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-200">
                <SelectValue placeholder="Value" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {uniqueValues.map((opt, idx) => (
                    <SelectItem value={opt} key={idx}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}

        {["greater than", "less than"].includes(operator) && (
          <>
            {label === "time" ? (
              <DatePicker
                date={(selectedValues[0] as Date) ?? undefined}
                handleChangeDate={(date) => {
                  handleChangeFilter({
                    id,
                    label,
                    operator,
                    selectedValues: [date || null, null],
                  });
                }}
              />
            ) : (
              <Input
                type="number"
                placeholder="Value"
                value={(selectedValues[0] as string) || ""}
                onChange={(e) => {
                  if (e.target.value.trim() && isNumeric(e.target.value)) {
                    handleChangeFilter({
                      id,
                      label,
                      operator,
                      selectedValues: [e.target.value, null],
                    });
                  } else {
                    handleChangeFilter({
                      id,
                      label,
                      operator,
                      selectedValues: [null, ""],
                    });
                  }
                }}
              />
            )}
          </>
        )}

        {["between"].includes(operator) && (
          <div className="flex items-center gap-4">
            {label === "time" ? (
              <>
                <DatePicker
                  date={(selectedValues[0] as Date) ?? undefined}
                  handleChangeDate={(date) => {
                    handleChangeFilter({
                      id,
                      label,
                      operator,
                      selectedValues: [date || null, selectedValues[1] || null],
                    });
                  }}
                />
                <DatePicker
                  date={(selectedValues[1] as Date) ?? undefined}
                  handleChangeDate={(date) => {
                    handleChangeFilter({
                      id,
                      label,
                      operator,
                      selectedValues: [selectedValues[0] || null, date || null],
                    });
                  }}
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="Value"
                  value={(selectedValues[0] as string) || ""}
                  onChange={(e) => {
                    if (e.target.value.trim() && isNumeric(e.target.value)) {
                      handleChangeFilter({
                        id,
                        label,
                        operator,
                        selectedValues: [
                          e.target.value,
                          selectedValues[1] || null,
                        ],
                      });
                    } else {
                      handleChangeFilter({
                        id,
                        label,
                        operator,
                        selectedValues: [null, selectedValues[1] || null],
                      });
                    }
                  }}
                />
                <Input
                  placeholder="Value"
                  value={(selectedValues[1] as string) || ""}
                  onChange={(e) => {
                    if (e.target.value.trim() && isNumeric(e.target.value)) {
                      handleChangeFilter({
                        id,
                        label,
                        operator,
                        selectedValues: [
                          selectedValues[0] || null,
                          e.target.value,
                        ],
                      });
                    } else {
                      handleChangeFilter({
                        id,
                        label,
                        operator,
                        selectedValues: [selectedValues[0] || null, null],
                      });
                    }
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <TrashIcon
          className="cursor-pointer"
          onClick={() => {
            handleDeleteFilter(id);
          }}
          color="red"
        />
      </div>
    </div>
  );
};

export default PropertyFilterItem;
