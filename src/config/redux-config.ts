import { HostAwayService } from "@/api-services/hostaway.service";
import { userReviewReducer } from "@/features/UserReviewsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const reduxStore = configureStore({
  reducer: {
    [HostAwayService.reducerPath]: HostAwayService.reducer,
    userReviewState: userReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([HostAwayService.middleware]),
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
