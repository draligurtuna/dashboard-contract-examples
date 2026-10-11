// Synthetic educational comparison contract; no live data or unit conversion.
export function compareMetric(a, b) {
  const keys = [
    "metric", "unit", "currency", "interval", "session", "basisId"
  ];
  for (const x of [a, b]) {
    if (!x || typeof x.value !== "number" ||
        !Number.isFinite(x.value)) {
      return { state: "unavailable", reason: "invalid-number" };
    }
    if (keys.some(k => typeof x[k] !== "string" || !x[k].trim())) {
      return { state: "unavailable", reason: "missing-metadata" };
    }
    if (x.freshness !== "fresh") {
      return { state: "unavailable", reason: "freshness-not-established" };
    }
  }
  const different = keys.filter(k => a[k] !== b[k]);
  if (different.length) {
    return { state: "incomparable", fields: different };
  }
  const delta = a.value - b.value;
  return Number.isFinite(delta)
    ? { state: "comparable", delta }
    : { state: "unavailable", reason: "numeric-overflow" };
}
