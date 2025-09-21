interface HostawayReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReviewDTO {
  status: string;
  result: HostawayReview[];
}
