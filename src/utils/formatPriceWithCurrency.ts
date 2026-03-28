export const formatPriceWithCurrency = (
  amount: number,
  currency?: string | null,
) => {
  try {
    const formatted = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
    }).format(amount / 100);
    return formatted.replace(/^(\D+)(?=\d)/, "$1\u00A0");
  } catch (error) {
    // Fallback to USD if currency is invalid
    const formatted = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
    return formatted.replace(/^(\D+)(?=\d)/, "$1\u00A0");
  }
};
