import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";

jest.mock("@expo/vector-icons/Feather", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ name, testID }: any) => <View testID={testID ?? name} />;
});

describe("CheckboxInputField", () => {
  it("renders the label when provided", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <CheckboxInputField
          isItemChecked={false}
          checkBoxLabel="My label"
          handleCheckItem={jest.fn()}
        />
      </ThemeProvider>,
    );

    expect(getByText("My label")).toBeTruthy();
  });

  it("renders the check icon when checked", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <CheckboxInputField isItemChecked={true} handleCheckItem={jest.fn()} />
      </ThemeProvider>,
    );

    expect(getByTestId("check")).toBeTruthy();
  });

  it("calls handleCheckItem with toggled value when pressed", () => {
    const handleCheckItem = jest.fn();

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <CheckboxInputField
          isItemChecked={false}
          checkBoxLabel="My label"
          handleCheckItem={handleCheckItem}
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByText("My label"));

    expect(handleCheckItem).toHaveBeenCalledTimes(1);
    expect(handleCheckItem).toHaveBeenCalledWith(true);
  });
});
