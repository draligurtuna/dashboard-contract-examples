import test from 'node:test';
import assert from 'node:assert/strict';
import { seriesIdentity } from './series-identity.mjs';
const base = {"provider":"ExampleFeed","symbol":"METAL:GC1!","kind":"continuous-future","timeframe":"1h","session":"provider-default","currency":"USD","volume":"contracts","revision":"demo-1","contract":"","policy":"unadjusted"};
const eq = (a,b)=>a.ok&&b.ok&&a.key===b.key;
const diff = (a,b)=>a.ok&&b.ok&&a.key!==b.key;
const tests = [
 ['Stable field ordering', ()=>eq(seriesIdentity(base),seriesIdentity(Object.fromEntries(Object.entries(base).reverse())))],
 ['Different provider is distinct', ()=>diff(seriesIdentity(base),seriesIdentity({...base,provider:'OtherFeed'}))],
 ['Different timeframe is distinct', ()=>diff(seriesIdentity(base),seriesIdentity({...base,timeframe:'4h'}))],
 ['Adjustment policy is distinct', ()=>diff(seriesIdentity(base),seriesIdentity({...base,policy:'adjusted'}))],
 ['Metadata revision is distinct', ()=>diff(seriesIdentity(base),seriesIdentity({...base,revision:'demo-2'}))],
 ['Symbol case is preserved', ()=>diff(seriesIdentity(base),seriesIdentity({...base,symbol:'metal:gc1!'}))],
 ['Unknown volume is blocked', ()=>!seriesIdentity({...base,volume:'unknown'}).ok],
 ['Missing provider is blocked', ()=>!seriesIdentity({...base,provider:''}).ok],
 ['Unknown continuous policy is blocked', ()=>!seriesIdentity({...base,policy:'unknown'}).ok],
 ['Missing dated contract is blocked', ()=>!seriesIdentity({...base,kind:'dated-future',contract:''}).ok],
 ['Different contract is distinct', ()=>diff(seriesIdentity({...base,kind:'dated-future',contract:'A'}),seriesIdentity({...base,kind:'dated-future',contract:'B'}))],
 ['Delimiters do not create a collision', ()=>diff(seriesIdentity({...base,provider:'x|y',symbol:'z'}),seriesIdentity({...base,provider:'x',symbol:'y|z'}))],
 ['Quotes are round-trippable', ()=>JSON.parse(seriesIdentity({...base,symbol:'X"Q'}).key)[1][1][1]==='X"Q'],
 ['Null request is blocked', ()=>!seriesIdentity(null).ok]
];
for (const [name, run] of tests) test(name, () => assert.equal(run(), true));
