import React from "react";
import { render } from "@testing-library/react-native";
import SingleList from "@/app/(drawer)/lists/[id]";

jest.mock("@/src/features/listContent/view/SingleListView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    SingleListView: () => <Text>MockSingleListView</Text>,
  };
});

describe("Lists screen", () => {
  it("renders SingleListView correctly", () => {
    const { getByText } = render(<SingleList />);

    expect(getByText("MockSingleListView")).toBeTruthy();
  });
});
