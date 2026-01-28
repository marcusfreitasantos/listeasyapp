import React from "react";
import { render } from "@testing-library/react-native";
import SharedLists from "@/app/(drawer)/sharedLists";

jest.mock("@/src/features/sharedLists/view/SharedListsView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    SharedListsView: () => <Text>MockSharedListsView</Text>,
  };
});

describe("Shared Lists screen", () => {
  it("renders SharedListsView correctly", () => {
    const { getByText } = render(<SharedLists />);

    expect(getByText("MockSharedListsView")).toBeTruthy();
  });
});
