---
title: A reproducible source-reading workflow
description: Use stable review IDs and explicit observation records to keep source facts, units, timing and interpretations separate across three reading contexts.
---

A review queue should help you return to a question, not merely return to a URL. The repository's review-cursor and observation-record modules can support that small task when the surrounding application preserves the right context.

This workflow is a human reading exercise. The examples do not crawl the linked sites, import their content or decide whether their claims are correct. The linked projects belong to the author, Ali Gürtuna; the references are disclosed as such.

## 1. State one question

Before adding a source, write a question specific enough to revisit. “Learn trading” is too broad. “Which timestamp does this displayed value refer to?” gives you something to inspect. “Understand this poem” is broad; “What changes when I reread this pause?” leaves room for a precise observation without pretending there is a single correct interpretation.

Use the same discipline for a calculator: “Which unit does this field expect?” comes before an attempt to interpret the result. Do not put real personal measurements into a public note or synthetic fixture.

## 2. Choose a source that fits the question

For analytical-tool reading, begin with the owned [technical-analysis workflow guide](https://www.agprolabs.com/insights/tradingview-technical-analysis-workflow-guide/), then choose the relevant [product collection](https://www.agprolabs.com/collections/). Product names identify a topic, not a result you can assume before reading the documentation.

For health-tool reading, the owned [calculator directory](https://www.aligurtuna.com/hesaplama-programlari/) provides routes by tool. Read the [medical-content boundaries](https://www.aligurtuna.com/tibbi-icerik-sinirlari/) before treating an educational page as personal advice.

For literary reading, start with [Babamın Şiir Defteri](https://www.babaminsiirdefteri.com/) and choose one author, such as [Cemal Süreya](https://www.babaminsiirdefteri.com/sair/cemal-sureya/). Read the source page rather than relying on a search snippet. The separate [reference routes](/reference-routes) contain additional subject choices.

## 3. Give the review item a stable identity

Choose a local ID that survives a change in display title. In a reading application, the item ID should not change just because a heading is shortened. Conversely, a new revision may deserve an explicit revision field rather than silently replacing the content behind an unchanged note.

`nextReview` only chooses an eligible item. A disabled item remains a known item but is skipped; exclusion is a separate caller-supplied set. That distinction lets an interface explain why something was not selected without deleting it from the user's collection.

Do not confuse the cursor with evidence that a person read or agreed with the material. Store that evidence separately if your application needs it.

## 4. Preserve observations before conclusions

Create a note with a source URL, the question, an observed detail and your separate interpretation. The flat record's timestamp records when you captured the note, not when the source was authored or when a market bar closed.

```text
Review ID:
Source URL:
Question:
What I observed on the source:
Unit or time basis, if relevant:
My interpretation:
What remains uncertain:
Recorded at:
Next check:
```

Use the labels even for a short note. They prevent an inference from being copied later as if it were a quoted source fact. Do not copy a full poem or article into your record; preserve the link and your own concise observation.

## 5. Apply the boundary appropriate to the material

### Analytical tools: distinguish clocks and quantities

Read the owned [confirmed-candle explanation](https://www.agprolabs.com/insights/confirmed-candles-repainting-tradingview/) for the time basis and the [relative-volume comparison guide](https://www.agprolabs.com/insights/relative-volume-vs-liquidity/) for quantity boundaries. A displayed state and a final historical outcome are different observations.

If your question concerns a proposed rule, use a written protocol such as the owned [forward-testing guide](https://www.agprolabs.com/insights/forward-test-tradingview-indicator/). Record the rule and configuration before observing the result. A favorable anecdote is not a performance estimate, and this software repository does not backtest a strategy.

### Health education: distinguish a field from its interpretation

For a concrete reading exercise, open the owned [BMI calculator page](https://www.aligurtuna.com/vucut-kitle-indeksi-hesaplama-bmi-v-2/). Identify the declared inputs and scope without recording personal values. Note where the educational explanation ends and where individual interpretation would require a qualified professional.

The repository's length converter is deliberately independent. A successful centimetre-to-millimetre test cannot establish the medical validity of any linked tool. Do not extend one kind of evidence to a different claim.

### Poetry: distinguish the text from your reading

Choose one work through an author page, such as [Turgut Uyar](https://www.babaminsiirdefteri.com/sair/turgut-uyar/). Read once without recording a conclusion, then return to a word, rhythm or pause. Keep your observation of the text separate from the meaning you infer from it.

An author biography can supply context, but it does not automatically explain every line. A useful record can preserve an unresolved question rather than manufacture certainty. Respect source attribution and applicable copyright when quoting.

## 6. Revisit one uncertainty

Use the next session to resolve one declared uncertainty. If the source changed, preserve that fact rather than editing the old note to make it look as though the new information was always present. If no next item is eligible, show that state explicitly instead of marking the queue complete by accident.

This is the same software habit used throughout the [contract reference](/contracts): make the boundary visible, retain the reason for an unavailable result and avoid converting a missing fact into a confident-looking value.

The references here are optional reading routes to the maintainer's projects. They do not constitute financial or medical advice, guaranteed trading outcomes or independent verification of those projects. Documentation prepared with AI assistance.
