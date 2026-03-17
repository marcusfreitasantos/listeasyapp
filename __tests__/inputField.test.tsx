import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { InputField } from "@/src/components/inputField";

jest.mock("@expo/vector-icons/Feather", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ name, testID, onPress }: any) => (
    <View testID={testID ?? name} onTouchEnd={onPress} />
  );
});

describe("InputField", () => {
  it("shows the placeholder and icon", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <InputField
          iconName="user"
          placeholder="Name"
          value=""
          onChangeText={jest.fn()}
        />
      </ThemeProvider>,
    );

    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByTestId("user")).toBeTruthy();
  });

  it("toggles secure text entry when eye icon is pressed", () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <InputField
          iconName="lock"
          placeholder="Password"
          secureTextEntry
          value=""
          onChangeText={jest.fn()}
        />
      </ThemeProvider>,
    );

    expect(getByTestId("eye")).toBeTruthy();

    fireEvent.press(getByTestId("eye"));

    expect(queryByTestId("eye")).toBeNull();
    expect(getByTestId("eye-off")).toBeTruthy();
  });
});
