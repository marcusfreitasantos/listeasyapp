import React from "react";
import { render } from "@testing-library/react-native";
import ResetPassword from "@/app/resetPassword";

jest.mock("@/src/features/auth/view/ResetPasswordView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    ResetPasswordView: () => <Text>MockResetPasswordView</Text>,
  };
});

describe("ResetPassword screen", () => {
  it("renders ResetPasswordView correctly", () => {
    const { getByText } = render(<ResetPassword />);

    expect(getByText("MockResetPasswordView")).toBeTruthy();
  });
});
