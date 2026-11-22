import { reaisToCents } from "@/src/utils/convertCurrency";
import { getCurrencyCodeFromIcuLocale } from "@/src/utils/getCurrencyCodeFromIcuLocale";
import { parseBillingPeriod } from "@/src/utils/parseBillingPeriod";
import { ProductEntity } from "./product";

type StoreSubscription = {
  id: string;
  displayName?: string | null;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  jsonRepresentationIOS?: string | null;
  subscriptionInfoIOS?: {
    subscriptionPeriod?: {
      unit?: string;
    };
  } | null;
  subscriptionOfferDetailsAndroid?: Array<{
    pricingPhases: {
      pricingPhaseList: Array<{
        billingPeriod: string;
      }>;
    };
  }>;
};

export const mapStoreSubscriptions = (
  subscriptions: StoreSubscription[],
): ProductEntity[] => {
  const products = subscriptions.map((subscription) => {
    const subscriptionData = {
      productId: subscription.id,
      name: subscription.displayName ?? subscription.title ?? "",
      description: subscription.description ?? "",
      amount: reaisToCents(Number(subscription.price)),
      currency: subscription.currency ?? "",
    };

    if (subscription.subscriptionOfferDetailsAndroid) {
      return {
        ...subscriptionData,
        interval: parseBillingPeriod(
          subscription.subscriptionOfferDetailsAndroid[0].pricingPhases
            .pricingPhaseList[0].billingPeriod,
        ),
      };
    }

    if (subscription.subscriptionInfoIOS) {
      const iosJson = JSON.parse(subscription.jsonRepresentationIOS ?? "{}");
      const currency = getCurrencyCodeFromIcuLocale(
        iosJson?.attributes?.icuLocale,
      );

      return {
        ...subscriptionData,
        currency: currency ?? subscriptionData.currency,
        interval: subscription.subscriptionInfoIOS.subscriptionPeriod?.unit ?? "",
      };
    }

    return {
      ...subscriptionData,
      interval: "",
    };
  });

  return products.sort((left, right) => right.amount - left.amount);
};
