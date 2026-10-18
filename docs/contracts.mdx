---
title: Contract reference and failure boundaries
description: Understand the declared input, output, mutation and failure behavior of the existing dashboard-contract-examples JavaScript modules.
---

Treat a contract as an explicit boundary between an input you have and an output you are allowed to show. Each module is deliberately small. A caller still has to validate its source, choose an appropriate policy and render the returned state clearly.

The examples use synthetic data. Declaring metadata does not authenticate it, and a successful software check does not turn a number into a recommendation.

## Deterministic ranking

`rankRows(rows)` in `contracts.mjs` accepts an array of rows with a unique normalized `id` and a finite numeric `score` between 0 and 100 inclusive. The ID format permits uppercase ASCII letters, digits, colons, underscores, slashes and hyphens. Lowercase IDs are rejected; normalization belongs at a separate boundary.

The primary order is descending raw score. An exact tie is resolved by ascending ID. Display rounding is not an input to the comparator. The function returns a new array but retains the original row-object references: it is not a deep clone.

```js
import { rankRows } from './contracts.mjs';

rankRows([
  { id: 'BETA', score: 80 },
  { id: 'ALPHA', score: 80 }
]).map(row => row.id);
// ['ALPHA', 'BETA']
```

An empty array returns an empty array. An invalid row, duplicate ID or invalid score throws. The caller should clear an old result when the new input is rejected; otherwise a correct pure function can sit behind a misleading interface.

For the separate reader-facing domain context, see the owned [Crypto Setup Planner dashboard guide](https://www.agprolabs.com/insights/how-to-read-crypto-setup-planner-dashboard/). This repository's comparator is an independent example and does not simulate the product's ranking algorithm.

## Explicit length units

`toMillimetres(value, unit)` accepts a number and the declared unit `cm` or `mm`. A successful result retains the original input pair and identifies the output unit. Zero is valid. A numeric string, `NaN` or infinity produces `INVALID_NUMBER`; an unsupported unit produces `INVALID_UNIT`; a negative value or a value above 1,000,000 produces `OUT_OF_RANGE`.

```js
import { toMillimetres } from './contracts.mjs';

toMillimetres(12.5, 'cm');
// { status: 'READY', input: { value: 12.5, unit: 'cm' },
//   value: 125, unit: 'mm' }
```

The maximum is an illustrative application rule, not a physical or clinical standard. The function does not parse localized text. Keep browser parsing, calculation precision and display formatting as separate concerns.

The author's [calculator directory](https://www.aligurtuna.com/hesaplama-programlari/) is a reading context for considering inputs and units. This toy converter neither implements those medical formulas nor validates them.

## Comparable metrics

`compareMetric(a, b)` in `metric-contract.mjs` requires finite numeric values plus nonempty `metric`, `unit`, `currency`, `interval`, `session` and `basisId` fields. Both freshness declarations must be `fresh`.

Missing metadata or unestablished freshness produces `unavailable`. Valid records with different metadata produce `incomparable` and identify the mismatched fields. Only matching records produce a delta; even then subtraction overflow returns `unavailable`.

A trusted adapter must assign the methodology basis and freshness policy. Two untrusted payloads can claim the same strings without measuring the same thing. The function intentionally performs no currency conversion, unit inference or live-feed validation. The owned [relative volume versus liquidity guide](https://www.agprolabs.com/insights/relative-volume-vs-liquidity/) provides a useful domain-reading boundary: similar-looking numbers need not represent interchangeable quantities.

## Declared series identity

`series-identity.mjs` builds a structured identity from declared source attributes instead of using a display ticker alone. The identity includes provider, full symbol, instrument kind, timeframe, session, currency, volume semantics and metadata revision. Dated contracts require their contract identity; continuous histories require an explicit adjustment policy.

Missing or unknown required metadata blocks the key. Structured encoding avoids delimiter ambiguity but is not a cryptographic fingerprint, a provenance attestation or a complete provider schema. Preserve the distinction between a validated source adapter and the identity string that adapter constructs.

Try the [series identity lab](https://draligurtuna.github.io/dashboard-contract-examples/series-identity-lab.html), keeping the visible symbol while changing a declared provider or policy. The purpose is to inspect identity boundaries, not to download market data.

## Snapshot readiness

`assessSnapshot(plan, rows)` in `snapshot-readiness.mjs` first checks the expected symbol/timeframe slots and their expected close times. It then checks coverage, duplicate required slots, source confirmation and exact close-time alignment. Extra unrelated rows do not fill missing required slots.

`REVIEW_READY` means that this declared contract is met. `WAIT` is a reasoned state, including incomplete coverage, an unconfirmed source or a snapshot mismatch. It does not mean a clock-based scheduler or a live feed has been validated. The expected-close policy comes from the caller.

When adapting the [snapshot readiness lab](https://draligurtuna.github.io/dashboard-contract-examples/snapshot-readiness-lab.html), show the reason alongside the state. A yellow waiting message with a clear cause is more actionable than silently retaining a green result from an earlier snapshot. For source-time interpretation, read the separate owned [confirmed-candle guide](https://www.agprolabs.com/insights/confirmed-candles-repainting-tradingview/).

## Stable review selection

`nextReview(items, lastId, excluded)` in `review-cursor.mjs` requires unique nonempty IDs, boolean eligibility and a `Set` of exclusions. Starting after the previous ID, it wraps through the collection and returns the next eligible, unexcluded item. If the previous ID no longer exists, review starts at the beginning. With no eligible item it returns `null`.

The result includes the item and `cursorAfterVisit`. Advancing that cursor records a visit; it does not establish understanding or consent. The function does not persist progress, copy item objects or check whether an external document changed. See the [reading workflow](/reading-workflow) before treating a review queue as a learning record.

## Flat observation capture

`captureObservation(input)` in `observation-record.mjs` requires nonempty string fields for ID, label, source URL and notes, plus a representable nonnegative epoch-millisecond integer. Source URLs must use HTTPS without embedded username or password.

It returns a frozen flat record. Because the accepted text fields are strings, the output does not retain a nested caller-owned notes object. URL normalization is ordinary `URL` serialization; it is not canonical-page discovery, a safety scan, an availability request or tracking-parameter removal. A captured note can still contain an incorrect interpretation. Keep the observation and your inference distinguishable in the note itself.

## Availability and volume display

The additional display and volume exercises make a related point: a missing observation should not acquire the appearance of a measured zero, and an activity figure should carry its declared unit. Open the [metric display lab](https://draligurtuna.github.io/dashboard-contract-examples/metric-display-lab.html) and the [volume unit workbook](https://draligurtuna.github.io/dashboard-contract-examples/volume-unit-workbook.html) to inspect the existing synthetic cases.

Do not infer a volume unit from an attractive suffix or replace an unavailable quantity with a placeholder that sorts as a real measurement. The producer's contract, the consumer's accepted values and the interface's labels must agree.

## Verify the scope before adapting

Run `node --test` from the repository root. Then add fixtures for your own adapter assumptions before integrating the functions with real data. The existing suites cover their stated synthetic boundaries. They do not establish profitability, clinical suitability, accessibility certification or live service reliability.

These notes are by the maintainer of the linked AGProLabs and AliGurtuna projects, prepared with AI assistance. Read the [reference routes](/reference-routes) for optional public source material and the [repository](https://github.com/draligurtuna/dashboard-contract-examples) for the exact implementation.
