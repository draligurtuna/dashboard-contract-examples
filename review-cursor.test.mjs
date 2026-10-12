import test from 'node:test';
import assert from 'node:assert/strict';
import { nextReview } from './review-cursor.mjs';
const items = ['a', 'b', 'c'].map(id => ({ id, eligible: true }));
test('first visit starts at the first eligible item', () => {
  assert.equal(nextReview(items).item.id, 'a');
});
test('cursor follows identity after a reorder', () => {
  assert.equal(nextReview([items[2], items[0], items[1]], 'a').item.id, 'b');
});
test('last item wraps once to the first', () => {
  assert.equal(nextReview(items, 'c').item.id, 'a');
});
test('eligibility and temporary exclusion are separate', () => {
  const input = [{ id: 'a', eligible: false }, items[1], items[2]];
  assert.equal(nextReview(input, null, new Set(['b'])).item.id, 'c');
});
test('no candidate does not manufacture a result', () => {
  assert.equal(nextReview([]), null);
  assert.equal(nextReview(items, null, new Set(['a','b','c'])), null);
});
test('a removed cursor uses the documented first-item fallback', () => {
  assert.equal(nextReview(items, 'removed').item.id, 'a');
});
test('invalid or duplicated identities fail explicitly', () => {
  assert.throws(() => nextReview([items[0], items[0]]), TypeError);
  assert.throws(() => nextReview([{ id: '', eligible: true }]), TypeError);
  assert.throws(() => nextReview([{ id: 'a', eligible: 'yes' }]), TypeError);
  assert.throws(() => nextReview({}, null), TypeError);
  assert.throws(() => nextReview(items, 2), TypeError);
  assert.throws(() => nextReview(items, null, []), TypeError);
});
test('selection does not mutate items, exclusions or completion state', () => {
  const input = Object.freeze(items.map(x => Object.freeze({ ...x })));
  const excluded = new Set(['b']);
  const result = nextReview(input, 'a', excluded);
  assert.equal(result.cursorAfterVisit, 'c');
  assert.deepEqual([...excluded], ['b']);
  assert.deepEqual(input, items);
  assert.equal(Object.hasOwn(result.item, 'completed'), false);
});

