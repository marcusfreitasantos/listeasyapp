import React from "react";
import { Linking, Platform } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { ProductCard } from "@/src/features/subscriptions/components/productCard";
import {
  APPLE_STANDARD_EULA_URL,
  PRIVACY_POLICY_URL,
} from "@/src/features/subscriptions/model/legalLinks";

jest.mock("@expo/vector-icons/Feather", () => "Feather");

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        terms_of_use: "Terms of Use (EULA)",
        privacy_policy: "Privacy Policy",
        month: "month",
        current: "current",
        subscribe: "Subscribe",
        cancel: "Cancel",
        renew_every: "Renews automatically every month.",
        optional_subscription: "Optional subscription.",
        cancel_anytime: "Cancel anytime.",
        payment_through_platform: "Payment will be charged to your App Store account.",
        unknown_platform: "Unknown platform",
      })[key] ?? key,
  }),
}));

jest.mock("@/src/components/button", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Button: ({ btnText }: { btnText: string }) => <Text>{btnText}</Text>,
  };
});

const product = {
  productId: "essencial_mensal",
  name: "Plano Essencial Mensal",
  description: "Assinatura mensal",
  amount: 9.9,
  currency: "BRL",
  interval: "month",
};

describe("ProductCard legal links", () => {
  const openURL = jest
    .spyOn(Linking, "openURL")
    .mockResolvedValue(undefined as never);

  afterEach(() => {
    openURL.mockClear();
  });

  it("opens the Apple EULA and the privacy policy from the subscription offer", () => {
    Platform.OS = "ios";

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <ProductCard productData={product} handleSubscription={jest.fn()} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText("Terms of Use (EULA)"));
    fireEvent.press(getByText("Privacy Policy"));

    expect(openURL).toHaveBeenNthCalledWith(1, APPLE_STANDARD_EULA_URL);
    expect(openURL).toHaveBeenNthCalledWith(2, PRIVACY_POLICY_URL);
  });
});
