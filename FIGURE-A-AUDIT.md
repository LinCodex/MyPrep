# Figure expansion A — content audit, 2026-10-13

`dist/data/figures-a.json` adds **24 original, figure-dependent questions**, comprising **16 weather** and **8 airport** items. Existing `bank-a.json` was not modified. Each new item requires reading an authentic FAA testing-supplement image rather than displaying an unrelated decorative illustration. IDs are `fig-a-001` through `fig-a-024`; all items use three choices, a stable answer key, per-choice reasoning, FAA-based paraphrase, an ACS code, and source citations.

## Verified coverage and asset mapping

All page numbers below are **one-based PDF pages**, checked against actual page markers and rendered images. Do not infer PDF pages from figure numbers because figure numbering skips 16.

| Questions | Figure | PDF page | Printed page | Reading skill |
|---|---:|---:|---|---|
| fig-a-001–004 | 12 | 46 | 2-12 | METAR visibility/ceiling, scattered layers, winds/gusts, RVR |
| fig-a-005–007 | 14 | 48 | 2-14 | PIREP icing and turbulence layers, altitude/temperature |
| fig-a-008–010 | 15 | 49 | 2-15 | KOKC TAF validity, FM conditions, TEMPO interval |
| fig-a-011–014 | 17 | 50 | 2-16 | High-speed winds aloft, missing temperatures, column comparison, omitted negative sign |
| fig-a-015–016 | 19 | 52 | 2-18 | SIGWX IFR area and turbulence top/base layer |
| fig-a-017 | 9 | 43 | 2-9 | Wind-arrow direction and quartering-tailwind taxi controls |
| fig-a-018 | 47 | 78 | 2-44 | Actual red/white two-bar VASI illustration |
| fig-a-019 | 48 | 79 | 2-45 | Airport-diagram runway-closure X markings |
| fig-a-020 | 49 | 80 | 2-46 | Closed runway pair versus displaced-threshold arrows |
| fig-a-021 | 50 | 81 | 2-47 | Windsock opening/taper relative to the north arrow |
| fig-a-022 | 64 | 95 | 2-61 | Labeled ILS critical-area holding-position pavement marking |
| fig-a-023–024 | 65 | 96 | 2-62 | Taxiway location versus direction sign; runway distance-remaining sign |

Required assets use `assets/figure-N.png`. **All twelve pages are upright portrait and require no rotation.** Weather figures 12, 14, 15 and 17 occupy mainly the upper page: the UI must support source-resolution zoom rather than relying on a tiny full-page thumbnail. Inspection copies are in `work/figure-a-research/`; root owns publication asset rendering.

## Grounding and answer checks

- Visually rendered and inspected every listed FAA-CT-8080-2H (June 2018) page before authoring. Captions, labels, table cells, map legends, north arrow and colors were checked directly. Source: https://www.faa.gov/sites/faa.gov/files/training_testing/testing/supplements/sport_rec_private_akts.pdf .
- Matched decoding rules to the actual FAA-H-8083-28B (2026) text: METAR sections 24.4.3.5–9, PIREP 24.5.1.4/8/10/11, TAF 27.4.2.4/6/10, winds aloft 27.2.1.1/1.1.1, SIGWX 27.9.1.2.1–2. Each item also links its authentic figure at the correct PDF page.
- Matched visual airport facts to inspected FAA-H-8083-25C chapter 14: VASI, closed runway Xs, windsocks, ILS critical-area markings, and location/direction/distance-remaining signs.
- Taxi controls independently supported by the actual FAA-H-8083-3C (2021), chapter 2 PDF page 19, printed 2-19. It calls for upwind aileron DOWN and elevator DOWN with quartering tailwind. Figure 9 arrow C comes from the left rear; left aileron DOWN corresponds to wheel RIGHT. Source: https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/airplane_handbook/03_afh_ch2.pdf#page=19 .
- Recomputed the 730649 high-wind decoding: `(73−50)×10 = 230°`, `06+100 = 106 kt`, temperature `−49°C`. Compared the actual 12,000-foot cells ALS 35 kt, DEN 34 kt, STL 39 kt. Confirmed 236143 at MKC 30,000 feet is 230°/61 kt/−43°C. Checked all day-hour and hundred-foot conversions independently.
- Mechanically validated the 24 unique IDs/prompts, exactly three distinct choices, one keyed choice, weather/airport counts 16/8, actual ACS-code existence, and twelve distinct figure paths. Answer IDs are balanced 8/8/8. Source-based matching is not aviation-instructor review.

## Historical-product limits

Weather images are historical source examples, explicitly labeled as such in explanations. They are not current observations, navigation charts, terminal forecasts, or flight-planning data. Figure 19 is an April 2012 chart; its own legend controls color interpretation, and the current handbook warns that display colors can vary by provider.

Figure 15 includes legacy PROB40/BECMG groups and inconsistent KMEM day groups. Questions use only the internally interpretable KOKC validity, FM051600, and TEMPO0513/0516 portions. They do not teach legacy groups as current NWS issuance practice. Figure 12’s historic RVR omits the FT suffix; the explanation explicitly distinguishes the modern U.S. coding format.

The taxi item uses a conventional-control tricycle-gear case with a POH reminder. The windsock annotation arrow is not mistaken for a wind-direction vector. Diagram 48 and 49 items carry a training-chart note. The set broadens coverage of authentic figure interpretation but does not claim to exhaust the FAA supplement or replicate live examination questions. Root should complete asset zoom/offline tests and incorporate these files into the expanded bank.
