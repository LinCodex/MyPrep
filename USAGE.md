# Private Pilot Prep

Your personal FAA Private Pilot Airplane (PAR) practice app. Original FAA-based questions, adaptive practice, and explanations with official references.

## Start studying

1. Open the app online and give the app a moment to download its offline content.
2. Start with **Today → Start daily practice**, or choose a subject in **Categories**.
3. Select an answer, then **Check answer**. Incorrect answers show the correct choice, an FAA-based explanation, the reason your choice is wrong, references, and any required figure.
4. After the session, try the extra practice prepared for your missed learning objectives. Numeric topics can add new checked scenarios; conceptual topics use the verified bank and clearly label repeat review.
5. Use **Memorize** for visible correct answers. This does not increase scores or exam readiness.
6. Take **Exams → Start mock exam** to practice 60 questions in 120 minutes. The timer continues after closing or backgrounding the app. Explanations appear after submission.

Aim for three consecutive mock scores of 90% or higher, and review subjects below 80% on their latest 20 scored answers. These are practice targets, not an endorsement or a guaranteed result. Question wording on the actual exam may differ.

## Install and study offline

- iPhone/iPad Safari: **Share → Add to Home Screen**.
- Android Chrome: browser menu → **Install app** or **Add to Home screen**.
- Desktop: use your browser's install option if offered.

The app, question content, explanations, and included FAA figures are cached locally. Opening external FAA references and Boldmethod requires internet access. Initial access to the private hosted site requires signing in with the owner's ChatGPT account. Private-hosted authentication and home-screen behavior can vary by browser; local browser tests confirm the app's offline mechanics, not every mobile device's authentication flow.

Use **Categories → Practice figures** for a mixed 20-question session, or choose **Figure questions** in the custom filter of any category. Zoom controls and scrolling let you inspect the original FAA figures. Dropdowns support keyboard navigation, and subtle animations respect reduced-motion preferences.

## Keep your progress

Use **Settings → Export backup** regularly. It includes answer history, exams with their original question snapshots and answer orders, bookmarks, generated variants, imported packs, a saved session, preferences, and your Boldmethod journal.

**Import backup** validates the file before asking to replace this device's record. Export first if you need to keep the current record too.

App updates do not reset IndexedDB. Updates are checked when the app opens, regains focus, and once per minute while visible. An update waits while a study session is saved, then activates after that session finishes. Clearing browser/site data, uninstalling with data removal, switching browsers, or using another device can remove or hide the local record. There is no cloud sync. A backup transfers progress between devices or between local preview and the hosted app.

## Boldmethod quizzes

**Exams → Beyond the question bank**, or the **Boldmethod quizzes** section, opens the publisher's current quiz lists. Take the quiz and see answers/explanations on Boldmethod. Record the quiz URL and optional score in the app's journal.

The app does not scrape or copy Boldmethod's questions. The user chose official links because there is no permission or licensed feed for in-app imports. The link reaches the publisher's current list; the app does not claim to detect or import each newly published quiz automatically. Journal entries are included in backups and retained during app updates.

## Content and references

- 600 original foundational questions plus 60 added figure questions: 660 authored questions across 12 categories, with no fixed total-bank cap.
- Verified calculation templates support time, groundspeed, distance, fuel endurance, and loaded CG.
- Five template families recompute answers from their generated inputs. Fuel endurance scenarios explicitly exclude regulatory reserves; add the required reserve when planning a flight.
- FAA-H-8083-25C, current regulatory/AIM material, FAA-H-8083-28B, FAA-S-ACS-6C, and FAA-CT-8080-2H support the questions. Individual items identify their specific source and location.
- Explanations are original paraphrases labeled **FAA-based explanation**, not purported official FAA answer text.
- The active FAA exam bank is not publicly released. No exact-question-match, instructor-review, endorsement, or pass-guarantee claim is made.

## Local source

Extract the source archive. With Node.js installed:

```text
node scripts/build.mjs
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173`. Opening `index.html` directly from the filesystem is not supported because modules, content fetching, and offline caching require an HTTP origin.

The included engine tests use the bundled source evidence when available. Browser QA requires Playwright and Chrome; adjust the documented runtime paths in the test script to your own installation.
