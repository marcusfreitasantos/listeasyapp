import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { ListEmpty } from "@/src/components/listEmpty";

describe("ListEmpty", () => {
  it("renders title and optional text", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <ListEmpty title="No items" text="Add something to get started" />
      </ThemeProvider>,
    );

    expect(getByText("No items")).toBeTruthy();
    expect(getByText("Add something to get started")).toBeTruthy();
  });

  it("renders only title when text is not provided", () => {
    const { queryByText } = render(
      <ThemeProvider theme={darkTheme}>
        <ListEmpty title="No items" />
      </ThemeProvider>,
    );

    expect(queryByText("No items")).toBeTruthy();
    expect(queryByText("Add something to get started")).toBeNull();
  });
});
