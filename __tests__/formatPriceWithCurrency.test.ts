import { formatPriceWithCurrency } from "../src/utils/formatPriceWithCurrency";

describe("formatPriceWithCurrency", () => {
  it("should format price with USD currency", () => {
    const result = formatPriceWithCurrency(1000, "USD");
    expect(result).toBe("US$" + "\u00A0\u00A0" + "10,00");
  });

  it("should format price with EUR currency", () => {
    const result = formatPriceWithCurrency(1000, "EUR");
    expect(result).toBe("€" + "\u00A0\u00A0" + "10,00");
  });

  it("should format price with BRL currency", () => {
    const result = formatPriceWithCurrency(1000, "BRL");
    expect(result).toBe("R$" + "\u00A0\u00A0" + "10,00");
  });

  it("should handle null currency by defaulting to BRL", () => {
    const result = formatPriceWithCurrency(1000, null);
    expect(result).toBe("R$" + "\u00A0\u00A0" + "10,00");
  });

  it("should handle undefined currency by defaulting to BRL", () => {
    const result = formatPriceWithCurrency(1000, undefined);
    expect(result).toBe("R$" + "\u00A0\u00A0" + "10,00");
  });

  it("should handle invalid currency by falling back to BRL", () => {
    const result = formatPriceWithCurrency(1000, "INVALID");
    expect(result).toBe("R$" + "\u00A0\u00A0" + "10,00");
  });

  it("should format decimal amounts correctly", () => {
    const result = formatPriceWithCurrency(1050, "USD");
    expect(result).toBe("US$" + "\u00A0\u00A0" + "10,50");
  });

  it("should handle zero amount", () => {
    const result = formatPriceWithCurrency(0, "USD");
    expect(result).toBe("US$" + "\u00A0\u00A0" + "0,00");
  });
});
