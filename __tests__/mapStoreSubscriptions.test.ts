import { mapStoreSubscriptions } from "../src/features/subscriptions/model/mapStoreSubscriptions";

describe("mapStoreSubscriptions", () => {
  it("maps an iOS subscription and reads the currency from the storefront locale", () => {
    const products = mapStoreSubscriptions([
      {
        id: "plan_essencial_monthly",
        displayName: "Plano Essencial Mensal",
        description: "Assinatura mensal",
        price: 9.9,
        currency: "USD",
        jsonRepresentationIOS: JSON.stringify({
          attributes: { icuLocale: "pt_BR@currency=BRL" },
        }),
        subscriptionInfoIOS: {
          subscriptionPeriod: { unit: "month" },
        },
      },
    ]);

    expect(products).toEqual([
      {
        productId: "plan_essencial_monthly",
        name: "Plano Essencial Mensal",
        description: "Assinatura mensal",
        amount: 990,
        currency: "BRL",
        interval: "month",
      },
    ]);
  });
});
