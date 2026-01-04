import React from "react";
import { render } from "@testing-library/react-native";
import SignUp from "../app/signup";

jest.mock("@/src/features/auth/view/SignUpView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    SignUpView: () => <Text>MockSignUpView</Text>,
  };
});

describe("SignUp screen", () => {
  it("renders SignUpView correctly", () => {
    const { getByText } = render(<SignUp />);

    expect(getByText("MockSignUpView")).toBeTruthy();
  });
});
