import React from "react";
import { render } from "@testing-library/react-native";
import Lists from "@/app/(drawer)/lists";

jest.mock("@/src/features/listsManager/view/ListsView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    ListsView: () => <Text>MockListsView</Text>,
  };
});

describe("Lists screen", () => {
  it("renders ListsView correctly", () => {
    const { getByText } = render(<Lists />);

    expect(getByText("MockListsView")).toBeTruthy();
  });
});
