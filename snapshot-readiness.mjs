// Educational contract, synthetic inputs; not a production trading engine.
export function assessSnapshot(plan, rows) {
  const waiting = reason => ({ state: 'WAIT', reason });
  const key = x => JSON.stringify([x.symbol, x.timeframe]);
  const validKey = x => x && typeof x.symbol === 'string' && x.symbol.trim()
    && typeof x.timeframe === 'string' && x.timeframe.trim();
  const validClose = x => Number.isSafeInteger(x) && x >= 0;
  if (!Array.isArray(plan) || !plan.length || !Array.isArray(rows)) {
    return waiting('INVALID_CONTRACT');
  }
  const expected = new Map();
  for (const slot of plan) {
    if (!validKey(slot) || !validClose(slot.expectedClose) || expected.has(key(slot))) {
      return waiting('INVALID_CONTRACT');
    }
    expected.set(key(slot), slot.expectedClose);
  }
  const observed = new Map();
  for (const row of rows) {
    if (!validKey(row)) return waiting('INVALID_ROW');
    const id = key(row);
    if (!expected.has(id)) continue; // unrelated data does not fill required slots
    if (observed.has(id)) return waiting('DUPLICATE_SLOT');
    observed.set(id, row);
  }
  const coverage = { present: observed.size, required: expected.size };
  if (observed.size !== expected.size) return { ...waiting('INCOMPLETE_COVERAGE'), coverage };
  for (const row of observed.values()) {
    if (row.confirmed !== true) return { ...waiting('UNCONFIRMED_SOURCE'), coverage };
  }
  for (const [id, row] of observed) {
    if (!validClose(row.closeTime)) return { ...waiting('INVALID_CLOSE_TIME'), coverage };
    if (row.closeTime !== expected.get(id)) {
      return { ...waiting('SNAPSHOT_MISMATCH'), coverage };
    }
  }
  return { state: 'REVIEW_READY', reason: 'CONTRACT_MET', coverage };
}
