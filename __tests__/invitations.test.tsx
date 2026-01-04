import React from "react";
import { render } from "@testing-library/react-native";
import Invitations from "@/app/(drawer)/invitations";

jest.mock("@/src/features/invitation/view/InvitationsView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    InvitationsView: () => <Text>MockInvitationsView</Text>,
  };
});

describe("Invitations screen", () => {
  it("renders InvitationsView correctly", () => {
    const { getByText } = render(<Invitations />);

    expect(getByText("MockInvitationsView")).toBeTruthy();
  });
});
