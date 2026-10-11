import test from 'node:test';
import assert from 'node:assert/strict';
import { compareMetric } from './metric-contract.mjs';
const base = {value:100,metric:'turnover',unit:'quote-currency',currency:'USD',interval:'1h',session:'regular',basisId:'synthetic:quote-turnover-v1',freshness:'fresh'};
test('matching contract yields finite delta',()=>assert.deepEqual(compareMetric({...base,value:120},base),{state:'comparable',delta:20}));
for (const [field,value] of [['currency','EUR'],['unit','tick-events'],['basisId','other-method'],['interval','1d'],['session','extended']]) {
  test(field+' mismatch stays incomparable',()=>assert.deepEqual(compareMetric({...base,[field]:value},base),{state:'incomparable',fields:[field]}));
}
test('unknown freshness is unavailable',()=>assert.deepEqual(compareMetric({...base,freshness:'unknown'},base),{state:'unavailable',reason:'freshness-not-established'}));
test('missing metadata is unavailable',()=>assert.deepEqual(compareMetric({...base,basisId:''},base),{state:'unavailable',reason:'missing-metadata'}));
test('null is not numeric zero',()=>assert.deepEqual(compareMetric({...base,value:null},base),{state:'unavailable',reason:'invalid-number'}));
test('infinity is rejected',()=>assert.deepEqual(compareMetric({...base,value:Infinity},base),{state:'unavailable',reason:'invalid-number'}));
test('subtraction overflow is rejected',()=>assert.deepEqual(compareMetric({...base,value:Number.MAX_VALUE},{...base,value:-Number.MAX_VALUE}),{state:'unavailable',reason:'numeric-overflow'}));
