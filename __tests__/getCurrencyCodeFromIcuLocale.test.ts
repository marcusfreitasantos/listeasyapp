import { getCurrencyCodeFromIcuLocale } from "../src/utils/getCurrencyCodeFromIcuLocale";

describe("getCurrencyCodeFromIcuLocale", () => {
  it("should extract currency code from icuLocale strings", () => {
    expect(getCurrencyCodeFromIcuLocale("en_US@currency=USD")).toBe("USD");
    expect(getCurrencyCodeFromIcuLocale("pt_BR@currency=BRL")).toBe("BRL");
  });

  it("should return null when no currency is present", () => {
    expect(getCurrencyCodeFromIcuLocale("en_US")).toBeNull();
    expect(getCurrencyCodeFromIcuLocale(undefined)).toBeNull();
  });
});
