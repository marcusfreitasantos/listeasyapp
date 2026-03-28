import { parseBillingPeriod } from "../src/utils/parseBillingPeriod";

describe("parseBillingPeriod", () => {
  it("should return 'unknown' for null or empty string", () => {
    expect(parseBillingPeriod("")).toBe("unknown");
    expect(parseBillingPeriod(null as any)).toBe("unknown");
  });

  it("should return 'unknown' for invalid format", () => {
    expect(parseBillingPeriod("invalid")).toBe("unknown");
    expect(parseBillingPeriod("P")).toBe("unknown");
    expect(parseBillingPeriod("P1")).toBe("unknown");
  });

  it("should parse P1M to month", () => {
    expect(parseBillingPeriod("P1M")).toBe("month");
  });

  it("should parse P3M to month", () => {
    expect(parseBillingPeriod("P3M")).toBe("month");
  });

  it("should parse P1Y to year", () => {
    expect(parseBillingPeriod("P1Y")).toBe("year");
  });

  it("should parse P1W to week", () => {
    expect(parseBillingPeriod("P1W")).toBe("week");
  });

  it("should parse P1D to day", () => {
    expect(parseBillingPeriod("P1D")).toBe("day");
  });

  it("should handle multiple digits", () => {
    expect(parseBillingPeriod("P10M")).toBe("month");
  });

  it("should return 'unknown' for unsupported units", () => {
    expect(parseBillingPeriod("P1H")).toBe("unknown");
  });
});
