import { useState, useEffect } from "react";
import moment from "moment";
import { isNumeric } from "@/lib/utils";
import { PropertyReview } from "@/components/properties/PropertyItem";
import { AppliedFilterModel } from "@/models/FilterModel";
import { AppliedSortModel } from "@/models/SortModel"; 

const useFilteredReviews = (
  data: PropertyReview[],
  appliedFilter: AppliedFilterModel[],
  appliedSort: AppliedSortModel[] 
) => {
  const [reviews, setReviews] = useState<PropertyReview[]>([]);

  useEffect(() => {
    let processedReviews = data || [];
    if (appliedFilter && appliedFilter.length > 0) {
      processedReviews = data.filter((review) => {
        return appliedFilter.every((fv) => {
          const value1 = fv.selectedValues[0];
          const value2 = fv.selectedValues[1];

          if (fv.operator === "between") {
            if (!value1 || !value2) return true;
            if (fv.label === "time") {
              const firstDate = moment(value1);
              const secondDate = moment(value2);
              const reviewDate = moment(review.submittedAt);
              if (!firstDate.isValid() || !secondDate.isValid()) return true;
              return reviewDate.isBetween(firstDate, secondDate);
            } else if (fv.label === "rating") {
              if (!isNumeric(value1) || !isNumeric(value2)) return false;
              return (
                review.rating >= Number(value1) && review.rating <= Number(value2)
              );
            } else {
              const category = review.reviewCategory.find(
                (c) => c.category === fv.label
              );
              if (!category || !isNumeric(value1) || !isNumeric(value2)) return false;
              return (
                category.rating >= Number(value1) &&
                category.rating <= Number(value2)
              );
            }
          }
          if (fv.operator === "equals") {
            if (!value1) return true;
            if (fv.label === "time") {
              const filterDate = moment(value1);
              const reviewDate = moment(review.submittedAt);
              if (!filterDate.isValid()) return true;
              return reviewDate.isSame(filterDate, "day");
            } else if (fv.label === "rating") {
              if (!isNumeric(value1)) return false;
              return review.rating === Number(value1);
            } else {
              const category = review.reviewCategory.find(
                (c) => c.category === fv.label
              );
              if (!category || !isNumeric(value1)) return false;
              return category.rating === Number(value1);
            }
          }
          if (fv.operator === "greater than") {
            if (!value1) return true;
            if (fv.label === "time") {
              const filterDate = moment(value1);
              const reviewDate = moment(review.submittedAt);
              if (!filterDate.isValid()) return true;
              return reviewDate.isAfter(filterDate);
            } else if (fv.label === "rating") {
              if (!isNumeric(value1)) return false;
              return review.rating > Number(value1);
            } else {
              const category = review.reviewCategory.find(
                (c) => c.category === fv.label
              );
              if (!category || !isNumeric(value1)) return false;
              return category.rating > Number(value1);
            }
          }
          if (fv.operator === "less than") {
            if (!value1) return true;
            if (fv.label === "time") {
              const filterDate = moment(value1);
              const reviewDate = moment(review.submittedAt);
              if (!filterDate.isValid()) return true;
              return reviewDate.isBefore(filterDate);
            } else if (fv.label === "rating") {
              if (!isNumeric(value1)) return false;
              return review.rating < Number(value1);
            } else {
              const category = review.reviewCategory.find(
                (c) => c.category === fv.label
              );
              if (!category || !isNumeric(value1)) return false;
              return category.rating < Number(value1);
            }
          }
          return true;
        });
      });
    }

    if (appliedSort && appliedSort.length > 0) {
      processedReviews = [...processedReviews].sort((a, b) => {
        for (const sort of appliedSort) {
          const { label, direction } = sort;
          
          const getValue = (review: PropertyReview, label: string) => {
            if (label === 'rating') return review.rating;
            if (label === 'time') return moment(review.submittedAt).valueOf(); 
            return review.reviewCategory.find(c => c.category === label)?.rating ?? -1; 
          };

          const valA = getValue(a, label);
          const valB = getValue(b, label);

          if (valA < valB) {
            return direction === 'asc' ? -1 : 1;
          }
          if (valA > valB) {
            return direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    setReviews(processedReviews);
  }, [data, JSON.stringify(appliedFilter), JSON.stringify(appliedSort)]); 

  return { reviews };
};

export default useFilteredReviews;