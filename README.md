# Dashboard contract examples

Small, dependency-free JavaScript examples by Ali Gürtuna, creator of [AGProLabs](https://www.agprolabs.com/).

A dashboard should have a clear data contract before visual styling. This repository makes two narrow contracts executable: deterministic ranking of already-normalized rows, and unit-aware conversion with explicit invalid states.

## Run the examples

Use a currently supported Node.js runtime with its built-in test runner. No package installation or credentials are needed.

```sh
node --test contracts.test.mjs
```

Files:

- contracts.mjs — the two pure functions.
- contracts.test.mjs — reproducible assertions, including every ordering of a four-row fixture.

## Ranking contract

rankRows(rows) accepts an array of objects with unique normalized identities and finite scores from 0 through 100. Identities use uppercase ASCII letters, digits and the punctuation colon, underscore, slash and hyphen. The function deliberately rejects lowercase or malformed identities; normalize the source at a separate boundary.

Rows sort by raw score descending, then identity ascending. Equal display rounding never changes this order. The input array is preserved, while row objects remain shared references: this is an array copy, not a deep clone.

An empty input returns an empty array. Duplicate identities and malformed rows throw. Scores are illustrative display values, not probabilities, position sizes or trade instructions.

For the reader-facing panel context, see the [Crypto Setup Planner dashboard guide](https://www.agprolabs.com/insights/how-to-read-crypto-setup-planner-dashboard/). The sample ranking contract is independently designed for this repository; it does not reproduce the proprietary Pine implementation.

## Unit conversion contract

toMillimetres(value, unit) accepts a numeric value and either cm or mm. It returns READY with the original value/unit pair and output unit, or INVALID_NUMBER, INVALID_UNIT or OUT_OF_RANGE.

The maximum input of 1,000,000 is an illustrative application boundary. Zero is valid. Numeric strings, NaN and Infinity are rejected. A negative value is outside this example's domain. Validation order is explicit: invalid number, invalid unit, then range.

The example does not parse localized text, handle browser number-entry behavior or announce accessible UI updates. Those belong to separate interface tests. Preserve calculation precision separately from display formatting.

I also maintain an [educational calculator directory](https://www.aligurtuna.com/hesaplama-programlari/). This repository's length converter is an independent software example, not a medical formula or validation of those website tools.

## What the tests establish

The suite checks ordering across all 24 permutations of a four-row fixture, input preservation, score/identity boundaries, duplicate rejection, valid unit transitions and invalid conversion states. It does not establish market profitability, production performance, clinical accuracy, browser accessibility or locale compatibility.

No network requests, private Pine source, API keys or personal measurements are included. Adapt the contracts deliberately and expand the tests for your own source and interface.

Prepared with AI assistance. The published examples are accompanied by locally executed assertions so their scope is reproducible.
