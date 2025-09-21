import React, { FC } from "react";
import PropertyItem, { PropertyReview } from "./PropertyItem";
import PropertyItemSkeleton from "./PropertyItemSkeleton";

interface Props {
  reviews?: PropertyReview[];
  isLoading: boolean;
}

const PropertyItemContainer: FC<Props> = ({ isLoading, reviews }) => {
  return (
    <section className="py-10 max-lg:justify-evenly gap-10py-10 flex flex-wrap justify-center items-center gap-10 gap-y-12">
      {isLoading && (
        <>
          <PropertyItemSkeleton />
          <PropertyItemSkeleton />
          <PropertyItemSkeleton />
        </>
      )}

      {reviews?.map((review) => (
        <PropertyItem key={review.id} {...review} />
      ))}
    </section>
  );
};

export default PropertyItemContainer;
