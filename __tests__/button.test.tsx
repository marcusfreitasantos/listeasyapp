import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { Button } from "@/src/components/button";

describe("Button", () => {
  it("renders button text", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <Button btnText="Press me" onPress={jest.fn()} />
      </ThemeProvider>,
    );

    expect(getByText("Press me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <Button btnText="Press me" onPress={onPressMock} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText("Press me"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
