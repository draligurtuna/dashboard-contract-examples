export function nextReview(items, lastId = null, excluded = new Set()) {
  if (!Array.isArray(items) || !(excluded instanceof Set))
    throw new TypeError('items must be an array and excluded must be a Set');
  if (lastId !== null && (typeof lastId !== 'string' || !lastId.trim()))
    throw new TypeError('lastId must be null or a nonempty string');
  const seen = new Set();
  for (const item of items) {
    if (!item || typeof item.id !== 'string' || !item.id.trim() ||
        typeof item.eligible !== 'boolean' || seen.has(item.id))
      throw new TypeError('Each item needs a unique nonempty id and boolean eligible');
    seen.add(item.id);
  }
  if (!items.length) return null;
  const previous = items.findIndex(item => item.id === lastId);
  const start = previous < 0 ? 0 : (previous + 1) % items.length;
  for (let offset = 0; offset < items.length; offset++) {
    const item = items[(start + offset) % items.length];
    if (item.eligible && !excluded.has(item.id))
      return { item, cursorAfterVisit: item.id };
  }
  return null;
}

