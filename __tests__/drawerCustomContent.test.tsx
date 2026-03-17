import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { DrawerCustomContent } from "@/src/components/drawerCustomContent";
import { GlobalUserContext } from "@/src/context/userContext";
import { FeatherIconName } from "@/@types/icons";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/src/utils/sendSupportEmail", () => {
  const sendSupportEmailMock = jest.fn();
  return {
    __esModule: true,
    sendSupportEmail: (...args: any[]) => sendSupportEmailMock(...args),
    __sendSupportEmailMock: sendSupportEmailMock,
  };
});

jest.mock("@/src/hooks/useLogoutCurrentUser", () => {
  const useLogoutCurrentUserMock = jest.fn();
  return {
    __esModule: true,
    useLogoutCurrentUser: () => useLogoutCurrentUserMock(),
    __useLogoutCurrentUserMock: useLogoutCurrentUserMock,
  };
});

jest.mock("@/src/components/loadingSpinner", () => {
  const { Text } = require("react-native");
  return {
    __esModule: true,
    LoadingSpinner: () => <Text>{"loading-spinner"}</Text>,
  };
});

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@/src/components/drawerItem", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return {
    __esModule: true,
    DrawerItem: ({ title, onPress }: any) => (
      <TouchableOpacity testID={`drawer-item-${title}`} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("DrawerCustomContent", () => {
  const defaultItems = [
    {
      route: "route1",
      title: "Item 1",
      iconName: "home" as FeatherIconName,
    },
  ];

  const {
    __useLogoutCurrentUserMock: useLogoutCurrentUserMock,
  } = require("@/src/hooks/useLogoutCurrentUser");

  beforeEach(() => {
    useLogoutCurrentUserMock.mockReturnValue({
      loading: false,
      handleLogoutUser: jest.fn(),
    });
  });

  it("renders loading spinner when loading", () => {
    useLogoutCurrentUserMock.mockReturnValue({
      loading: true,
      handleLogoutUser: jest.fn(),
    });

    const currentUser = {
      user: {
        isAnonymous: false,
        displayName: "Test",
        email: "test@example.com",
        photoURL: null,
      },
    } as any;

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser, setCurrentUser: jest.fn() }}
        >
          <DrawerCustomContent items={defaultItems} />
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    expect(getByText("loading-spinner")).toBeTruthy();
  });

  it("renders user info and items, and sends support email when help item pressed", () => {
    const currentUser = {
      user: {
        isAnonymous: false,
        displayName: "Test",
        email: "test@example.com",
        photoURL: null,
      },
    } as any;

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser, setCurrentUser: jest.fn() }}
        >
          <DrawerCustomContent items={defaultItems} />
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    // The mocked DrawerItem renders the title directly.
    expect(getByText("Item 1")).toBeTruthy();

    fireEvent.press(getByText("help"));

    const {
      __sendSupportEmailMock: sendSupportEmailMock,
    } = require("@/src/utils/sendSupportEmail");
    expect(sendSupportEmailMock).toHaveBeenCalled();
  });

  it("renders register button for anonymous users", () => {
    const replaceMock = require("expo-router").router.replace;

    const currentUser = {
      user: {
        isAnonymous: true,
        displayName: null,
        email: null,
        photoURL: null,
      },
    } as any;

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <GlobalUserContext.Provider
          value={{ currentUser, setCurrentUser: jest.fn() }}
        >
          <DrawerCustomContent items={defaultItems} />
        </GlobalUserContext.Provider>
      </ThemeProvider>,
    );

    const registerButton = getByText("register_for_free");
    fireEvent.press(registerButton);

    expect(replaceMock).toHaveBeenCalled();
  });
});
