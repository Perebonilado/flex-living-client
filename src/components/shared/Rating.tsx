import React from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface StarRatingProps {
  rating: number; 
  max?: number;   
  size?: number;  
}

const Rating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 20 }) => {

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" size={size} className="text-yellow-500" />
      ))}

      {hasHalfStar && (
        <StarHalf fill="currentColor" size={size} className="text-yellow-500" />
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
};

export default Rating;
