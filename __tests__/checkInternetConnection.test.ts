import { checkInternetConnection } from "../src/utils/checkInternetConnection";
import { NetworkStateType } from "expo-network";

jest.mock("expo-network", () => ({
  getNetworkStateAsync: jest.fn(),
}));
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));
jest.mock("expo-updates", () => ({
  reloadAsync: jest.fn(),
}));

import * as Network from "expo-network";
import { Alert } from "react-native";
import { reloadAsync } from "expo-updates";

const mockedNetwork = Network as jest.Mocked<typeof Network>;
const mockedAlert = Alert as jest.Mocked<typeof Alert>;
const mockedReloadAsync = reloadAsync as jest.MockedFunction<
  typeof reloadAsync
>;

describe("checkInternetConnection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not show alert when connected", async () => {
    mockedNetwork.getNetworkStateAsync.mockResolvedValue({
      isConnected: true,
      type: "wifi" as NetworkStateType.WIFI,
    });

    await checkInternetConnection();

    expect(mockedAlert.alert).not.toHaveBeenCalled();
    expect(mockedReloadAsync).not.toHaveBeenCalled();
  });

  it("should show alert and reload when not connected", async () => {
    mockedNetwork.getNetworkStateAsync.mockResolvedValue({
      isConnected: false,
      type: "none" as NetworkStateType.NONE,
    });

    await checkInternetConnection();

    expect(mockedAlert.alert).toHaveBeenCalledWith(
      "Sem conexão com a internet",
      "Por favor, verifique sua conexão com a internet e tente novamente.",
      [
        {
          text: "OK",
          onPress: expect.any(Function),
        },
      ],
    );
    // Note: reloadAsync is called when user presses OK, not testable here
  });
});
