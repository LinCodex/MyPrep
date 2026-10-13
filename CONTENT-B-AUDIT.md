# Question bank B — author verification

Dataset: `work/private-pilot-prep/dist/data/bank-b.json`. 320 original questions: aerodynamics 50, aircraft systems 40, instruments 40, performance 50, weight and balance 40, navigation 60, planning 40. Generated with `work/build_bank_b.py`; independently checked by `work/verify_bank_b.py`.

## Sources and checks

- Read the locally downloaded FAA-H-8083-25C (2023) chapter text and targeted supporting passages. Each question cites a one-based PDF page anchor and the corresponding printed chapter-page number. Foundational aerodynamics uses Chapters 4–6; aircraft systems Chapters 6–8; instruments Chapter 8 and the glossary; performance Chapter 11; weight/balance Chapter 10; navigation/planning Chapter 16 and relevant fuel/radar sections.
- Checked every stored ACS code against the downloaded FAA-S-ACS-6C text. Specific subsystem and navigation knowledge codes are used rather than invented codes.
- Spin definition additionally checked against the official Airplane Flying Handbook FAA-H-8083-3C Chapter 5, printed page 5-22, which explicitly describes a stall with yaw/sideslip. Linked directly to that chapter PDF, page 22.
- No commercial question-bank wording was copied. No claim of instructor review, FAA endorsement, live exam-bank matching, or guaranteed exam outcome is made.
- Answers are FAA-based paraphrases. All FAA texts remain linked externally; the app stores original explanations and selected official training figures.

## Numerical verification

The separate verification script recomputes 41 stored numeric answers and verifies 4 UTC/time-rollover cases. These include moments, negative arms, total weights/moments, scaled moment indexes, CG after adding/removing/shifting loads, fuel-burn CG movement, useful load, fuel weight, payload, time/speed/distance, wind arithmetic, variation, relative bearing, DME slant range, chart scale, fuel budgets, endurance, range, climb/descent timing, and figure-based wind/landing calculations. It also checks unique IDs/prompts, three distinct options, answer IDs, FAA URLs, ACS codes, nine figure tasks, and seven supported adaptive-template seeds.

## Figure verification

Rendered and visually inspected full official supplementary pages at 1.7× scale. Nine questions require actual figure interpretation; base counts are preserved by replacing conceptual examples.

| Figure | PDF page | Question IDs | Verified interpretation |
|---|---:|---|---|
| 2 — Load Factor Chart | 36 | aerodynamics-038 | 60° level bank gives 2 G; independently checked 1/cos(60°). |
| 20 — Sectional Chart Excerpt | 53 | navigation-021, navigation-023 | Red area 2 is Lake Drummond; NORFOLK facility box identifies ORF on 116.9 MHz. |
| 32 — Weight and Balance Tables | 63 | weightbalance-028 | 2,015-lb empty baseline; MOM/100 1,554; front 150→128, rear 170→206, baggage 40→56, main fuel 20 gal→120 lb/90. Loaded CG is 203,400/2,495=81.5 in. Oil is included in that baseline. |
| 34 — Weight and Balance Graphs | 65 | weightbalance-014, weightbalance-029 | Baggage/child-seat station maximum 120 lb; 8-qt oil load is 15 lb at −0.2 MOM/1,000 and is excluded from empty weight. |
| 36 — Crosswind Component Graph | 67 | performance-010 | 40-kt wind at 30° gives 20-kt crosswind; confirmed independently using sine. |
| 38 — Landing Distance Table | 69 | performance-013, performance-028 | 1,600 lb at sea level/59°F: 445-ft ground roll, 1,075-ft total over 50-ft obstacle. Dry-grass note adds 20% of the TOTAL obstacle distance to either value: ground roll becomes 660 ft. |

Figure 38 is physically printed sideways in the source PDF. Root should provide a readable rotated render or an orientation control alongside zoom. Figure 20 is expressly a historical training excerpt, not current navigation information. No generated variants use these historical figures or extrapolate beyond chart bounds.

## Adaptive seeds and content boundary

Seven authored records support root's offline generator: navigation-051 time, navigation-052 speed, navigation-053 distance, planning-026 time, planning-027 fuel, planning-037 distance, and weightbalance-034 weightbalance. Their explanatory formulas, units, and no-reserve assumptions are explicit. Conceptual expansion relies on the authored pool and labeled repeat review rather than inventing unverified facts.

The FAA index currently lists October 2025 addenda for PHAK25C and AFH3C. Root was notified to review those addenda before making a current-source claim. Verification here is author checking against FAA publications and independent arithmetic, not a second aviation instructor's audit.

Root integration note: learning objectives were grouped into 55 focused topics so conceptual mistakes can select related unseen questions. No answer, prompt, or reference changed. Runtime variants may use an existing verified template in the same learning objective. Root visually inspected rotated Figure 38 and reviewed the October 2025 PHAK/AFH addenda; their changes do not alter the specific spin, systems, aerodynamic, loading, or navigation facts used here.
