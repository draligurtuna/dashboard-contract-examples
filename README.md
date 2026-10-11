# Dashboard contract examples

Small, dependency-free JavaScript examples by Ali Gürtuna, creator of [AGProLabs](https://www.agprolabs.com/).

A dashboard should have a clear data contract before visual styling. This repository makes three narrow contracts executable: deterministic ranking of already-normalized rows, unit-aware conversion with explicit invalid states, and metric comparison with explicit provenance boundaries.

## Interactive lab

[Open the Dashboard Contract Lab](https://draligurtuna.github.io/dashboard-contract-examples/) to change the synthetic score fixtures, reorder their arrival, and try valid or invalid lengths. The page runs these same two functions in the browser. It uses native labeled controls, visible status text and no analytics or live feed.

The UI preserves raw scores for ordering and shows rounding separately. Empty fields produce invalid states rather than zero. Rejected inputs clear the previous result. The lab is independently designed; it does not simulate the proprietary Crypto Setup Planner algorithm.

### Browser smoke checks

1. Reorder the incoming rows: the ranked output stays ALPHA, GAMMA, BETA, DELTA for the default values.
2. Clear ALPHA or enter 100.0001: no ranking rows remain and INVALID SCORE is visible.
3. Reset the example: the four rows return.
4. Clear length: the previous conversion disappears and INVALID_NUMBER is visible.
5. Enter zero: the result is 0 mm.
6. Enter -1 or 1000001: OUT_OF_RANGE is visible.
7. Reset length and switch the unit to mm: the result is 12.5 mm, using the original input.

These focused browser checks passed in Chrome. A 390 px viewport check found no horizontal overflow. This is not a full accessibility or cross-browser certification.

## Run the examples

Use a currently supported Node.js runtime with its built-in test runner. No package installation or credentials are needed.

```sh
node --test contracts.test.mjs
```

Files:

- contracts.mjs — the two pure functions.
- contracts.test.mjs — reproducible assertions, including every ordering of a four-row fixture.
- index.html — the interactive learning interface, served over HTTP with a local module import.

## Ranking contract

rankRows(rows) accepts an array of objects with unique normalized identities and finite scores from 0 through 100. Identities use uppercase ASCII letters, digits and the punctuation colon, underscore, slash and hyphen. The function deliberately rejects lowercase or malformed identities; normalize the source at a separate boundary.

Rows sort by raw score descending, then identity ascending. Equal display rounding never changes this order. The input array is preserved, while row objects remain shared references: this is an array copy, not a deep clone.

An empty input returns an empty array. Duplicate identities and malformed rows throw. Scores are illustrative display values, not probabilities, position sizes or trade instructions.

For the reader-facing panel context, see the [Crypto Setup Planner dashboard guide](https://www.agprolabs.com/insights/how-to-read-crypto-setup-planner-dashboard/). The sample ranking contract is independently designed for this repository; it does not reproduce the proprietary Pine implementation.

## Unit conversion contract

toMillimetres(value, unit) accepts a numeric value and either cm or mm. It returns READY with the original value/unit pair and output unit, or INVALID_NUMBER, INVALID_UNIT or OUT_OF_RANGE.

The maximum input of 1,000,000 is an illustrative application boundary. Zero is valid. Numeric strings, NaN and Infinity are rejected. A negative value is outside this example's domain. Validation order is explicit: invalid number, invalid unit, then range.

The pure function does not parse localized text or control browser number-entry behavior. The separate lab uses valueAsNumber, explicitly rejects blanks, and exposes status updates through polite live regions. Locale handling still requires deliberate testing for each supported browser. Preserve calculation precision separately from display formatting.

I also maintain an [educational calculator directory](https://www.aligurtuna.com/hesaplama-programlari/). This repository's length converter is an independent software example, not a medical formula or validation of those website tools.

## What the tests establish

The suite checks ordering across all 24 permutations of a four-row fixture, input preservation, score/identity boundaries, duplicate rejection, valid unit transitions and invalid conversion states. It does not establish market profitability, production performance, clinical accuracy, browser accessibility or locale compatibility.

No live feed requests, private Pine source, API keys or personal measurements are included. Adapt the contracts deliberately and expand the tests for your own source and interface.

Prepared with AI assistance. The published examples are accompanied by locally executed assertions so their scope is reproducible.

## Metric comparison contract

The additional pure function in `metric-contract.mjs` preserves measurement semantics before calculating a difference. It requires a finite numeric value and explicit metric, unit, currency, interval, session, trusted methodology basis and a separately established freshness state. It returns `unavailable`, `incomparable` or `comparable`; incompatible contracts never produce a numeric difference. This module is not wired into the interactive ranking/length lab above.

Run its isolated fixtures with:

```sh
node --test metric-contract.test.mjs
```

Eleven local Node.js assertions passed: matching contracts, five metadata mismatch types, unknown freshness, missing methodology, null, infinity and subtraction overflow. These are synthetic checks, not validation of a live feed or the proprietary TradingView implementation. Trusted adapters must validate allowed combinations and assign basis IDs; they must not accept arbitrary equivalence claims from untrusted payloads. Freshness requires a separate source-time/session policy. No FX conversion or unit inference is performed.

For instrument-selection context, see the [commodity screening guide](https://www.agprolabs.com/insights/screen-commodities-tradingview/). For interpretation boundaries, see [relative volume versus liquidity](https://www.agprolabs.com/insights/relative-volume-vs-liquidity/). The [companion technical walkthrough](https://dev.to/agprolabs/a-dashboard-metric-needs-units-provenance-and-a-failure-state-2h12) explains the states and rendering decisions. AGProLabs is my own project; these references disclose that relationship. Prepared with AI assistance.

## Series identity contract

The additional model in `series-identity.mjs` separates display labels from a declared dataset identity. Provider, full symbol, instrument kind, timeframe, session, currency, volume semantics and metadata revision are preserved in an ordered structured encoding. Dated contracts require a contract identity; continuous histories require an explicit adjusted or unadjusted policy. Unknown or missing required fields return an unavailable key instead of a guessed default.

```sh
node --test series-identity.test.mjs
```

Fourteen locally executed synthetic assertions passed, including input field-order stability, provider/timeframe/revision separation, adjustment-policy separation, unknown metadata blocking, dated-contract separation and safe delimiter/quote serialization. The [interactive CodePen lab](https://codepen.io/editor/Ali-G-rtuna/pen/01a12cb8-a439-77b6-bfbe-3c5d1ed6a5e3) exposes the same review exercise. Open `series-identity-lab.html` locally for the standalone, dependency-free version; its inputs do not leave the browser. Selected unknown-volume and policy-change states and the 14-check browser runner were verified in Chrome. No cross-browser or full accessibility certification is claimed.

This is an illustrative request contract, not a full provider schema, provenance attestation, freshness policy, cryptographic fingerprint or execution identifier. Trusted source adapters must validate allowed instrument conventions and metadata; declaring a field does not establish its truth. The model does not validate a live feed or reproduce the proprietary Crypto Setup Planner source.

For the domain context, compare [gold quotations, futures and funds](https://www.agprolabs.com/insights/gold-screening-spot-futures-etf/), review [oil rollover conventions](https://www.agprolabs.com/insights/oil-screening-futures-rollover/), and read the owned [Crypto Setup Planner product documentation](https://www.agprolabs.com/product/crypto-setup-planner/). The [companion engineering note](https://agprolabs.hashnode.dev/a-ticker-label-is-not-a-safe-market-data-cache-key) explains why a short ticker is an insufficient cache boundary. These references disclose the author's own project. Educational analysis only, not financial advice.
