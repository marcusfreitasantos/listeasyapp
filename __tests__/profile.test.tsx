import React from "react";
import { render } from "@testing-library/react-native";
import Profile from "@/app/(drawer)/profile";

jest.mock("@/src/features/profile/view/ProfileView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    ProfileView: () => <Text>MockProfileView</Text>,
  };
});

describe("Profile screen", () => {
  it("renders ProfileView correctly", () => {
    const { getByText } = render(<Profile />);

    expect(getByText("MockProfileView")).toBeTruthy();
  });
});
