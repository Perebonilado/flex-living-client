import { useGetReviewsQuery } from "@/api-services/hostaway.service";
import { PropertyReview } from "@/components/properties/PropertyItem";
import PropertyDetailsCard from "@/components/property/PropertyDetailsCard";
import PropertyGalleryOverView from "@/components/property/PropertyGalleryOverView";
import ReviewCard from "@/components/property/ReviewCard";
import { Card } from "@/components/ui/card";
import { RootState } from "@/config/redux-config";
import AppLayout from "@/layout/AppLayout";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PropertyPage: NextPage = () => {
  const { data } = useGetReviewsQuery("");
  const params = useParams();
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [review, setReview] = useState<PropertyReview | null>(null);
  const { reviewIdsToShowReviews } = useSelector(
    (state: RootState) => state.userReviewState
  );

  useEffect(() => {
    if (params) {
      const id = params.id as unknown as number;
      setReviewId(id);
    }
  }, [params]);

  useEffect(() => {
    if (data && reviewId) {
      const currentReview = data.find((r) => r.id == reviewId);
      if (!!currentReview) {
        setReview(currentReview);
      }
    }
  }, [reviewId, data]);

  return (
    <AppLayout>
      <div>
        <PropertyGalleryOverView
          images={[
            "/houses/1.jpg",
            "/houses/2.jpg",
            "/houses/3.jpg",
            "/houses/1.jpg",
            "/houses/2.jpg",
            "/houses/3.jpg",
          ]}
        />
      </div>

      <div>{review && <PropertyDetailsCard {...review} />}</div>

      <div className="flex flex-col-reverse lg:flex-row items-start py-10 gap-10">
        <div className="flex-1 flex flex-col gap-10 lg:min-w-[60%]">
          <Card className="w-full bg-white shadow-2xl p-4 min-h-[250px]">
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              dolorum hic temporibus similique? Asperiores accusamus ea, quasi
              dolorum quis illum error? Fuga voluptate consectetur eveniet
              libero, illo sapiente neque voluptates!
            </p>
          </Card>
          <Card className="w-full bg-white shadow-2xl p-4 min-h-[250px]">
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              dolorum hic temporibus similique? Asperiores accusamus ea, quasi
              dolorum quis illum error? Fuga voluptate consectetur eveniet
              libero, illo sapiente neque voluptates!
            </p>
          </Card>
        </div>
        <div className="w-full lg:w-auto">
          {review && reviewId && reviewIdsToShowReviews.includes(Number(reviewId)) && (
            <ReviewCard
              name={review.guestName}
              review={review.review}
              rating={review.rating || 0}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default PropertyPage;
