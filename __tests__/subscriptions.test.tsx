import React from "react";
import { render } from "@testing-library/react-native";
import Subscriptions from "@/app/(drawer)/subscriptions";

jest.mock("@/src/features/subscriptions/view/SubscriptionsView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    SubscriptionsView: () => <Text>MockSubscriptionsView</Text>,
  };
});

describe("Subscriptions screen", () => {
  it("renders SubscriptionsView correctly", () => {
    const { getByText } = render(<Subscriptions />);

    expect(getByText("MockSubscriptionsView")).toBeTruthy();
  });
});
