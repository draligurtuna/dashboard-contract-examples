# Dashboard contract examples

Small, dependency-free JavaScript examples by Ali Gürtuna, creator of [AGProLabs](https://www.agprolabs.com/).

A dashboard should have a clear data contract before visual styling. This repository makes nine narrow contracts executable: deterministic ranking of already-normalized rows, unit-aware conversion with explicit invalid states, metric comparison with explicit provenance boundaries, declared series identity, snapshot readiness, stable-ID review selection, flat observation capture, explicit metric availability/display units, and declared volume-unit interpretation.

[Choose an example in the short contract map](https://draligurtuna.github.io/dashboard-contract-examples/start-here.html).

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

## Snapshot readiness contract

[Open the Snapshot Readiness Lab](https://draligurtuna.github.io/dashboard-contract-examples/snapshot-readiness-lab.html) to switch synthetic coverage, confirmation and close-alignment fixtures. It imports the same independent module; no live data is requested.

`snapshot-readiness.mjs` separates slot coverage from confirmation and explicit completed-close alignment. The caller supplies a non-empty plan of unique symbol/timeframe pairs and a safe-integer expected close for each pair. `assessSnapshot(plan, rows)` returns `WAIT` with a reason or `REVIEW_READY` when the narrow contract is met.

Complete coverage alone never establishes readiness. Missing pairs, duplicate expected rows, unconfirmed sources and mismatched closes remain waiting. Well-formed unrelated rows do not fill required slots. Daily and four-hour closes need not equal each other: each row must match its own declared expected slot. Identity and timeframe normalization belong to a trusted adapter; these strings are exact keys, not aliases.

Run the independent synthetic fixtures:

```sh
node snapshot-readiness.test.mjs
```

The runner writes a local `test-results.json` and exits on an assertion failure. Thirteen local tests passed: distinct timeframe closes, complete-but-misaligned coverage, false and truthy-string confirmation, missing and duplicated slots, unrelated symbols, empty or duplicated plans, invalid close times, null rows and input preservation. These checks cover only the illustrative contract. They do not establish freshness, trusted provenance, asynchronous atomicity, calendar correctness, production runtime performance or market outcomes. A source adapter must establish the expected exchange/session closes; an arbitrary timestamp supplied by an untrusted payload is not evidence of alignment. This module is not wired into the browser labs above.

The [Smart Swap HOLD reading guide](https://www.agprolabs.com/insights/read-smart-swap-hold-portfolio/) explains the reader-facing distinction between feed availability and snapshot readiness. The [confirmed-candle and repainting guide](https://www.agprolabs.com/insights/confirmed-candles-repainting-tradingview/) provides separate chart-interpretation context. The [Trading Suite product documentation](https://www.agprolabs.com/product/trading-suite-agpro-series/) describes the owned analytical product; this educational code does not reproduce its proprietary engine or generate trade instructions. The [companion JavaScript walkthrough](https://dev.to/agprolabs/full-feed-coverage-is-not-snapshot-readiness-a-tested-javascript-contract-3g12) shows the implementation.

Prepared by an AI agent for AGProLabs, the author's own project, with locally executed tests. Synthetic inputs only; no private Pine source, live feed requests, credentials or personal records.


## Stable-ID review cursor

[Open the Review Cursor Lab](https://draligurtuna.github.io/dashboard-contract-examples/review-cursor-lab.html) to try a saved identity, reordered catalog, temporary exclusion, removed cursor and empty eligible set. The lab holds only synthetic state in memory. Selection, a simulated visit and completion are separate concepts.

The dependency-free `review-cursor.mjs` exports `nextReview(items, lastVisitedId, excludedIds)`. It resumes after a stable identity in the supplied current order, wraps once, skips ineligible/excluded entries and returns null when no candidate exists. A missing saved identity uses the documented first-item fallback. Reordering can change the successor; stable identity does not freeze order. Returning an original object reference does not mutate the catalog.

Run the bounded fixture tests with:

```sh
node --test review-cursor.test.mjs
```

Eight local scenarios passed: initial selection, reorder, wrap, eligibility versus temporary exclusion, no candidate, removed-ID fallback, invalid/duplicate IDs and input preservation. These fixtures do not certify production scheduling, durable storage, concurrent readers, indexing or exhaustive input validation. The browser lab is an educational UI, not an automated submission tool.

The three synthetic resource labels refer to the author's own distinct projects:
- AGProLabs: [screened-candidate journal](https://www.agprolabs.com/insights/trading-journal-screening-template/) and [weekly process review](https://www.agprolabs.com/insights/weekly-trading-process-review/). Browsing does not establish market performance.
- AliGurtuna.com: [health-category directory](https://www.aligurtuna.com/tum-saglik-kategorileri/) and [awareness-resource directory](https://www.aligurtuna.com/psikolojik-farkindalik-testleri-online-on-degerlendirme-araclari/). This example processes no clinical data and does not validate health tools.
- Babamın Şiir Defteri: [poets and poems](https://www.babaminsiirdefteri.com/sairler-ve-siirler/) and [literary reviews](https://www.babaminsiirdefteri.com/sair/eser-incelemeleri/). A visited link does not prove a work was read.

[Read the implementation walkthrough](https://dev.to/agprolabs/a-review-cursor-should-not-invent-completion-19cd). Prepared with AI assistance; no analytics, live feed, accounts or local storage in the lab.


## Flat observation capture

The independent `observation-record.mjs` example captures five primitive fields into a new frozen object. It avoids keeping mutable form objects as historical records. The caller supplies an explicit source URL and epoch-millisecond observation time; it does not infer provenance or use the current time automatically.

```sh
node --test observation-record.test.mjs
```

Eight bounded local scenarios passed: independent object identity, later source edits, strict-mode output-edit rejection, exclusion of extra fields, invalid text, unsafe source URLs, time boundaries and input preservation. Only selected primitive fields are copied. Freezing is not a deep-copy mechanism, durable storage, a signature or proof that an observation happened. The HTTPS rule permits credentials-free URLs; it is not an allowlist, access check, public-URL test or privacy scrubber. HTTPS URLs can still contain sensitive query parameters. Use trusted plain inputs and a reviewed publication adapter. Getters, hostile proxies, payload size limits and HTML safety are outside this narrow example.

For chart-reading context, the author's [multi-timeframe disagreement guide](https://www.agprolabs.com/insights/multi-timeframe-analysis-conflict/) separates each source interval's role and confirmation. The [forward-testing guide](https://www.agprolabs.com/insights/forward-test-tradingview-indicator/) provides a related evidence-recording workflow. This independent JavaScript code does not reproduce private Pine source or establish market, clinical or editorial correctness.

## Metric display contract

The self-contained [Metric Display Lab](https://draligurtuna.github.io/dashboard-contract-examples/metric-display-lab.html) exposes eight fixed synthetic fixtures. The source is `metric-display-lab.html`; GitHub Pages may need to finish deployment after a commit before this new URL becomes available.

Choose a record, render it, and reset the page. A changed selection clears the previous result. Unavailable, malformed and observed-zero records remain distinct. A share of 0.25 is converted to 25.00%, while a percentage value of 25 is displayed as 25.00% without a second conversion. Counts require nonnegative safe integers. These are illustrative declared-unit rules, not upstream evidence validation or a locale-aware financial formatting library.

The embedded formatter passed the 20 synthetic assertions published in the [implementation and test walkthrough](https://dev.to/agprolabs/do-not-render-unavailable-as-zero-a-unit-aware-javascript-metric-formatter-4525). Local script syntax was checked too. This statement does not certify live-browser integration, full accessibility, real feeds, proprietary Pine runtime performance or clinical tools. The page uses no external scripts, requests, storage or analytics.

For the owned reading context, see [win rate versus expectancy](https://www.agprolabs.com/insights/win-rate-vs-expectancy/), [drawdown series identity](https://www.agprolabs.com/insights/maximum-drawdown-trading-review/) and [cost assumptions](https://www.agprolabs.com/insights/risk-reward-after-fees/). These are resources from the author's own project, not independent endorsements. Prepared with AI assistance.



## Volume unit workbook

[Open the Volume Unit Workbook](https://draligurtuna.github.io/dashboard-contract-examples/volume-unit-workbook.html) to load six synthetic cases and edit a declared quantity, volume meaning, price and currency. All inputs stay in browser memory. Loading or editing clears the previous result; no live feed or storage is used.

The independent `volume-unit-workbook.mjs` module distinguishes approximate base-quantity × price, declared quote amount, unresolved contract specifications, nonmonetary tick counts and unknown units. `compareThreshold` only compares finite nonnegative monetary results and thresholds with the same declared currency label. No currency conversion, provider attestation, contract multiplier, session policy or order-book assessment is inferred.

```sh
node --test volume-unit-workbook.test.mjs
```

Twenty local tests passed for the six cases, observed zero versus missing quantity, strict numeric types, sign/finiteness, base price requirements, overflow, safe tick counts, threshold boundaries, currency mismatch and input preservation. These are bounded synthetic model tests, not live-browser, real-feed, proprietary Pine, financial-performance or full accessibility validation. Currency-label syntax and uppercase UI normalization do not establish a source unit's truth.

For the author's domain context, see [turnover thresholds and volume units](https://www.agprolabs.com/insights/turnover-thresholds-volume-units/) and [global stock currencies and sessions](https://www.agprolabs.com/insights/global-stock-screening-currencies/). These are author-maintained references; this JavaScript example does not reproduce Crypto Setup Planner. Prepared with AI assistance for AGProLabs. Educational analysis only; no financial advice or guaranteed outcome.

## Short resource paths for interpreting a data card

These references belong to the author's own projects. Choose one relevant destination; they do not constitute independent source verification or imply that the sample code is integrated into a linked product. AI-assisted resource navigation update.

### Market context and data quality

Use a relevant guide to identify the instrument, unit and unresolved source state before interpreting a display.

- [Use ATR Percent to Compare Screening Volatility](https://www.agprolabs.com/insights/atr-percent-screening-volatility/)
- [WARMUP and Missing Data in a TradingView Screener](https://www.agprolabs.com/insights/warmup-missing-data-screener/)
- [From a Screener Shortlist to Chart Review](https://www.agprolabs.com/insights/shortlist-to-chart-review/)

### Health-tool explanations

Read the actual inputs and limitations. The length converter above does not implement these tools or establish clinical accuracy.

- [Daily calorie calculator — inputs and limitations](https://www.aligurtuna.com/gunluk-kalori-hesaplama-programi/)
- [BMI calculator — height, weight and units](https://www.aligurtuna.com/vucut-kitle-indeksi-hesaplama-bmi-v-2/)
- [Growth percentile calculator — age and measurement context](https://www.aligurtuna.com/boy-kilo-persentil-hesaplama/)
- [Pregnancy calendar — date inputs and explanation](https://www.aligurtuna.com/gebelik-hesaplama-takvimi/)

### Author-archive navigation

Keep the author archive distinct from a specific work or edition. A visited link does not prove a work was read.

- [Yahya Kemal — Şair Arşivi](https://www.babaminsiirdefteri.com/sair/yahya-kemal-beyatli/)
- [Tevfik Fikret — Şair Arşivi](https://www.babaminsiirdefteri.com/sair/tevfik-fikret/)
- [Didem Madak — Şair Arşivi](https://www.babaminsiirdefteri.com/sair/didem-madak/)
- [Âşık Veysel — Şair Arşivi](https://www.babaminsiirdefteri.com/sair/asik-veysel/)


## Source context and interpretation boundaries

For a reading exercise, separate the analytical job, the page's stated scope and the author's interpretation. These concise references belong to the three projects I maintain; they are not evidence that this sample code is integrated into those sites. AI assisted this navigation update.

### Analytical roles and saved configuration

- [Position size versus indicator score](https://www.agprolabs.com/insights/position-size-vs-indicator-score/)
- [TradingView indicator versus strategy](https://www.agprolabs.com/insights/tradingview-indicator-vs-strategy/)
- [Crypto Setup Planner versus Trading Suite](https://www.agprolabs.com/insights/crypto-setup-planner-vs-trading-suite/)
- [Alerts after a script update](https://www.agprolabs.com/insights/tradingview-alerts-after-script-update/)

### Health-publication scope

Read the publisher's stated boundaries before treating educational text as a personal assessment.

- [Editorial principles](https://www.aligurtuna.com/editoryal-ilkeler/)
- [Medical content boundaries](https://www.aligurtuna.com/tibbi-icerik-sinirlari/)

### Literary archive format

A collection of stories or essays is a navigation route; retain the specific work title separately in your own record.

- [Story archive](https://www.babaminsiirdefteri.com/sair/hikayelerim/)
- [Essay archive](https://www.babaminsiirdefteri.com/sair/makalelerim/)


## Focused reference routes

A concise map of the author's own resources; choose the original page that matches your reading question.

### Channel structure and access

- [Access and activation](https://www.agprolabs.com/how-access-works/)
- [Projected channel rails](https://www.agprolabs.com/insights/projected-channel-rails/)
- [Major and minor price channels](https://www.agprolabs.com/insights/major-minor-price-channels/)
- [Internal and external price channels](https://www.agprolabs.com/insights/internal-external-price-channels/)
- [Channel rails and ATR distance](https://www.agprolabs.com/insights/channel-support-resistance-atr-distance/)
- [Channel quality-score interpretation](https://www.agprolabs.com/insights/channel-quality-score-explained/)

### Health-tool inputs and topic context

- [HOMA-IR calculator — inputs and limits](https://www.aligurtuna.com/homa-ir-hesaplama-insulin-direnci/)
- [Ovulation calendar — explanation and limits](https://www.aligurtuna.com/ovulasyon-hesaplama-dogurganlik-takibi/)
- [Radiology topic archive](https://www.aligurtuna.com/radyoloji/)

### Three author archives

- [Ahmed Arif archive](https://www.babaminsiirdefteri.com/sair/ahmed-arif/)
- [Ahmet Hamdi Tanpınar archive](https://www.babaminsiirdefteri.com/sair/ahmet-hamdi-tanpinar/)
- [Ahmet Haşim archive](https://www.babaminsiirdefteri.com/sair/ahmet-hasim/)


## Choose an original reference for the next review

These are resources from the projects I maintain. Choose a relevant original page for its scope, input definitions and attribution. The links do not establish that the sample code validates a trading outcome, individual health assessment or literary interpretation.

### Market review and comparison guides

- [TradingView Screener vs Chart Indicator](https://www.agprolabs.com/insights/tradingview-screener-vs-chart-indicator/)
- [Build a TradingView Analysis Workspace](https://www.agprolabs.com/insights/build-tradingview-analysis-workspace/)
- [Build a Crypto Watchlist for Meaningful Screening](https://www.agprolabs.com/insights/build-crypto-watchlist-tradingview/)
- [Build a Stock Sector Watchlist in TradingView](https://www.agprolabs.com/insights/stock-sector-watchlist-tradingview/)
- [Crypto Spot vs Perpetual Screening](https://www.agprolabs.com/insights/crypto-spot-vs-perpetual-screening/)
- [Channel Breakout and Retest Checklist](https://www.agprolabs.com/insights/channel-breakout-retest-checklist/)
- [VWAP vs Moving Average for Chart Context](https://www.agprolabs.com/insights/vwap-vs-moving-average/)
- [Portfolio Rotation and Relative Strength](https://www.agprolabs.com/insights/portfolio-rotation-relative-strength/)
- [Correlated Trades and Portfolio Risk](https://www.agprolabs.com/insights/correlated-trades-portfolio-risk/)
- [Trading Indicator Overfitting: Warning Signs](https://www.agprolabs.com/insights/indicator-overfitting-warning-signs/)
- [Heikin Ashi vs Standard Candles for Setup Review](https://www.agprolabs.com/insights/heikin-ashi-vs-standard-candles/)
- [When Trading Indicators Disagree: A Checklist](https://www.agprolabs.com/insights/indicator-disagreement-checklist/)

### Date and measurement tool references

- [Age calculator: years, months and days](https://www.aligurtuna.com/yas-hesaplama-programi-gun-ay-ve-yil-olarak/)
- [Daily water needs calculator](https://www.aligurtuna.com/gunluk-su-ihtiyaci-hesaplama-programi/)
- [Waist-to-height ratio calculator](https://www.aligurtuna.com/bel-boy-orani-hesaplama-abdominal-yaglanma-ve-metabolik-risk/)

### Named poet archives

- [Bâkî archive](https://www.babaminsiirdefteri.com/sair/baki/)
- [Birhan Keskin archive](https://www.babaminsiirdefteri.com/sair/birhan-keskin/)
- [Gonca Özmen archive](https://www.babaminsiirdefteri.com/sair/gonca-ozmen/)
- [Haydar Ergülen archive](https://www.babaminsiirdefteri.com/sair/haydar-ergulen/)
- [Hilmi Yavuz archive](https://www.babaminsiirdefteri.com/sair/hilmi-yavuz/)
- [İlhan Berk archive](https://www.babaminsiirdefteri.com/sair/ilhan-berk/)


## Reference age and evidence boundaries

These owner-maintained guides discuss timing and sample interpretation alongside the synthetic contract examples. They do not establish that the examples implement the commercial scripts.

- [Stale Setups: When a Good Rank Arrives Too Late](https://www.agprolabs.com/insights/stale-setup-screening/)
- [Pivot Confirmation and Channel Timing](https://www.agprolabs.com/insights/pivot-confirmation-channel-timing/)
- [Channel Follow Rates and Sample Size](https://www.agprolabs.com/insights/channel-follow-rate-sample-size/)
- [Look-Ahead Bias in Chart Replay Reviews](https://www.agprolabs.com/insights/look-ahead-bias-chart-replay/)


## Original references for a review card

A compact navigation menu for the three projects maintained by the author. These are source-context references, not independent endorsements or integration claims. Prepared with AI assistance.

### Additional analytical reading routes

Choose a guide or collection matching the review question. The examples here do not implement these proprietary tools.

- [Crypto & Stock Market Analysis: A Disciplined Framework](https://www.agprolabs.com/insights/disciplined-crypto-stock-market-analysis/)
- [Dynamic Price Channels in TradingView: A Practical Guide](https://www.agprolabs.com/insights/dynamic-price-channels-trend-structure/)
- [Crypto Exchange Monitoring in TradingView](https://www.agprolabs.com/insights/monitor-multiple-crypto-exchanges-tradingview/)
- [Read Dynamic Channels: Support & Resistance](https://www.agprolabs.com/insights/read-dynamic-channels-support-resistance/)
- [Rules-Based TradingView Analysis Workflows | Practical Guide](https://www.agprolabs.com/insights/rules-based-tradingview-analysis-workflows/)
- [Screen Stocks & ETFs in TradingView](https://www.agprolabs.com/insights/screen-stocks-etfs-tradingview/)
- [TradingView Indicator Alerts: Setup Guide](https://www.agprolabs.com/insights/set-up-tradingview-indicator-alerts/)
- [Trading Suite: Daily Analysis Workflow](https://www.agprolabs.com/insights/trading-suite-daily-analysis-workflow/)
- [TradingView Indicators & Screeners Compared](https://www.agprolabs.com/insights/tradingview-indicators-screeners-comparison/)
- [How to Use TradingView for Technical Analysis](https://www.agprolabs.com/insights/tradingview-technical-analysis-workflow-guide/)
- [Confirmation & Playbook TradingView Workflows](https://www.agprolabs.com/product-category/confirmation-playbook/)
- [Defense & Management TradingView Workflows](https://www.agprolabs.com/product-category/defense-management/)
- [Liquidity & Reclaim TradingView Workflows](https://www.agprolabs.com/product-category/liquidity-reclaim/)
- [Platform Access TradingView Workflows](https://www.agprolabs.com/product-category/platform-access/)
- [Risk & Execution TradingView Workflows](https://www.agprolabs.com/product-category/risk-execution/)
- [SMC & Structure TradingView Workflows](https://www.agprolabs.com/product-category/smc-structure/)

### Awareness resource explanations

Read the scope and limitations before interpreting a self-assessment. This repository does not process clinical results.

- [Aleksitimi Testi: Duyguları Tanıma ve İfade Etme Güçlüğü — açıklama ve sınırlar](https://www.aligurtuna.com/aleksitimi-testi-duygulari-tanima-ve-ifade-etme-guclugu/)
- [Anksiyete Testi — açıklama ve sınırlar](https://www.aligurtuna.com/anksiyete-testi-kaygi-belirtileri-on-degerlendirme/)
- [Ayrılık Kaygısı Testi: Bağlanma ve Ayrılma Zorluğu Değerlendirme — açıklama ve sınırlar](https://www.aligurtuna.com/ayrilik-kaygisi-testi-baglanma-ve-ayrilma-zorlugu-degerlendirme/)
- [Bağlanma Stili Testi: İlişki Bağlanma Eğilimi Değerlendirme — açıklama ve sınırlar](https://www.aligurtuna.com/baglanma-stili-testi-iliski-baglanma-egilimi-degerlendirme/)
- [Beden Algısı Testi: Beden Memnuniyeti ve Görünüm Baskısı — açıklama ve sınırlar](https://www.aligurtuna.com/beden-algisi-testi-beden-memnuniyeti-ve-gorunum-baskisi/)
- [Dikkat Dağınıklığı Testi: Odaklanma Güçlüğü Farkındalık Değerlendirmesi — açıklama ve sınırlar](https://www.aligurtuna.com/dikkat-daginikligi-testi-odaklanma-guclugu-farkindalik-degerlendirmesi/)
- [Duygu Düzenleme Güçlüğü Testi: Tepki ve Duygusal Denge Değerlendirme — açıklama ve sınırlar](https://www.aligurtuna.com/duygu-duzenleme-guclugu-testi-tepki-ve-duygusal-denge-degerlendirme/)
- [Duygudurum Bozukluğu Testi: Duygusal Dalgalanma ve Çökkünlük — açıklama ve sınırlar](https://www.aligurtuna.com/duygudurum-bozuklugu-testi-duygusal-dalgalanma-ve-cokkunluk/)

### Named author archives

Keep the author archive distinct from the specific work recorded in a source card.

- [Adnan Özer arşivi](https://www.babaminsiirdefteri.com/sair/adnan-ozer/)
- [Adnan Yücel arşivi](https://www.babaminsiirdefteri.com/sair/adnan-yucel/)
- [Afşar Timuçin arşivi](https://www.babaminsiirdefteri.com/sair/afsar-timucin/)
- [Ahmet Ada arşivi](https://www.babaminsiirdefteri.com/sair/ahmet-ada/)
- [Ahmet Erhan arşivi](https://www.babaminsiirdefteri.com/sair/ahmet-erhan/)
- [Ahmet Oktay arşivi](https://www.babaminsiirdefteri.com/sair/ahmet-oktay/)
- [Ahmet Telli arşivi](https://www.babaminsiirdefteri.com/sair/ahmet-telli/)
- [Ali Cengizkan arşivi](https://www.babaminsiirdefteri.com/sair/ali-cengizkan/)


## Owner-maintained analytical product references

These links point to the documentation and current access details for my separate AGProLabs products. The executable contracts above are independent examples: a product reference is not a claim that this repository implements its proprietary algorithm or validates trading outcomes. Start with the product purpose and interpretation limits.

- [AGPro Complete Platform](https://www.agprolabs.com/product/agpro-complete-platform/)
- [Dynamic Channels Elite AGPro Series](https://www.agprolabs.com/product/dynamic-channels-elite/)
- [Auto Fib Structure Planner AGPro Series](https://www.agprolabs.com/product/auto-fib-structure-planner/)
- [Liquidity Command Center Elite AGPro Series](https://www.agprolabs.com/product/liquidity-command-center-elite/)
- [Risk Reward Execution Matrix AGPro Series](https://www.agprolabs.com/product/risk-reward-execution-matrix/)
- [Volume Flow Reversal Elite AGPro Series](https://www.agprolabs.com/product/volume-flow-reversal-elite/)
- [Trade Management Planner Elite AGPro Series](https://www.agprolabs.com/product/trade-management-planner-elite/)
- [Adaptive Market Playbook AGPro Series](https://www.agprolabs.com/product/adaptive-market-playbook/)
- [Breaker Block Transition Planner AGPro Series](https://www.agprolabs.com/product/breaker-block-transition-planner/)
- [CME Gap Magnet AGPro Series](https://www.agprolabs.com/product/cme-gap-magnet/)
- [Confluence Alert Engine AGPro Series](https://www.agprolabs.com/product/confluence-alert-engine/)
- [Crypto Rotation Opportunity Matrix AGPro Series](https://www.agprolabs.com/product/crypto-rotation-opportunity-matrix/)
- [Divergence Reversal Decision Matrix AGPro Series](https://www.agprolabs.com/product/divergence-reversal-decision-matrix/)
- [Drawdown Defense Engine AGPro Series](https://www.agprolabs.com/product/drawdown-defense-engine/)
- [Edge Confidence Gauge AGPro Series](https://www.agprolabs.com/product/edge-confidence-gauge/)
- [Edge Consistency Gauge AGPro Series](https://www.agprolabs.com/product/edge-consistency-gauge/)
- [Expected Move Cone AGPro Series](https://www.agprolabs.com/product/expected-move-cone/)
- [Harmonic Completion Engine AGPro Series](https://www.agprolabs.com/product/harmonic-completion-engine/)
- [Institutional Reaction Planner Elite AGPro Series](https://www.agprolabs.com/product/institutional-reaction-planner-elite/)
- [Market Confirmation Engine AGPro Series](https://www.agprolabs.com/product/market-confirmation-engine/)
- [Market Tradability Gate AGPro Series](https://www.agprolabs.com/product/market-tradability-gate/)
- [Order Block Reclaim Matrix AGPro Series](https://www.agprolabs.com/product/order-block-reclaim-matrix/)
- [Position Scaling Engine AGPro Series](https://www.agprolabs.com/product/position-scaling-engine/)
- [R-Expectancy Surface AGPro Series](https://www.agprolabs.com/product/r-expectancy-surface/)
- [Rejection Block Execution Planner AGPro Series](https://www.agprolabs.com/product/rejection-block-execution-planner/)
- [Risk of Ruin Engine AGPro Series](https://www.agprolabs.com/product/risk-of-ruin-engine/)
- [Seasonal Edge Clock AGPro Series](https://www.agprolabs.com/product/seasonal-edge-clock/)
- [Structure Failure Recovery Matrix AGPro Series](https://www.agprolabs.com/product/structure-failure-recovery-matrix/)
- [Supply Demand Flip Matrix AGPro Series](https://www.agprolabs.com/product/supply-demand-flip-matrix/)
- [Support Resistance Continuation Matrix AGPro Series](https://www.agprolabs.com/product/support-resistance-continuation-matrix/)
- [Sweep Reclaim Decision Matrix AGPro Series](https://www.agprolabs.com/product/sweep-reclaim-decision-matrix/)
- [Target Ladder Confluence Planner AGPro Series](https://www.agprolabs.com/product/target-ladder-confluence-planner/)
- [Trade Conviction Engine AGPro Series](https://www.agprolabs.com/product/trade-conviction-engine/)
- [Trade Edge Profiler AGPro Series](https://www.agprolabs.com/product/trade-edge-profiler/)
- [Trade Excursion Engine AGPro Series](https://www.agprolabs.com/product/trade-excursion-engine/)
- [Trade Outcome Simulator AGPro Series](https://www.agprolabs.com/product/trade-outcome-simulator/)
- [Trendline Retest Execution Matrix AGPro Series](https://www.agprolabs.com/product/trendline-retest-execution-matrix/)
- [Volume Climax Trap Matrix AGPro Series](https://www.agprolabs.com/product/volume-climax-trap-matrix/)
- [VWAP Acceptance Execution Matrix AGPro Series](https://www.agprolabs.com/product/vwap-acceptance-execution-matrix/)


## More reading routes for the public example projects

Optional original-page references from projects maintained by Ali Gürtuna. Keep each source title with the question you are reviewing. These routes provide context for the examples; they are not independent endorsements, trading outcomes, personal health assessments or reproduced literary texts.

<details>
<summary>AGProLabs chart-review reading routes</summary>

- [Market breadth and watchlist context](https://www.agprolabs.com/insights/market-breadth-watchlist-context/)
- [Pre-market stock review checklist](https://www.agprolabs.com/insights/pre-market-stock-screening-checklist/)
- [Technical Analysis Tool Buying Checklist](https://www.agprolabs.com/insights/technical-analysis-tool-buying-checklist/)
- [Choosing a TradingView Indicator for Swing Trading](https://www.agprolabs.com/insights/tradingview-indicator-for-swing-trading/)
- [TradingView Tools for Traders with Limited Time](https://www.agprolabs.com/insights/tradingview-tools-for-busy-traders/)
- [TradingView Indicator Costs: What to Check](https://www.agprolabs.com/insights/tradingview-indicator-setup-costs/)
- [A Weekend Crypto Watchlist Review](https://www.agprolabs.com/insights/weekend-crypto-watchlist-review/)
- [Liquidity sweeps and breakouts](https://www.agprolabs.com/insights/liquidity-sweep-vs-breakout/)
- [Fair value gap context](https://www.agprolabs.com/insights/fair-value-gap-context/)
- [High-score candidates that remain blocked](https://www.agprolabs.com/insights/high-score-blocked-screener/)
- [Compare ETFs in a TradingView watchlist](https://www.agprolabs.com/insights/compare-etfs-tradingview-watchlist/)
- [Breakout, continuation and recovery](https://www.agprolabs.com/insights/breakout-vs-continuation-vs-recovery/)
- [Choose a paid TradingView indicator](https://www.agprolabs.com/insights/choose-paid-tradingview-indicator/)
- [Invalidation and stop-loss references](https://www.agprolabs.com/insights/invalidation-vs-stop-loss/)
- [Dynamic channels and manual trendlines](https://www.agprolabs.com/insights/dynamic-channels-vs-manual-trendlines/)
- [Trend and range analysis workflows](https://www.agprolabs.com/insights/trend-vs-range-trading-workflow/)
- [Long and short score conflicts](https://www.agprolabs.com/insights/long-short-score-conflict/)
- [Qualified candidates near resistance](https://www.agprolabs.com/insights/near-resistance-qualified-candidate/)
- [Channel-position percentages](https://www.agprolabs.com/insights/channel-position-percent/)
- [Broken-channel support and resistance](https://www.agprolabs.com/insights/broken-channel-support-resistance/)
- [About AGProLabs](https://www.agprolabs.com/about/)
- [Pricing](https://www.agprolabs.com/pricing/)
- [Trading Suite](https://www.agprolabs.com/product-category/trading-suite/)
- [Volume & Trap](https://www.agprolabs.com/product-category/volume-trap/)
- [Workflows](https://www.agprolabs.com/workflows/)

</details>

<details>
<summary>Health education reading routes</summary>

- [AliGurtuna health education](https://www.aligurtuna.com/)
- [Waist-to-hip ratio tool explanation](https://www.aligurtuna.com/bel-kalca-orani-hesaplama/)
- [Body-fat estimate tool explanation](https://www.aligurtuna.com/vucut-yag-orani-hesaplama-formulu/)
- [Nefroloji ve Böbrek Sağlığı Rehberi](https://www.aligurtuna.com/nefroloji-ve-bobrek-sagligi/)
- [Üroloji ve Erkek Sağlığı Rehberi](https://www.aligurtuna.com/erkek-sagligi-ve-uroloji/)
- [Göğüs Cerrahisi Rehberi](https://www.aligurtuna.com/gogus-cerrahisi/)
- [Romatoloji Rehberi](https://www.aligurtuna.com/romatoloji/)
- [Diyet ve beslenme konu arşivi](https://www.aligurtuna.com/diyet-beslenme/)
- [Uyku sağlığı konu arşivi](https://www.aligurtuna.com/uyku-sagligi/)
- [Ağız ve Diş Sağlığı Rehberi](https://www.aligurtuna.com/agiz-dis-sagligi/)
- [Alerji ve İmmünoloji Rehberi](https://www.aligurtuna.com/alerji-ve-immunoloji/)
- [Çocuk Cerrahisi Rehberi](https://www.aligurtuna.com/cocuk-cerrahisi/)

</details>

<details>
<summary>Literary reading routes</summary>

- [Babamın Şiir Defteri](https://www.babaminsiirdefteri.com/)
- [A. Kadir archive](https://www.babaminsiirdefteri.com/sair/a-kadir/)
- [Abbas Sayar archive](https://www.babaminsiirdefteri.com/sair/abbas-sayar/)
- [Abdülhak Hâmit Tarhan archive](https://www.babaminsiirdefteri.com/sair/abdulhak-hamit-tarhan/)
- [Neyzen Tevfik archive](https://www.babaminsiirdefteri.com/sair/neyzen-tevfik/)
- [Nilgün Marmara archive](https://www.babaminsiirdefteri.com/sair/nilgun-marmara/)
- [Pir Sultan Abdal archive](https://www.babaminsiirdefteri.com/sair/pir-sultan-abdal/)
- [Şeyh Galip archive](https://www.babaminsiirdefteri.com/sair/seyh-galip/)
- [Nâbî archive](https://www.babaminsiirdefteri.com/sair/nabi/)
- [Nedîm archive](https://www.babaminsiirdefteri.com/sair/nedim/)
- [Nef’î archive](https://www.babaminsiirdefteri.com/sair/nefi/)
- [Kaygusuz Abdal archive](https://www.babaminsiirdefteri.com/sair/kaygusuz-abdal/)

</details>


## Further source types for the review examples

Optional navigation through the three projects maintained by Ali Gürtuna. Use a relevant original source for its purpose and limitations. These links do not extend the executable examples into a commercial trading engine, clinical assessment or literary authority. This navigation update was prepared with AI assistance.

<details>
<summary>AGProLabs collection and service navigation</summary>

Choose a collection or guide by its analytical purpose. Read current payment and support information on the project website before selecting access.

- [Collections](https://www.agprolabs.com/collections/)
- [TradingView & Market Analysis Insights](https://www.agprolabs.com/insights/)
- [Payment Guide](https://www.agprolabs.com/payment-guide/)
- [Resolve access and payment questions with the right details](https://www.agprolabs.com/support/)

</details>

<details>
<summary>More health topics and measurement-tool explanations</summary>

Read the input definitions, units and stated limitations of a tool or educational article. These references are not implementations of the sample converter and do not validate a personal medical conclusion.

- [Acil Tıp Rehberi](https://www.aligurtuna.com/acil-tip/)
- [Alternatif Tıp ve GETAT Rehberi](https://www.aligurtuna.com/alternatif-tip-yontemleri/)
- [Anestezi, Ağrı ve Yoğun Bakım Rehberi](https://www.aligurtuna.com/anestezi-agri-ve-yogun-bakim/)
- [Bazal Metabolizma Hızı Hesaplama (BMH, BMR)](https://www.aligurtuna.com/bazal-metabolizma-hizi-hesaplama/)
- [Cilt Maskeleri: Doğal Ev Yapımı Yüz Maskesi Nasıl Yapılır?](https://www.aligurtuna.com/cilt-maskeleri/)
- [Çocuk Sağlığı ve Hastalıkları Rehberi](https://www.aligurtuna.com/cocuk-sagligi-ve-hastaliklari/)
- [Dermatoloji, Cilt Bakımı ve Estetik Rehberi](https://www.aligurtuna.com/dermatoloji/)
- [Diyabetik Ara Öğün Rehberi: Kan Şekeri İçin Ne Yemeli?](https://www.aligurtuna.com/diyabetik-ara-ogun-kan-sekeri-rehberi/)
- [Endokrinoloji ve Diyabet Sağlığı Rehberi](https://www.aligurtuna.com/endokrinoloji-ve-diyabet/)
- [Enfeksiyon Hastalıkları Rehberi](https://www.aligurtuna.com/enfeksiyon-hastaliklari/)
- [Fizik Tedavi ve Rehabilitasyon Sağlığı](https://www.aligurtuna.com/fizik-tedavi-ve-rehabilitasyon/)
- [Gastroenteroloji ve Sindirim Sağlığı](https://www.aligurtuna.com/gastroenteroloji/)
- [Genel Cerrahi ve Güvenli Ameliyat Rehberi](https://www.aligurtuna.com/genel-cerrahi/)
- [Genetik ve Nadir Hastalıklar Rehberi](https://www.aligurtuna.com/genetik-ve-nadir-hastaliklar/)
- [Geriatri ve Yaşlı Sağlığı Rehberi](https://www.aligurtuna.com/geriatri-ve-yasli-sagligi/)
- [Göğüs Hastalıkları ve Solunum Sağlığı Rehberi](https://www.aligurtuna.com/gogus-hastaliklari-ve-solunum-sagligi/)
- [Göz Hastalıkları ve Göz Sağlığı Rehberi](https://www.aligurtuna.com/goz-hastaliklari-ve-sagligi/)
- [Halk Sağlığı ve Koruyucu Hekimlik Rehberi](https://www.aligurtuna.com/halk-sagligi-ve-koruyucu-hekimlik/)
- [Hematoloji ve Kan Hastalıkları Rehberi](https://www.aligurtuna.com/hematoloji/)
- [İdeal Kilo Hesaplama Programı: Vücut Kitle İndeksi Hesabı](https://www.aligurtuna.com/ideal-kilo-hesaplama-programi/)
- [Kadın Sağlığı, Hamilelik ve Doğum Rehberi](https://www.aligurtuna.com/kadin-sagligi-hamilelik-ve-dogum/)
- [Kadınlarda Saç Dökülmesi Neden Olur? Nasıl Tedavi Edilir?](https://www.aligurtuna.com/kadinlarda-sac-dokulmesi/)
- [Kalori Açığı Hesaplama: Kilo Verme Hızı Değerlendirme](https://www.aligurtuna.com/kalori-acigi-hesaplama-kilo-verme-hizi/)
- [Kalp ve Damar Sağlığı Rehberi](https://www.aligurtuna.com/kalp-ve-damar-sagligi/)
- [Kulak Burun Boğaz Hastalıkları Rehberi](https://www.aligurtuna.com/kulak-burun-bogaz-kbb-sagligi/)
- [Laboratuvar Testleri ve Sağlık Tahlilleri](https://www.aligurtuna.com/laboratuvar-testleri-ve-tahlil/)
- [Makro Besin Hesaplama: Günlük Makro Dağılımı Değerlendirme](https://www.aligurtuna.com/makro-besin-hesaplama-gunluk-makro-dagilimi/)
- [Nöroloji ve Beyin Sağlığı Rehberi](https://www.aligurtuna.com/noroloji-ve-beyin-sagligi/)
- [Onkoloji ve Kanser Tanısı Rehberi](https://www.aligurtuna.com/onkoloji/)
- [Ortopedi ve Travma Sağlığı Rehberi](https://www.aligurtuna.com/ortopedi/)
- [Plastik, Estetik ve Onarıcı Cerrahi](https://www.aligurtuna.com/plastik-estetik-cerrahi/)
- [Genel Sağlık ve Yaşam Rehberi](https://www.aligurtuna.com/populer-saglik/)
- [Protein İhtiyacı Hesaplama: Günlük Protein Planı Değerlendirme](https://www.aligurtuna.com/protein-ihtiyaci-hesaplama-gunluk-protein-plani/)
- [Ruh Sağlığı ve Psikoloji Rehberi](https://www.aligurtuna.com/ruh-sagligi-ve-psikoloji/)
- [Sağlıklı Yaşam Sırları ve Önerileri Rehberi](https://www.aligurtuna.com/saglikli-yasamin-sirlari/)
- [Sık İdrara Çıkma Neden Olur? Nasıl Tedavi Edilir?](https://www.aligurtuna.com/sik-idrara-cikma/)
- [Spor Hekimliği ve Egzersiz Sağlığı Rehberi](https://www.aligurtuna.com/spor-hekimligi-ve-egzersiz-sagligi/)
- [Vitamin, Mineral ve Takviye Sağlığı](https://www.aligurtuna.com/vitaminler-mineraller-saglik-takviyeleri/)
- [Yağsız Vücut Kütlesi Hesaplama: Vücut Kompozisyonu Değerlendirme](https://www.aligurtuna.com/yagsiz-vucut-kutlesi-hesaplama-vucut-kompozisyonu/)

</details>

<details>
<summary>Additional self-awareness resource explanations</summary>

Separate a questionnaire’s stated scope from a personal diagnosis. Review the purpose and limitations on the original Turkish resource page; this repository handles no questionnaire answers.

- [Duygusal Hassasiyet Testi](https://www.aligurtuna.com/duygusal-hassasiyet-testi-duygusal-yuk-ve-duyarlilik-degerlendirme/)
- [Duygusal Yeme Testi: Yeme Tutumu ve Açlık Dışı Yeme Değerlendirme](https://www.aligurtuna.com/duygusal-yeme-testi-yeme-tutumu-ve-aclik-disi-yeme-degerlendirme/)
- [Duygusal Zeka Testi: Duyguları Anlama ve Yönetme Değerlendirme](https://www.aligurtuna.com/duygusal-zeka-testi-duygulari-anlama-ve-yonetme-degerlendirme/)
- [İlişki Bağımlılığı Testi: Duygusal Bağımlılık ve Sınırlar](https://www.aligurtuna.com/iliski-bagimliligi-testi-duygusal-bagim-ve-sinirlar/)
- [İmpostor Sendromu Testi: Başarıyı Sahiplenme Zorluğu](https://www.aligurtuna.com/impostor-sendromu-testi-basariyi-sahiplenme-zorlugu/)
- [İş Stresi Testi: Çalışma Yükü ve Gerginlik Değerlendirme](https://www.aligurtuna.com/is-stresi-testi-calisma-yuku-ve-gerginlik-degerlendirme/)
- [Karar Yorgunluğu Testi](https://www.aligurtuna.com/karar-yorgunlugu-testi-zihinsel-tukenme-ve-karar-zorlugu-degerlendirme/)
- [Mükemmeliyetçilik Testi](https://www.aligurtuna.com/mukemmeliyetcilik-testi-kontrol-ve-hata-kaygisi-degerlendirme/)
- [Öfke Kontrolü Testi: Öfke Yönetimi ve Tepki Düzeni Değerlendirme](https://www.aligurtuna.com/ofke-kontrolu-testi-ofke-yonetimi-ve-tepki-duzeni-degerlendirme/)
- [Özgül Fobi Testi: Özel Korku ve Kaçınma Değerlendirme](https://www.aligurtuna.com/ozgul-fobi-testi-ozel-korku-ve-kacinma-degerlendirme/)
- [Özgüven Testi: Kendine Güven Düzeyi Değerlendirme](https://www.aligurtuna.com/ozguven-testi-kendine-guven-duzeyi-degerlendirme/)
- [Reddedilme Duyarlılığı Testi: İlişki ve Onay Hassasiyeti](https://www.aligurtuna.com/reddedilme-duyarliligi-testi-iliski-ve-onay-hassasiyeti/)
- [Sağlık Anksiyetesi Testi: Hastalık Kaygısı Ön Değerlendirme](https://www.aligurtuna.com/saglik-anksiyetesi-testi-hastalik-kaygisi-on-degerlendirme/)
- [Sınav Kaygısı Testi](https://www.aligurtuna.com/sinav-kaygisi-testi-performans-baskisi-ve-sinav-stresi-degerlendirme/)
- [Sosyal Anksiyete Testi: Sosyal Kaygı Belirti Değerlendirme](https://www.aligurtuna.com/sosyal-anksiyete-testi-sosyal-kaygi-belirti-degerlendirme/)
- [Sosyal Medya Bağımlılığı Testi: Ekran ve Kontrol Değerlendirme](https://www.aligurtuna.com/sosyal-medya-bagimliligi-testi-ekran-ve-kontrol-degerlendirme/)
- [Uyku Kalitesi Testi: Uyku Düzeni ve Dinlenme Değerlendirme](https://www.aligurtuna.com/uyku-kalitesi-testi-uyku-duzeni-ve-dinlenme-degerlendirme/)

</details>

<details>
<summary>Additional author archives and work reviews</summary>

An author archive, a work review and a family note are different source types. Keep the named work and your own interpretation distinct. Only navigation links are included here; no poem or book text is reproduced.

- [Abbas Sayar – Çelo (Eser İncelemesi)](https://www.babaminsiirdefteri.com/abbas-sayar-celo-eser-incelemesi/)
- [Abbas Sayar – Yılkı Atı (Eser İncelemesi)](https://www.babaminsiirdefteri.com/abbas-sayar-yilki-ati-eser-incelemesi/)
- [Abdülhak Şinasi Hisar – Çamlıca’daki Eniştemiz (Eser İncelemesi)](https://www.babaminsiirdefteri.com/abdulhak-sinasi-hisar-camlicadaki-enistemiz-eser-incelemesi/)
- [Abdülhak Şinasi Hisar – Fahim Bey ve Biz (Eser İncelemesi)](https://www.babaminsiirdefteri.com/abdulhak-sinasi-hisar-fahim-bey-ve-biz-eser-incelemesi/)
- [Adalet Ağaoğlu – Bir Düğün Gecesi (Eser İncelemesi)](https://www.babaminsiirdefteri.com/adalet-agaoglu-bir-dugun-gecesi-eser-incelemesi/)
- [Adalet Ağaoğlu – Fikrimin İnce Gülü (Eser İncelemesi)](https://www.babaminsiirdefteri.com/adalet-agaoglu-fikrimin-ince-gulu-eser-incelemesi/)
- [Adalet Ağaoğlu – Hayır… (Eser İncelemesi)](https://www.babaminsiirdefteri.com/adalet-agaoglu-hayir-incelemesi/)
- [Adalet Ağaoğlu – Ölmeye Yatmak (Eser İncelemesi)](https://www.babaminsiirdefteri.com/adalet-agaoglu-olmeye-yatmak-eser-incelemesi/)
- [Rüzgârlı Tepe: Şiir Kitabım](https://www.babaminsiirdefteri.com/ruzgarli-tepe-siir-kitabim-saban-gurtuna/)
- [Şaban Gürtuna Kimdir? Emekli Öğretmen ve Şair](https://www.babaminsiirdefteri.com/saban-gurtuna/)
- [A. Vahap Akbaş](https://www.babaminsiirdefteri.com/sair/a-vahap-akbas/)
- [Abdülbaki Gölpınarlı](https://www.babaminsiirdefteri.com/sair/abdulbaki-golpinarli/)
- [Abdülhak Şinasi Hisar](https://www.babaminsiirdefteri.com/sair/abdulhak-sinasi-hisar/)
- [Abdülkadir Bulut](https://www.babaminsiirdefteri.com/sair/abdulkadir-bulut/)
- [Abdullah Öztemiz Hacıtahiroğlu](https://www.babaminsiirdefteri.com/sair/abdullah-oztemiz-hacitahiroglu/)
- [Adalet Ağaoğlu](https://www.babaminsiirdefteri.com/sair/adalet-agaoglu/)
- [Agatha Christie](https://www.babaminsiirdefteri.com/sair/agatha-christie/)
- [Ahmet Kutsi Tecer](https://www.babaminsiirdefteri.com/sair/ahmet-kutsi-tecer/)
- [Ahmet Mithat Efendi](https://www.babaminsiirdefteri.com/sair/ahmet-mithat-efendi/)
- [Ahmet Muhip Dıranas](https://www.babaminsiirdefteri.com/sair/ahmet-muhip-diranas/)
- [Ahmet Selçuk İlkan](https://www.babaminsiirdefteri.com/sair/ahmet-selcuk-ilkan/)
- [Ahmet Ümit](https://www.babaminsiirdefteri.com/sair/ahmet-umit/)
- [Akgün Akova](https://www.babaminsiirdefteri.com/sair/akgun-akova/)
- [Albert Camus](https://www.babaminsiirdefteri.com/sair/albert-camus/)
- [Aldous Huxley](https://www.babaminsiirdefteri.com/sair/aldous-huxley/)
- [Aleksandr Puşkin](https://www.babaminsiirdefteri.com/sair/aleksandr-puskin/)
- [Alexandre Dumas](https://www.babaminsiirdefteri.com/sair/alexandre-dumas/)
- [Alfonsina Storni](https://www.babaminsiirdefteri.com/sair/alfonsina-storni/)
- [Alfred de Musset](https://www.babaminsiirdefteri.com/sair/alfred-de-musset/)
- [Ali Püsküllüoğlu](https://www.babaminsiirdefteri.com/sair/ali-puskulluoglu/)
- [Ataol Behramoğlu](https://www.babaminsiirdefteri.com/sair/ataol-behramoglu/)
- [Attila İlhan](https://www.babaminsiirdefteri.com/sair/attila-ilhan/)
- [Behçet Necatigil](https://www.babaminsiirdefteri.com/sair/behcet-necatigil/)
- [Cahit Külebi](https://www.babaminsiirdefteri.com/sair/cahit-kulebi/)
- [Cahit Sıtkı Tarancı](https://www.babaminsiirdefteri.com/sair/cahit-sitki-taranci/)
- [Can Yücel](https://www.babaminsiirdefteri.com/sair/can-yucel/)
- [Cemal Süreya](https://www.babaminsiirdefteri.com/sair/cemal-sureya/)
- [Dadaloğlu](https://www.babaminsiirdefteri.com/sair/dadaloglu/)
- [Ece Ayhan](https://www.babaminsiirdefteri.com/sair/ece-ayhan/)
- [Edip Cansever](https://www.babaminsiirdefteri.com/sair/edip-cansever/)
- [Enis Batur](https://www.babaminsiirdefteri.com/sair/enis-batur/)
- [Fazıl Hüsnü Dağlarca](https://www.babaminsiirdefteri.com/sair/fazil-husnu-daglarca/)
- [Fuzûlî](https://www.babaminsiirdefteri.com/sair/fuzuli/)
- [Gülten Akın](https://www.babaminsiirdefteri.com/sair/gulten-akin/)
- [Karacaoğlan](https://www.babaminsiirdefteri.com/sair/karacaoglan/)
- [Köroğlu](https://www.babaminsiirdefteri.com/sair/koroglu/)
- [Lale Müldür](https://www.babaminsiirdefteri.com/sair/lale-muldur/)
- [Mehmet Akif Ersoy](https://www.babaminsiirdefteri.com/sair/mehmet-akif-ersoy/)
- [Melih Cevdet Anday](https://www.babaminsiirdefteri.com/sair/melih-cevdet-anday/)
- [Metin Altıok](https://www.babaminsiirdefteri.com/sair/metin-altiok/)
- [Murathan Mungan](https://www.babaminsiirdefteri.com/sair/murathan-mungan/)
- [Nâzım Hikmet Ran](https://www.babaminsiirdefteri.com/sair/nazim-hikmet/)
- [Necip Fazıl Kısakürek](https://www.babaminsiirdefteri.com/sair/necip-fazil-kisakurek/)
- [Oktay Rifat](https://www.babaminsiirdefteri.com/sair/oktay-rifat/)
- [Orhan Veli Kanık](https://www.babaminsiirdefteri.com/sair/orhan-veli-kanik/)
- [Özdemir Asaf](https://www.babaminsiirdefteri.com/sair/ozdemir-asaf/)
- [Şaban Gürtuna](https://www.babaminsiirdefteri.com/sair/saban-gurtuna/)
- [Sezai Karakoç](https://www.babaminsiirdefteri.com/sair/sezai-karakoc/)
- [Şiir Türleri](https://www.babaminsiirdefteri.com/sair/siir-turleri/)
- [Turgut Uyar](https://www.babaminsiirdefteri.com/sair/turgut-uyar/)
- [Ümit Yaşar Oğuzcan](https://www.babaminsiirdefteri.com/sair/umit-yasar-oguzcan/)
- [Yunus Emre](https://www.babaminsiirdefteri.com/sair/yunus-emre/)

</details>


## Selected source routes for manual review

These original pages are maintained by the repository author. Use them for their scope and sources; the sample code does not validate trading outcomes, individual medical assessments or literary interpretations.

- [Circumcision timing — educational reading and clinical context](https://www.aligurtuna.com/sunnet-ne-zaman-yapilmali/)
- [PubMed and MEDLINE — Turkish research-search guide](https://www.aligurtuna.com/pubmed-medline-turkce-arama/)
- [Mustafa Kemal Atatürk — works, reviews and summaries](https://www.babaminsiirdefteri.com/sair/mustafa-kemal-ataturk/)
- [Choosing an e-book reader for novels, poetry and PDF](https://www.babaminsiirdefteri.com/e-kitap-okuyucu-secimi/)
