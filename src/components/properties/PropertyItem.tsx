import React, { FC } from "react";
import { Card } from "../ui/card";
import Rating from "../shared/Rating";
import Image from "next/image";
import { Clock } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/redux-config";
import {
  addReviewToShow,
  removeReviewToShow,
} from "@/features/UserReviewsSlice";

export interface PropertyReview {
  rating: number;
  listingName: string;
  guestName: string;
  submittedAt: string;
  id: number;
  reviewCategory: { category: string; rating: number }[];
  type: string;
  review: string;
}

const PropertyItem: FC<PropertyReview> = ({
  guestName,
  id,
  listingName,
  rating,
  submittedAt,
}) => {
  const dispatch = useDispatch();
  const { reviewIdsToShowReviews } = useSelector(
    (state: RootState) => state.userReviewState
  );
  return (
    <Card className="w-[360px] h-[430px] border-gray-300 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden py-0">
      <div className="h-[60%] relative group overflow-hidden">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
          <Image
            fill
            className="object-cover object-center"
            src="/houses/1.jpg"
            alt="property"
          />
        </div>
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-xl px-2 py-1 shadow-md">
          <Rating rating={rating} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24 pointer-events-none"></div>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {listingName}
        </h3>
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          <span className="line-clamp-1">
            {moment(submittedAt).format("MMMM D, YYYY h:mm A")}
          </span>
        </div>
        <p className="text-gray-600 text-sm">Guest - {guestName}</p>
        <Link href={`/property/${id}`}>
          <Button
            variant={"ghost"}
            className="mt-3 w-full cursor-pointer bg-amber-500 text-white rounded-xl py-2 font-medium hover:bg-amber-600 transition-colors duration-300"
          >
            View Details
          </Button>
        </Link>

        <Button
          variant={"ghost"}
          className="mt-1 w-full cursor-pointer border border-amber-500 text-amber-500 rounded-xl py-2 font-medium transition-colors duration-300"
          onClick={() => {
            if (reviewIdsToShowReviews.includes(id)) {
              dispatch(removeReviewToShow(id));
            } else {
              dispatch(addReviewToShow(id));
            }
          }}
        >
          {reviewIdsToShowReviews.includes(id)
            ? "Hide Reviews"
            : "Show Reviews"}
        </Button>
      </div>
    </Card>
  );
};

export default PropertyItem;
