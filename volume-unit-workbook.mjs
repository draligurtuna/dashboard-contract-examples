// Independent teaching example. Declared inputs are assumptions, not feed evidence.
export function interpretVolume(input) {
  const unavailable = reason => ({ status: 'UNAVAILABLE', reason });
  if (!input || typeof input !== 'object' || Array.isArray(input)) return unavailable('INVALID_RECORD');
  const { kind, volume, price, currency } = input;
  if (!['base', 'quote', 'contracts', 'ticks', 'unknown'].includes(kind)) return unavailable('UNKNOWN_KIND');
  if (kind === 'unknown') return unavailable('UNIT_UNVERIFIED');
  if (typeof volume !== 'number' || !Number.isFinite(volume) || volume < 0) return unavailable('INVALID_VOLUME');
  if (kind === 'contracts') return unavailable('CONTRACT_SPECIFICATION_REQUIRED');
  if (kind === 'ticks') {
    if (!Number.isSafeInteger(volume)) return unavailable('INVALID_TICK_COUNT');
    return { status: 'ACTIVITY_COUNT', value: volume, unit: 'ticks' };
  }
  if (typeof currency !== 'string' || !/^[A-Z]{3,8}$/.test(currency)) return unavailable('CURRENCY_UNVERIFIED');
  if (kind === 'base' && (typeof price !== 'number' || !Number.isFinite(price) || price <= 0)) return unavailable('INVALID_PRICE');
  const value = kind === 'base' ? volume * price : volume;
  if (!Number.isFinite(value)) return unavailable('NUMERIC_OVERFLOW');
  return { status: 'MONETARY_ESTIMATE', value, unit: currency, basis: kind === 'base' ? 'BASE_TIMES_PRICE_PROXY' : 'DECLARED_QUOTE_AMOUNT' };
}

export function compareThreshold(result, threshold, currency) {
  if (threshold === null) return { status: 'NOT_REQUESTED' };
  if (typeof threshold !== 'number' || !Number.isFinite(threshold) || threshold < 0) return { status: 'UNAVAILABLE', reason: 'INVALID_THRESHOLD' };
  if (!result || result.status !== 'MONETARY_ESTIMATE' || typeof result.value !== 'number' || !Number.isFinite(result.value) || result.value < 0) return { status: 'UNAVAILABLE', reason: 'NO_MONETARY_RESULT' };
  if (typeof currency !== 'string' || !/^[A-Z]{3,8}$/.test(currency)) return { status: 'UNAVAILABLE', reason: 'THRESHOLD_CURRENCY_UNVERIFIED' };
  if (currency !== result.unit) return { status: 'UNAVAILABLE', reason: 'CURRENCY_MISMATCH' };
  return { status: result.value < threshold ? 'BELOW_DECLARED_THRESHOLD' : 'AT_OR_ABOVE_DECLARED_THRESHOLD' };
}
