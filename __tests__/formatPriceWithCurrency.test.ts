import { formatPriceWithCurrency } from "../src/utils/formatPriceWithCurrency";

const withCurrencySpace = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  })
    .format(amount / 100)
    .replace(/^(\D+)(?=\d)/, "$1\u00A0");

describe("formatPriceWithCurrency", () => {
  it("should format price with USD currency", () => {
    const result = formatPriceWithCurrency(1000, "USD");
    expect(result).toBe(withCurrencySpace(1000, "USD"));
    expect(result).toMatch(/10[.,]00/);
  });

  it("should format price with EUR currency", () => {
    expect(formatPriceWithCurrency(1000, "EUR")).toBe(
      withCurrencySpace(1000, "EUR"),
    );
  });

  it("should format price with BRL currency", () => {
    expect(formatPriceWithCurrency(1000, "BRL")).toBe(
      withCurrencySpace(1000, "BRL"),
    );
  });

  it("should handle null currency by defaulting to BRL", () => {
    expect(formatPriceWithCurrency(1000, null)).toBe(
      formatPriceWithCurrency(1000, "BRL"),
    );
  });

  it("should handle undefined currency by defaulting to BRL", () => {
    expect(formatPriceWithCurrency(1000, undefined)).toBe(
      formatPriceWithCurrency(1000, "BRL"),
    );
  });

  it("should handle invalid currency by falling back to BRL", () => {
    expect(formatPriceWithCurrency(1000, "INVALID")).toBe(
      formatPriceWithCurrency(1000, "BRL"),
    );
  });

  it("should format decimal amounts correctly", () => {
    const result = formatPriceWithCurrency(1050, "USD");
    expect(result).toBe(withCurrencySpace(1050, "USD"));
    expect(result).toMatch(/10[.,]50/);
  });

  it("should handle zero amount", () => {
    const result = formatPriceWithCurrency(0, "USD");
    expect(result).toBe(withCurrencySpace(0, "USD"));
    expect(result).toMatch(/0[.,]00/);
  });
});
