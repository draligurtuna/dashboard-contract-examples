import test from 'node:test';
import assert from 'node:assert/strict';
import { rankRows, toMillimetres } from './contracts.mjs';

const fixture = [
  { id: 'BINANCE:BTCUSDT', score: 81.4 },
  { id: 'BINANCE:ETHUSDT', score: 81.4 },
  { id: 'BINANCE:SOLUSDT', score: 81.49 },
  { id: 'BINANCE:AVAXUSDT', score: 72 }
];
const expected = ['BINANCE:SOLUSDT', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:AVAXUSDT'];
function permutations(xs) {
  if (xs.length === 0) return [[]];
  return xs.flatMap((x, i) => permutations(xs.filter((_, j) => j !== i)).map(tail => [x, ...tail]));
}

test('all 24 arrival orders produce the same ranking', () => {
  const orders = permutations(fixture);
  assert.equal(orders.length, 24);
  for (const rows of orders) assert.deepEqual(rankRows(rows).map(r => r.id), expected);
});
test('ranking preserves a frozen input array and frozen rows', () => {
  const rows = Object.freeze(fixture.map(r => Object.freeze({ ...r })));
  const ranked = rankRows(rows);
  assert.deepEqual(rows.map(r => r.id), fixture.map(r => r.id));
  assert.notEqual(ranked, rows);
  assert.equal(ranked[0], rows[2]);
});
test('empty ranking is a new empty array', () => {
  const rows = [];
  assert.deepEqual(rankRows(rows), []);
  assert.notEqual(rankRows(rows), rows);
});
test('finite score endpoints are valid', () => {
  assert.deepEqual(rankRows([{id:'A',score:0},{id:'B',score:100}]).map(r=>r.id), ['B','A']);
});
test('duplicate identity is rejected', () => {
  assert.throws(() => rankRows([{id:'A',score:1},{id:'A',score:2}]), /Duplicate/);
});
for (const [label, rows] of [
  ['non-array', null], ['missing row', [null]], ['empty identity', [{id:'',score:1}]],
  ['lowercase identity', [{id:'a',score:1}]], ['whitespace identity', [{id:'A B',score:1}]],
  ['numeric string score', [{id:'A',score:'1'}]], ['NaN score', [{id:'A',score:NaN}]],
  ['infinite score', [{id:'A',score:Infinity}]], ['negative score', [{id:'A',score:-1}]],
  ['excess score', [{id:'A',score:101}]]
]) test('ranking rejects ' + label, () => assert.throws(() => rankRows(rows), TypeError));

test('centimetres become millimetres with both unit pairs', () => {
  assert.deepEqual(toMillimetres(2.5,'cm'), {status:'READY',input:{value:2.5,unit:'cm'},value:25,unit:'mm'});
});
test('millimetres remain millimetres', () => assert.equal(toMillimetres(25,'mm').value,25));
test('zero is valid', () => assert.equal(toMillimetres(0,'cm').status,'READY'));
test('exact maximum is valid', () => assert.equal(toMillimetres(1000000,'cm').value,10000000));
for (const [label, value, unit, status] of [
  ['numeric string', '2.5', 'cm', 'INVALID_NUMBER'], ['NaN', NaN,'cm','INVALID_NUMBER'],
  ['infinity',Infinity,'cm','INVALID_NUMBER'], ['wrong unit',2.5,'m','INVALID_UNIT'],
  ['negative input',-1,'cm','OUT_OF_RANGE'], ['excess input',1000001,'cm','OUT_OF_RANGE']
]) test('conversion rejects ' + label, () => assert.equal(toMillimetres(value,unit).status,status));
test('validation order remains number, unit, range', () => {
  assert.equal(toMillimetres(NaN,'m').status,'INVALID_NUMBER');
  assert.equal(toMillimetres(-1,'m').status,'INVALID_UNIT');
});
