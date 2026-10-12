import test from 'node:test';
import assert from 'node:assert/strict';
import { captureObservation } from './observation-record.mjs';
const fixture = () => ({id:'synthetic-01',label:'Fixture reading',sourceUrl:'https://example.org/resource',notes:'Illustrative observation',observedAtMs:1000});

test('capture returns a separate flat record', () => {
  const input=fixture(),record=captureObservation(input);
  assert.notEqual(record,input);
  assert.deepEqual(record,input);
});
test('later input edits cannot rewrite captured primitive values', () => {
  const input=fixture(),record=captureObservation(input);
  input.notes='Later edit';input.observedAtMs=2000;
  assert.equal(record.notes,'Illustrative observation');
  assert.equal(record.observedAtMs,1000);
});
test('frozen output rejects direct edits in module strict mode', () => {
  const record=captureObservation(fixture());
  assert.ok(Object.isFrozen(record));
  assert.throws(()=>{record.notes='Rewrite';},TypeError);
});
test('unselected extra fields are excluded from output', () => {
  const record=captureObservation({...fixture(),privateDraft:'not for publication',nested:{x:1}});
  assert.equal(Object.hasOwn(record,'privateDraft'),false);
  assert.equal(Object.hasOwn(record,'nested'),false);
});
test('text field failures reject rather than stringify objects', () => {
  for(const field of ['id','label','sourceUrl','notes']) {
    assert.throws(()=>captureObservation({...fixture(),[field]:'   '}),TypeError);
    assert.throws(()=>captureObservation({...fixture(),[field]:{value:'text'}}),TypeError);
  }
});
test('unsafe source schemes and embedded credentials reject', () => {
  for(const sourceUrl of ['http://example.org','javascript:alert(1)','https://user:secret@example.org'])
    assert.throws(()=>captureObservation({...fixture(),sourceUrl}),TypeError);
});
test('time stays explicit, with zero valid and invalid numbers rejected', () => {
  assert.equal(captureObservation({...fixture(),observedAtMs:0}).observedAtMs,0);
  for(const observedAtMs of [-1,1.5,NaN,Infinity,'1000',8640000000000001])
    assert.throws(()=>captureObservation({...fixture(),observedAtMs}),TypeError);
});
test('capture preserves input and normalizes only the source URL', () => {
  const input=Object.freeze({...fixture(),sourceUrl:'https://example.org',notes:'  Keep exact wording  '});
  const record=captureObservation(input);
  assert.equal(input.sourceUrl,'https://example.org');
  assert.equal(record.sourceUrl,'https://example.org/');
  assert.equal(record.notes,'  Keep exact wording  ');
  assert.throws(()=>captureObservation(null),TypeError);
  assert.throws(()=>captureObservation([]),TypeError);
});

