export function captureObservation(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    throw new TypeError('A trusted flat input object is required');
  const { id, label, sourceUrl, notes, observedAtMs } = input;
  for (const value of [id, label, sourceUrl, notes]) {
    if (typeof value !== 'string' || !value.trim())
      throw new TypeError('Text fields must be nonempty strings');
  }
  const url = new URL(sourceUrl);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new TypeError('Use HTTPS source links without credentials');
  if (!Number.isSafeInteger(observedAtMs) || observedAtMs < 0 || observedAtMs > 8640000000000000)
    throw new TypeError('A nonnegative representable epoch-millisecond value is required');
  return Object.freeze({ id, label, sourceUrl: url.href, notes, observedAtMs });
}

