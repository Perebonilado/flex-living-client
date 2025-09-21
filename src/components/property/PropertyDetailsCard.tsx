import { CalendarIcon, StarIcon, UserIcon } from "lucide-react";
import React, { FC } from "react";

export interface Props {
  rating: number;
  listingName: string;
  guestName: string;
  submittedAt: string;
  id: number;
  reviewCategory: { category: string; rating: number }[];
  type: string;
}

const PropertyDetailsCard: FC<Props> = ({
  rating,
  listingName,
  guestName,
  submittedAt,
  reviewCategory,
}) => {
  const formattedDate = new Date(submittedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white p-6 rounded-lg font-sans w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
          Review for: {listingName}
        </h2>
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <StarIcon />
          <span className="font-bold text-gray-800">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700 mb-4">
        <div className="flex items-center">
          <UserIcon />
          <span>{guestName}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon />
          <span>{formattedDate}</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {reviewCategory.map((item) => (
          <div key={item.category} className="flex justify-between items-center">
            <span className="text-gray-700">{item.category}</span>
            <span className="font-semibold text-gray-800">{item.rating.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetailsCard;