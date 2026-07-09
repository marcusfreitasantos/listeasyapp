type PurchaseLike = {
  purchaseToken?: string;
  id?: string;
  productId?: string;
};

export const getPurchaseDeduplicationKey = (purchase: PurchaseLike) => {
  if (purchase.purchaseToken) return purchase.purchaseToken;
  if (purchase.id) return purchase.id;
  return purchase.productId ?? "";
};

export const shouldProcessPurchase = (
  purchaseKey: string,
  processingPurchases: Set<string>,
  processedPurchases: Set<string>,
) => {
  if (!purchaseKey) return false;
  if (
    processingPurchases.has(purchaseKey) ||
    processedPurchases.has(purchaseKey)
  ) {
    return false;
  }

  return true;
};
