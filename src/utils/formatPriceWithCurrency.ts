export const formatPriceWithCurrency = (amount: number, currency: string) => {
  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount / 100);
  return formatted.replace(/^(\D+)(?=\d)/, "$1\u00A0");
};
