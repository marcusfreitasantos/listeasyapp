import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import Logo from "@/src/components/logo";

jest.mock("react-native-svg", () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}));

jest.mock("@/src/components/logo/lightModeLogo", () => {
  const { Text } = require("react-native");
  return {
    LightModeLogo: () => <Text>{"light"}</Text>,
  };
});

jest.mock("@/src/components/logo/darkModeLogo", () => {
  const { Text } = require("react-native");
  return {
    DarkModeLogo: () => <Text>{"dark"}</Text>,
  };
});

describe("Logo", () => {
  it("renders the light logo when color is light", () => {
    const { getByText } = render(<Logo color="light" />);
    expect(getByText("light")).toBeTruthy();
  });

  it("renders the dark logo when color is dark", () => {
    const { getByText } = render(<Logo color="dark" />);
    expect(getByText("dark")).toBeTruthy();
  });
});
