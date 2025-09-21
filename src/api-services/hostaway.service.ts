import { PropertyReview } from "@/components/properties/PropertyItem";
import { HostawayReviewDTO } from "@/dto/hostaway.dto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HostAwayService = createApi({
  reducerPath: "hostaway",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://flex-living-server-production.up.railway.app/api/v1/hostaway`,
  }),
  tagTypes: ['reviews'],
  endpoints: (build) => {
    return {
      getReviews: build.query<PropertyReview[], any>({
        query: () => ({
          url: "",
        }),
        providesTags: ['reviews'],
        transformResponse: (res: HostawayReviewDTO) => {
          if (!res) return <PropertyReview[]>[];
          return res.result.map((review) => {
            return {
              guestName: review.guestName,
              id: review.id,
              listingName: review.listingName,
              rating: review.rating ?? 0,
              submittedAt: review.submittedAt,
              reviewCategory: review.reviewCategory,
              type: review.type,
              review: review.publicReview
            };
          });
        },
      })
    };
  },
});

export const { useGetReviewsQuery } = HostAwayService;
