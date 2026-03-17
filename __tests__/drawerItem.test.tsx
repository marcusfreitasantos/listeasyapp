import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { DrawerItem } from "@/src/components/drawerItem";

jest.mock("@expo/vector-icons/Feather", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ name, testID }: any) => <View testID={testID ?? name} />;
});

jest.mock("expo-router", () => ({
  Link: ({ children }: any) => children,
}));

describe("DrawerItem", () => {
  it("renders title and icon", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <DrawerItem route="/test" title="My Item" iconName="home" />
      </ThemeProvider>,
    );

    expect(getByText("My Item")).toBeTruthy();
    expect(getByTestId("home")).toBeTruthy();
  });

  it("calls onPress when provided", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <DrawerItem
          route="/test"
          title="My Item"
          iconName="home"
          onPress={onPress}
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByText("My Item"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
