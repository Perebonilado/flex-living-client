import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserReviewState {
  reviewIdsToShowReviews: number[];
}

export const userReviewInitialState: UserReviewState = {
  reviewIdsToShowReviews: [],
};

export const userReviewSlice = createSlice({
  name: "user_reviews",
  initialState: userReviewInitialState,
  reducers: {
    addReviewToShow: (state, action: PayloadAction<number>) => {
      state.reviewIdsToShowReviews = [
        ...state.reviewIdsToShowReviews,
        action.payload,
      ];
    },
    removeReviewToShow: (state, action: PayloadAction<number>) => {
      state.reviewIdsToShowReviews = state.reviewIdsToShowReviews.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addReviewToShow, removeReviewToShow } = userReviewSlice.actions;

export const userReviewReducer = userReviewSlice.reducer;
