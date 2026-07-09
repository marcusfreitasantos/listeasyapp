import {
  getPurchaseDeduplicationKey,
  shouldProcessPurchase,
} from "../src/features/subscriptions/viewModel/purchaseDeduplication";

describe("purchase deduplication helpers", () => {
  it("should prefer purchase token when available", () => {
    const key = getPurchaseDeduplicationKey({
      purchaseToken: "token-123",
      id: "purchase-1",
      productId: "prod-1",
    });

    expect(key).toBe("token-123");
  });

  it("should block duplicate purchases while processing or already processed", () => {
    const processingPurchases = new Set(["token-123"]);
    const processedPurchases = new Set(["token-456"]);

    expect(
      shouldProcessPurchase(
        "token-123",
        processingPurchases,
        processedPurchases,
      ),
    ).toBe(false);
    expect(
      shouldProcessPurchase(
        "token-456",
        processingPurchases,
        processedPurchases,
      ),
    ).toBe(false);
    expect(
      shouldProcessPurchase(
        "token-789",
        processingPurchases,
        processedPurchases,
      ),
    ).toBe(true);
  });
});
