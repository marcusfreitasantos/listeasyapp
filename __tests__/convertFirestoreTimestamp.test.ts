import { getFormattedDate } from "../src/utils/convertFirestoreTimestamp";

describe("getFormattedDate", () => {
  it("should return empty string for null timestamp", () => {
    expect(getFormattedDate(null, "en")).toBe("");
  });

  it("should return empty string for undefined timestamp", () => {
    expect(getFormattedDate(undefined, "en")).toBe("");
  });

  it("should format Firestore timestamp correctly", () => {
    const mockTimestamp = {
      toDate: () => new Date("2023-10-01T12:30:00"),
    };
    const result = getFormattedDate(mockTimestamp, "en-US");
    expect(result).toBe("October 01, 2023 at 12:30 PM");
  });

  it("should format Date object correctly", () => {
    const date = new Date("2023-10-01T12:30:00");
    const result = getFormattedDate(date, "en-US");
    expect(result).toBe("October 01, 2023 at 12:30 PM");
  });

  it("should handle different languages", () => {
    const date = new Date("2023-10-01T12:30:00");
    const result = getFormattedDate(date, "pt-BR");
    expect(result).toContain("1 de outubro de 2023");
  });
});
