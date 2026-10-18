---
title: Dashboard contracts before dashboard styling
description: Learn nine small JavaScript contracts for ranking, units, provenance, readiness and reproducible observation notes, with executable examples.
---

An attractive dashboard still needs to answer three plain questions: what does this value mean, when is it available, and what happens when its assumptions fail? These notes document a small, dependency-free repository that makes those questions testable.

Start with one contract, change a synthetic fixture, and inspect the result. You do not need a trading account, personal measurements, an API token or a data subscription. The examples are independent software exercises. They do not reproduce the proprietary algorithms of any commercial TradingView script.

## Choose the question you want to test

| Your question | Start with | What to change |
|---|---|---|
| Does arrival order change a ranking? | `contracts.mjs` | Reorder rows without changing IDs or scores. |
| Is an empty field the same as zero? | `contracts.mjs` | Compare an invalid number with the numeric value zero. |
| Can two metrics be subtracted? | `metric-contract.mjs` | Change the unit, session or methodology basis. |
| Can a short ticker identify a dataset? | `series-identity.mjs` | Keep the display label, change provider or adjustment policy. |
| Is a snapshot ready for review? | `snapshot-readiness.mjs` | Remove a required slot or change its expected close. |
| What should be reviewed next? | `review-cursor.mjs` | Change eligibility without replacing stable IDs. |
| What belongs in an observation record? | `observation-record.mjs` | Preserve a source URL and a separate interpretation. |
| Is an unavailable metric displayed as zero? | `metric-contract.mjs` and its companion display lab | Inspect the explicit availability state. |
| Does volume mean shares, contracts or a relative measure? | `volume-unit-workbook.mjs` | Change the declared volume unit. |

The [contract reference](/contracts) explains each boundary. The [reading workflow](/reading-workflow) connects stable identity and observation capture to a practical review session. The [reference routes](/reference-routes) help you select public source material by subject instead of opening an undifferentiated list.

## Run the existing examples

Clone the public repository, change into its directory and use a supported Node.js runtime:

```sh
git clone https://github.com/draligurtuna/dashboard-contract-examples.git
cd dashboard-contract-examples
node --test
```

The repository uses the built-in test runner. There is no package installation step. To inspect an interactive example, open the [published contract map](https://draligurtuna.github.io/dashboard-contract-examples/start-here.html). Its links lead to the individual browser labs. If you serve the files yourself, use a local HTTP server so module imports have an ordinary HTTP origin.

Passing these fixtures establishes the specified behavior for their synthetic inputs. It does not establish production performance, clinical accuracy, market profitability, browser compatibility or the correctness of an external website's calculator. Read the failure cases before adapting a function.

## A useful first exercise

Try two rows with scores that round to the same displayed value but differ before rounding. Predict the order, run the ranking, then reverse the incoming array. The same raw-score order should remain. Next, use identical scores and compare the normalized IDs. You have now separated display formatting, primary ordering and deterministic tie-breaking.

Repeat the pattern for one other contract: write down the input, the expected state and the reason that state should change. A reproducible example is more informative than a screenshot with no declared inputs.

## About the maintainer and the linked projects

I am Ali Gürtuna, founder of [AGProLabs](https://www.agprolabs.com/), where I develop TradingView analytical tools and publish documentation and reading guides. I also maintain [AliGurtuna.com](https://www.aligurtuna.com/), a Turkish health education project, and [Babamın Şiir Defteri](https://www.babaminsiirdefteri.com/), a Turkish poetry and literature project.

These are my own projects. Their inclusion is an ownership disclosure and a route to relevant reading material, not an independent endorsement. Public resources from the three projects illustrate different review contexts; their content is not bundled into the JavaScript library and is not required to run it.

Documentation prepared with AI assistance and checked against the public repository. No private Pine source, customer data or credentials are included. Educational examples only; users remain responsible for validating an adapted implementation in its actual context.
