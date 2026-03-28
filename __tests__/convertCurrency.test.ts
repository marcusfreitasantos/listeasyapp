import { reaisToCents, centsToReais } from "../src/utils/convertCurrency";

describe("convertCurrency", () => {
  describe("reaisToCents", () => {
    it("should convert reais to cents correctly", () => {
      expect(reaisToCents(1)).toBe(100);
      expect(reaisToCents(0.5)).toBe(50);
      expect(reaisToCents(10.99)).toBe(1099);
    });

    it("should round correctly", () => {
      expect(reaisToCents(1.005)).toBe(100); // due to floating point, 1.005 * 100 ≈ 100.5, but rounds down
      expect(reaisToCents(1.006)).toBe(101); // rounds up
    });
  });

  describe("centsToReais", () => {
    it("should convert cents to reais correctly", () => {
      expect(centsToReais(100)).toBe(1);
      expect(centsToReais(50)).toBe(0.5);
      expect(centsToReais(1099)).toBe(10.99);
    });

    it("should handle fractional cents", () => {
      expect(centsToReais(1)).toBe(0.01);
      expect(centsToReais(0)).toBe(0);
    });
  });
});
