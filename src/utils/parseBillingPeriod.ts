/**
 * Parses Google Play Billing period string (ISO 8601) into readable format.
 * Examples:
 *  - P1M → { interval: "month", count: 1 }
 *  - P3M → { interval: "month", count: 3 }
 *  - P1Y → { interval: "year", count: 1 }
 *  - P1W → { interval: "week", count: 1 }
 *  - P1D → { interval: "day", count: 1 }
 */
export const parseBillingPeriod = (period: string): string => {
  if (!period || !period.startsWith("P")) {
    return "unknown";
  }

  const match = period.match(/P(\d+)([YMWD])/);
  if (!match) {
    return "unknown";
  }

  const count = Number(match[1]);
  const code = match[2];

  const intervalMap: Record<string, string> = {
    Y: "year",
    M: "month",
    W: "week",
    D: "day",
  };

  return intervalMap[code] ?? "unknown";
};
