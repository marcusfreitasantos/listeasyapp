export const formatPriceWithCurrency = (
  amount: number,
  currency?: string | null,
) => {
  try {
    const formatted = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "BRL",
    }).format(amount / 100);
    return formatted.replace(/^(\D+)(?=\d)/, "$1\u00A0");
  } catch (error) {
    // Fallback to BRL if currency is invalid
    const formatted = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100);
    return formatted.replace(/^(\D+)(?=\d)/, "$1\u00A0");
  }
};
