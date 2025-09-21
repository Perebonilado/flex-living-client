import { useGetReviewsQuery } from "@/api-services/hostaway.service";
import Chart from "@/components/properties/Chart";
import PropertyFilter, {
  filterByOptions,
} from "@/components/properties/PropertyFilter";
import PropertyItemContainer from "@/components/properties/PropertyItemContainer";
import PropertySort from "@/components/properties/PropertySort";
import AppLayout from "@/layout/AppLayout";
import { generateUUID } from "@/lib/utils";
import { AppliedFilterModel, FilterLabels } from "@/models/FilterModel";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useFilteredReviews from "@/hooks/useFilteredReviews";
import { AppliedSortModel } from "@/models/SortModel";

const Home: NextPage = () => {
  const { data, isLoading } = useGetReviewsQuery("");

  const [appliedFilter, setAppliedFilters] = useState<AppliedFilterModel[]>([]);
  const [appliedSort, setAppliedSort] = useState<AppliedSortModel[]>([]);

  const { reviews } = useFilteredReviews(
    data || [],
    appliedFilter,
    appliedSort
  );

  const [availableFilterLabels, setAvailableFilterLabels] = useState<
    FilterLabels[]
  >([]);
  const [availableSorts, setAvailableSorts] = useState<FilterLabels[]>([]);

  useEffect(() => {
    const filtersAdded = appliedFilter.map((filter) => filter.label);
    const availableFilters = filterByOptions.filter(
      (f) => !filtersAdded.includes(f)
    );
    setAvailableFilterLabels(availableFilters);
  }, [JSON.stringify(appliedFilter)]);

  useEffect(() => {
    const addedSorts = appliedSort.map((sort) => sort.label);
    const availableSorts = filterByOptions.filter(
      (opt) => !addedSorts.includes(opt)
    );
    setAvailableSorts(availableSorts);
  }, [JSON.stringify(appliedSort)]);

  return (
    <AppLayout>
      {reviews && (
        <div className="mt-10">
          {data && (
            <Chart reviewData={reviews}>
              <PropertyFilter
                reviews={reviews}
                availableFilterLabels={availableFilterLabels}
                appliedFilters={appliedFilter}
                handleChangeSelectedOption={(filter) => {
                  setAppliedFilters((currentFilters) => {
                    return currentFilters.map((cf) => {
                      if (cf.id === filter.id) {
                        return filter;
                      }
                      return cf;
                    });
                  });
                }}
                addFilter={() => {
                  setAppliedFilters((filters) => {
                    return [
                      ...filters,
                      {
                        id: generateUUID(),
                        label: availableFilterLabels[0],
                        operator: "equals",
                        selectedValues: [null],
                      },
                    ];
                  });
                }}
                clearAll={() => {
                  setAppliedFilters(() => {
                    return [];
                  });
                }}
                handleDeleteFilter={(id) => {
                  setAppliedFilters((filters) => {
                    return filters.filter((f) => {
                      return f.id !== id;
                    });
                  });
                }}
              />
              <PropertySort
                addSort={() => {
                  setAppliedSort((sorts) => {
                    return [
                      ...sorts,
                      {
                        direction: "asc",
                        id: generateUUID(),
                        label: availableSorts[0],
                      },
                    ];
                  });
                }}
                appliedSort={appliedSort}
                availableSortLabels={availableSorts}
                clearAll={() => {
                  setAppliedSort([]);
                }}
                deleteSort={(id) => {
                  setAppliedSort((sorts) => {
                    return sorts.filter((sort) => {
                      return sort.id !== id;
                    });
                  });
                }}
                handleChangeSort={(sort) => {
                  setAppliedSort((sorts) => {
                    return sorts.map((s) => {
                      if (sort.id === s.id) {
                        return sort;
                      }
                      return s;
                    });
                  });
                }}
              />
            </Chart>
          )}
        </div>
      )}
      <PropertyItemContainer isLoading={isLoading} reviews={reviews} />
    </AppLayout>
  );
};

export default Home;
