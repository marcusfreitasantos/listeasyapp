import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { LoadingSpinner } from "@/src/components/loadingSpinner";

describe("LoadingSpinner", () => {
  it("renders ActivityIndicator with theme primary color", () => {
    const { toJSON } = render(
      <ThemeProvider theme={darkTheme}>
        <LoadingSpinner />
      </ThemeProvider>,
    );

    const tree = toJSON() as any;
    expect(tree.props.color).toBe(darkTheme.primaryColor);
  });
});
