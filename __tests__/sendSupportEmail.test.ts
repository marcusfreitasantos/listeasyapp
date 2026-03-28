import { sendSupportEmail } from "../src/utils/sendSupportEmail";
import { Linking, Alert } from "react-native";

jest.mock("react-native", () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));

const mockedLinking = Linking as jest.Mocked<typeof Linking>;
const mockedAlert = Alert as jest.Mocked<typeof Alert>;

describe("sendSupportEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open email when supported", async () => {
    mockedLinking.canOpenURL.mockResolvedValue(true);

    await sendSupportEmail("Test Subject", "Error message");

    expect(mockedLinking.canOpenURL).toHaveBeenCalledWith(
      "mailto:contato@mafreitas.com.br?subject=Test Subject",
    );
    expect(mockedLinking.openURL).toHaveBeenCalledWith(
      "mailto:contato@mafreitas.com.br?subject=Test Subject",
    );
    expect(mockedAlert.alert).not.toHaveBeenCalled();
  });

  it("should show alert when email not supported", async () => {
    mockedLinking.canOpenURL.mockResolvedValue(false);

    await sendSupportEmail("Test Subject", "Error message");

    expect(mockedLinking.canOpenURL).toHaveBeenCalledWith(
      "mailto:contato@mafreitas.com.br?subject=Test Subject",
    );
    expect(mockedLinking.openURL).not.toHaveBeenCalled();
    expect(mockedAlert.alert).toHaveBeenCalledWith("Error: Error message");
  });

  it("should show alert on openURL error", async () => {
    mockedLinking.canOpenURL.mockResolvedValue(true);
    mockedLinking.openURL.mockRejectedValue(new Error("Failed to open"));

    await sendSupportEmail("Test Subject", "Error message");

    expect(mockedLinking.openURL).toHaveBeenCalled();
    expect(mockedAlert.alert).toHaveBeenCalledWith("Error: Failed to open");
  });
});
