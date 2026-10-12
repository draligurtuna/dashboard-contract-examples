import assert from 'node:assert/strict';
import { assessSnapshot } from './snapshot-readiness.mjs';
import { writeFileSync } from 'node:fs';

// Synthetic plan. A real producer must establish exchange/session close slots.
const daily = Date.parse('2026-10-11T00:00:00Z');
const fourHour = Date.parse('2026-10-11T20:00:00Z');
const plan = ['VENUE:A', 'VENUE:B'].flatMap(symbol => [
  { symbol, timeframe: 'D', expectedClose: daily },
  { symbol, timeframe: '4H', expectedClose: fourHour }
]);
const ready = plan.map(p => ({ symbol: p.symbol, timeframe: p.timeframe,
  closeTime: p.expectedClose, confirmed: true }));
const cases = [
  ['different D/4H closes can satisfy one explicit plan', () =>
    assert.equal(assessSnapshot(plan, ready).state, 'REVIEW_READY')],
  ['full coverage is insufficient when one close mismatches', () => {
    const rows = structuredClone(ready); rows[3].closeTime -= 4 * 3600000;
    const r = assessSnapshot(plan, rows);
    assert.equal(r.reason, 'SNAPSHOT_MISMATCH');
    assert.deepEqual(r.coverage, { present: 4, required: 4 });
  }],
  ['unconfirmed source remains waiting', () => {
    const rows = structuredClone(ready); rows[0].confirmed = false;
    assert.equal(assessSnapshot(plan, rows).reason, 'UNCONFIRMED_SOURCE');
  }],
  ['truthy string is not confirmed', () => {
    const rows = structuredClone(ready); rows[0].confirmed = 'true';
    assert.equal(assessSnapshot(plan, rows).reason, 'UNCONFIRMED_SOURCE');
  }],
  ['missing timeframe slot preserves coverage wait', () =>
    assert.equal(assessSnapshot(plan, ready.slice(1)).reason, 'INCOMPLETE_COVERAGE')],
  ['duplicate slot cannot inflate coverage', () =>
    assert.equal(assessSnapshot(plan, [ready[0], ...ready]).reason, 'DUPLICATE_SLOT')],
  ['unrelated symbol does not replace missing slot', () => {
    const rows = ready.slice(1); rows.push({ ...ready[0], symbol: 'VENUE:C' });
    assert.equal(assessSnapshot(plan, rows).reason, 'INCOMPLETE_COVERAGE');
  }],
  ['empty plan never becomes ready', () =>
    assert.equal(assessSnapshot([], []).reason, 'INVALID_CONTRACT')],
  ['duplicate expected slot is invalid', () =>
    assert.equal(assessSnapshot([...plan, plan[0]], ready).reason, 'INVALID_CONTRACT')],
  ['NaN close fails explicitly', () => {
    const rows = structuredClone(ready); rows[0].closeTime = NaN;
    assert.equal(assessSnapshot(plan, rows).reason, 'INVALID_CLOSE_TIME');
  }],
  ['invalid expected close rejects contract', () => {
    const bad = structuredClone(plan); bad[0].expectedClose = Infinity;
    assert.equal(assessSnapshot(bad, ready).reason, 'INVALID_CONTRACT');
  }],
  ['null row fails explicitly', () =>
    assert.equal(assessSnapshot(plan, [null]).reason, 'INVALID_ROW')],
  ['input arrays are not mutated', () => {
    const before = JSON.stringify({ plan, ready }); assessSnapshot(plan, ready);
    assert.equal(JSON.stringify({ plan, ready }), before);
  }]
];
const results = cases.map(([name, test]) => { test(); return { name, passed: true }; });
writeFileSync(new URL('./test-results.json', import.meta.url), JSON.stringify({
  testedAt: new Date().toISOString(), passed: results.length, total: cases.length,
  scope: 'Local illustrative contract tests only; no production script or feed validation.', results
}, null, 2));
console.log(`${results.length}/${cases.length} contract tests passed`);
