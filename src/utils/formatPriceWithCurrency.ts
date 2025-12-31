export const formatPriceWithCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount / 100);
};
