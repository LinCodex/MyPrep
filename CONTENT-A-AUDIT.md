# Bank A content audit — 2026-10-13

`private-pilot-prep/dist/data/bank-a.json` contains 280 distinct original practice questions: regulations 60, airspace 60, airports 50, weather 80, human factors 30. These are original FAA-based practice items, not copies of a commercial bank, not claims to reproduce live FAA questions, and not an endorsement or instructor review.

## Evidence and verification

- Official eCFR Parts 61 and 91: downloaded complete XML using the official versioner API, dated 2026-10-08, into `sources/part61-a.xml` and `sources/part91-a.xml`. Relevant sections were inspected against the keyed regulatory requirements. Online eCFR also displayed currency through October 8, 2026. Citations point directly to each regulation with paragraph locators. This is the accessible current snapshot; no claim is made to know later unpublished changes.
- FAA Pilot’s Handbook of Aeronautical Knowledge, FAA-H-8083-25C (2023): actual text inspected in chapters 2, 14, 15, 16, and 17, plus chapter 12 frost. Source is https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf . Used for stable principles, signs/markings, ADM and aeromedical material, not to override newer regulations.
- FAA Aviation Weather Handbook, FAA-H-8083-28B (2026), signed April 2, 2026: actual paragraphs inspected for atmosphere, pressure, moisture, adiabatic cooling, winds, fronts, stability, fog, icing, thunderstorm development/avoidance, METAR/SPECI, PIREPs, AIRMET/SIGMET, TAF, and winds aloft. Source is https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf . All weather questions have actual PDF-page anchors derived from document page markers, plus precise numbered subsection locators.
- Current online FAA AIM chapters 2, 3 and 4: inspected relevant sections for airport markings/lights, class-specific communications, CTAF, ATIS, taxi crossing/hold-short readbacks, LAHSO, and runway status light actions. Individual question citations point to their chapter-section page and specify the numbered paragraph.
- FAA Aeronautical Chart Users’ Guide effective July 9, 2026: downloaded actual PDF/text, verified VFR airspace-symbol definitions on PDF pages 16–17. Source is https://aeronav.faa.gov/user_guide/cug-complete_20260709.pdf . Chart-symbol items cite this source instead of relying on older chart revision schedules in the PHAK.
- FAA-S-ACS-6C (2024): every assigned ACS code checked for existence in the downloaded ACS text. Codes were selected for the tested knowledge rather than randomly assigned.

## Current-rule details specifically checked

- BasicMed reflects 7 authorized occupants, no more than 6 passengers, and maximum takeoff weight not more than 12,500 pounds; avoids the obsolete 6-occupant/6,000-pound limits. Education course and physical intervals use calendar months from current 61.23.
- Third-class duration uses age **at examination** and end-of-month expiration, not current age or a day count.
- Passenger night-currency interval is distinguished from the sunset-to-sunrise position-light rule.
- Class G minima explicitly state AGL, MSL and day/night conditions and limit the traffic-pattern exception to its specific conditions.
- Class B needs explicit clearance; Class C/D communications facts use actual call-sign examples from current AIM.
- Shared-expense scenario states an otherwise permissible common-purpose flight and limits cost sharing to allowed items. The bank does not imply a right to publicly offer passenger transport.
- 100-hour overrun is limited to inspection-bound ferry time and does not extend annual inspections.
- AIRMET questions distinguish Alaska/Hawaii text categories from CONUS graphical products. Data-linked radar is described as strategic information with latency, not a tactical storm-gap tool.

## Structural and numerical checks

`gen-content-a.py` checks exact category counts, unique IDs/prompts, three distinct choices, keyed-choice presence, and valid ACS codes before writing JSON. Correct answers are distributed across stable a/b/c IDs (94/92/94). Generated output has 93 objectives, with 240 questions belonging to multi-question objective groups so the adaptive engine can select related unseen items. Closely related study facts are grouped by learning objective (for example Class E VFR minima or METAR sky decoding), without changing their distinct prompts.

The shared-cost calculation was independently recomputed ($300 divided among three occupants = $100 minimum pilot share). Runway designation and FB 7545 decoding were recomputed from source definitions. This bank does not create runtime calculation templates; those are owned by the application implementation. No question requires an unseen figure; all scenarios can be answered from their text. Appropriate FAA figures may supplement explanations, but none are falsely cited as required test-supplement figures.

## Limits and review notes

Source checking here means keyed facts were matched to inspected government material and citations, followed by mechanical structure checking. It does not constitute independent aviation-instructor review or empirical exam validation. Explanations are original paraphrases, consistently FAA-based; no purported verbatim FAA quotations are included. Conceptual unseen pools can run out, so the app must label repeat review truthfully instead of inventing new regulatory facts. Printed subsection locators are retained where an exact PDF-page anchor could not be safely derived. The root content audit should incorporate the applicable PHAK addendum review and retain content-version/date labeling.

Root integration note: October 2025 PHAK addendum reviewed, including medical qualification, light-sport classifications, and preventive maintenance. Regulatory questions use the current official eCFR snapshot rather than superseded handbook text.
