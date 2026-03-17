import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { Header } from "@/src/components/header";
import { GlobalUserContext } from "@/src/context/userContext";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("expo-router", () => {
  const dispatchMock = jest.fn();
  return {
    __esModule: true,
    useNavigation: () => ({
      dispatch: dispatchMock,
    }),
    __dispatchMock: dispatchMock,
  };
});

jest.mock("@react-navigation/native", () => ({
  DrawerActions: {
    openDrawer: () => ({ type: "OPEN_DRAWER" }),
  },
}));

jest.mock("react-native-google-mobile-ads", () => ({
  BannerAd: ({ testID }: any) => <>{testID ? <>{testID}</> : null}</>,
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: "banner" },
  TestIds: { ADAPTIVE_BANNER: "test" },
  useForeground: (cb: () => void) => cb(),
}));

describe("Header", () => {
  const defaultUser = {
    user: {
      isAnonymous: false,
      displayName: "Test User",
      email: "test@example.com",
      photoURL: null,
    },
  } as any;

  const listContextValue = {
    listsLength: 3,
    setListsLength: jest.fn(),
    currentList: null,
    setCurrentList: jest.fn(),
    currentUserLists: [],
    setCurrentUserLists: jest.fn(),
  } as any;

  const subscriptionContextValue = {
    currentSubscription: null,
    setCurrentSubscription: jest.fn(),
  } as any;

  it("renders user info and list counter", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser: defaultUser, setCurrentUser: jest.fn() }}
        >
          <GlobalListContext.Provider value={listContextValue}>
            <GlobalSubscriptionContext.Provider
              value={subscriptionContextValue}
            >
              <Header />
            </GlobalSubscriptionContext.Provider>
          </GlobalListContext.Provider>
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    expect(getByText(/my_lists/)).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
  });

  it("opens the drawer when the user avatar is pressed", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser: defaultUser, setCurrentUser: jest.fn() }}
        >
          <GlobalListContext.Provider value={listContextValue}>
            <GlobalSubscriptionContext.Provider
              value={subscriptionContextValue}
            >
              <Header />
            </GlobalSubscriptionContext.Provider>
          </GlobalListContext.Provider>
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    const { __dispatchMock } = require("expo-router");
    fireEvent.press(getByText("T"));
    expect(__dispatchMock).toHaveBeenCalledWith({ type: "OPEN_DRAWER" });
  });

  it("does not render the banner ad when subscription is active", () => {
    const activeSubscription = { status: "active" } as any;

    const { queryByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser: defaultUser, setCurrentUser: jest.fn() }}
        >
          <GlobalListContext.Provider value={listContextValue}>
            <GlobalSubscriptionContext.Provider
              value={{
                currentSubscription: activeSubscription,
                setCurrentSubscription: jest.fn(),
              }}
            >
              <Header />
            </GlobalSubscriptionContext.Provider>
          </GlobalListContext.Provider>
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    expect(queryByText("test")).toBeNull();
  });
});
