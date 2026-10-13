# Private Pilot Prep

Personal FAA PAR study webapp. Buildless HTML/CSS/JavaScript with IndexedDB, a service worker, versioned question banks, and a deterministic adaptive practice engine. The bank ships with 600 foundational questions and 60 added figure questions; 69 questions use 33 authentic FAA figures.

## Run

`node scripts/build.mjs` validates the base bank and generates the offline cache worker. `node scripts/serve.mjs` serves http://127.0.0.1:4173.

The hosted deployment uses `.openai/hosting.json` and the Sites source/publishing helper. Preserve its project ID. No runtime secrets or paid APIs are required.

## Vercel

Import this repository with the repository root as Root Directory. `vercel.json` selects the Other framework preset, runs `npm run build`, and serves `dist/`, where `index.html` and the app assets live. Do not set the Root Directory to `dist`; the build script and deployment configuration are in the repository root. Git pushes to `main` trigger a production deployment when the repository is connected to Vercel. No environment variables are required.

## Tests

`node --test scripts/engine.test.mjs` checks scoring, schedules, exam proportions/timing, 500 independently recomputed generated scenarios, adaptive batches, import safety, and full backup fidelity. The ACS-existence content check uses `work/sources/acs.txt` in the original workspace; the source archive includes an ACS code index for portable checks.

`node scripts/browser.test.cjs` runs desktop/mobile, feedback, offline reload, timer expiry, backup round trip, figure zoom, journal, and service-worker update checks. It uses the Codex bundled Playwright path and Chrome executable; replace those paths for another environment.

## Content updates

1. Edit the versioned question JSON files in `dist/data/` and check each answer against current official sources. Preserve an existing ID when the learning objective is unchanged. Use new IDs for different questions.
2. Maintain category counts for the initial 600-question base release. Additional authored content should ship as packs, or revise the build count checks intentionally for a new base release.
3. Increment `VERSION` in `dist/engine.mjs`, then run the build and tests. The service-worker cache name includes that version.
4. Publish the exact pushed source with a matching deployment archive through Sites.

State lives in the separate IndexedDB `private-pilot-prep`, object store `state`, key `main`. No update/reset operation deletes that database. Completed exams and saved sessions contain frozen question snapshots, so source changes do not rewrite their histories. Schema 1 backup compatibility must be preserved; future changes require explicit nondestructive migrations.

## Add a question pack

Settings imports JSON of this shape:

```json
{"format":"private-pilot-prep-pack","version":1,"questions":[]}
```

Each item has `id`, one of the 12 `category` IDs, `objective`, `prompt`, exactly three `choices` (`id`, `text`, `why`), `answer`, `explanation`, `acs`, `references`, `figure` (optional), and `kind: "authored"`. References identify `title`, official HTTPS `url`, `locator`, `edition`, and `verified` date. See an existing bank item for the full example. Use globally unique IDs and distinct prompts. The import checks structure and references, not factual accuracy; independently verify imported content. Imported figures may reference only bundled local assets.

## Adaptive behavior

Incorrect scored answers queue focused practice. Related unseen bank items come first; eligible numeric templates generate enough distinct parameter sets to approach ten questions. Repeats are labeled when conceptual pools run out. Generated items persist separately, with provenance pointing to their source question. New practice does not extend the current session. Mock exams sample authored content using fixed category proportions rather than accumulated variant counts.

## Boldmethod

Publisher links and a user-entered local journal only. No scraping, copied quizzes, or automatic in-app quiz import. A permitted publisher feed/license would be a separate integration.
