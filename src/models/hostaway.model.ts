export interface HostawayReviewModel {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategoryModel[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface ReviewCategoryModel {
  category: string;
  rating: number;
}
