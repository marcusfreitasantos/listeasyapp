import * as StoreReview from "expo-store-review";

export const useReviewAppViewModel = () => {
  const handleStoreReview = async () => {
    if (await StoreReview.hasAction()) {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview();
      }
    }
  };

  return { handleStoreReview };
};
