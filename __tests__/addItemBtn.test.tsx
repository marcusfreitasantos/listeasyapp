import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { AddItemBtn } from "@/src/components/addItemBtn";

jest.mock("@expo/vector-icons/Feather", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ name, testID }: any) => <View testID={testID} name={name} />;
});

describe("AddItemBtn", () => {
  it("renders the button", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <AddItemBtn modalIsOpen={false} onPress={jest.fn()} />
      </ThemeProvider>
    );

    expect(getByTestId("add_item_btn")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <AddItemBtn modalIsOpen={false} onPress={onPressMock} />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId("add_item_btn"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("shows plus icon when modal is closed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <AddItemBtn modalIsOpen={false} onPress={jest.fn()} />
      </ThemeProvider>
    );

    expect(getByTestId("add_item_icon").props.name).toBe("plus-circle");
  });

  it("shows x icon when modal is open", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={darkTheme}>
        <AddItemBtn modalIsOpen={true} onPress={jest.fn()} />
      </ThemeProvider>
    );

    expect(getByTestId("add_item_icon").props.name).toBe("x");
  });
});
