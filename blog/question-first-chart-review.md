---
title: A question-first contract for chart-review interfaces
date: 2026-10-27
description: Separate discovery, structure and integrated review before choosing a chart-analysis interface.
---

# A question-first contract for chart-review interfaces

An analytical dashboard becomes easier to evaluate when its reader can finish one sentence: “I opened this interface to answer…”. That sentence gives the interface a useful boundary. Without it, a colorful table can mix instrument selection, chart location and risk review into one apparently decisive number.

This note explains a small evaluation method for chart-analysis interfaces. It accompanies the independent examples in the dashboard-contract-examples repository. I maintain [AGProLabs](https://www.agprolabs.com/), so the product references below are references to my own work, rather than independent endorsements. This note was prepared with AI assistance.

## Start with three different questions

Before comparing controls, write down the reader's immediate task:

| Reader's question | Information needed | A useful stopping condition |
| --- | --- | --- |
| Which charts deserve a closer look? | Instrument identity, interval, candidate evidence and blockers | A manageable shortlist with reasons |
| Where is this chart relative to its structure? | Channel family, rail location and current structural state | A map whose references the reader can identify |
| How do several analytical layers relate? | Context, confirmation, structure and risk references | A review in which agreement and conflict remain visible |

These questions can belong to the same working session. They still require different outputs. An instrument ranking does not supply a complete structural map, and a structural map does not establish that two observations use comparable data.

The [workflow catalog](https://www.agprolabs.com/workflows/) is one way to inspect tools by the review job they support. The [collections page](https://www.agprolabs.com/collections/) groups related analytical purposes. Use that organization to narrow a comparison before examining individual settings.

## Discovery: keep the reason beside the rank

For a discovery interface, record the full instrument identity and selected interval with each observation. Preserve the score separately from the state that explains whether a candidate passes the tool's checks. A high displayed score and a blocker can coexist; hiding the blocker makes the ranking harder to interpret.

For example, a review note can contain these fields:

```text
Question: Which charts should I inspect next?
Instrument: provider + complete symbol + instrument kind
Observation: selected interval + source candle time
Evidence: displayed score + setup state + quality blockers
Next review: open the chart and inspect the source context
```

This is an illustrative note format. It is not an exported payload, a description of a proprietary algorithm or a trade instruction.

[Crypto Setup Planner](https://www.agprolabs.com/product/crypto-setup-planner/) is the owned product reference for this discovery task. Its documented scope is candidate screening. Read its current symbol-group, evidence and limitation explanations before assuming it supplies another part of a decision process.

## Structure: identify the reference before interpreting the distance

A channel interface needs enough information to answer which channel a value belongs to. Record the family, the relevant rail and the state being displayed. Keep a distance expressed in ATR separate from a price level or a percentage position; they describe different measurements.

A useful review question is: “If the highlighted channel changes, can I still explain what this label measured?” The interface should make that answer possible without relying on color alone. Labels and panel values need to refer to the same declared structure.

[Dynamic Channels Elite](https://www.agprolabs.com/product/dynamic-channels-elite/) provides the owned channel-mapping reference. Its product documentation describes the channel families and the visible reading workflow. A structural quality value should be read according to that definition, without treating it as a calibrated outcome probability.

## Integrated review: retain the boundaries between layers

An integrated workspace can reduce switching between views. Its engineering challenge is keeping each layer's meaning intact. A context state, a confirmed transition and a risk reference should retain their labels, source assumptions and limitations when displayed together.

[Trading Suite](https://www.agprolabs.com/product/trading-suite-agpro-series/) is the owned integrated-workspace reference. Inspect the documented modules against the question you wrote at the beginning. More visible modules are useful only when you can explain which information each contributes to that question.

## A repeatable interface review

1. Write one question before opening the interface.
2. Record the instrument, interval and observation time.
3. Separate the displayed measurement from its state or blocker.
4. Read the original definition of any unit or quality score.
5. Note what remains outside the interface's scope.
6. Return to the same question when comparing another view.

The repository's synthetic examples explore related software boundaries, such as stable identity, explicit unavailable states and snapshot readiness. Their tests establish only the specific fixture behavior documented in the repository. They do not validate the commercial products, live market data or trading outcomes.

This is a software-interface evaluation note. Analytical outputs require broader context and independent judgment; trading involves risk. No automated execution or outcome guarantee is implied.
