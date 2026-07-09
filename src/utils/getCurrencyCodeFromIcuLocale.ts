export const getCurrencyCodeFromIcuLocale = (
  icuLocale?: string | null,
): string | null => {
  if (!icuLocale) return null;

  const currencyMatch = icuLocale.match(/currency=([A-Z]{3})/i);

  return currencyMatch?.[1]?.toUpperCase() ?? null;
};
