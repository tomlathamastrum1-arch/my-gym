> **Encryption update:** This release requires a passphrase. Saved workouts, notes, Health summaries, and app photos are encrypted. Use Profile → Encryption & locking for a complete encrypted backup, including photos. Older installation/history notes below may describe the earlier readable format; ENCRYPTION.md takes precedence.

# Personal coaching update

Open **Plan → Coaching**, or **Profile → Personal coaching & reviews**. Existing workouts and backups remain compatible. Everything stays free; no account, subscription, paid API, or server database is used.

## Your first coached session

1. Set your goal, equipment, restrictions, and usual session duration under **Plan → Adaptive plan**.
2. Open **Coaching → Assessment**. Record experience, equipment confidence, practice with staff, preferred equipment, goals, and potential barriers. The preference changes exercise selection when that equipment is available. Confidence and practice answers add reminders; they do not claim a physical assessment.
3. Complete **Check-in** each training day. Answer energy, soreness, current pain, and illness. Sleep and stress are optional. Choose today's time budget. A 30-minute choice uses four movements and one working set each; setup and rest are retained. The app does not know whether a particular gym queue or session will fit exactly.
4. Return to **Adaptive plan** and start. If required information is missing, the app asks for it. The first three completed coached sessions are labeled as a learning phase.
5. Ask staff to explain unfamiliar equipment. Use **Guided warmup & starting weight** to add light practice sets before working sets. The app does not calculate a first weight from age, height, body weight, or desired measurements.
6. After a completed set, record effort, technique confidence, and any pain. Explained suggestions may repeat the load, suggest a smaller setting, ask for a form check, or offer a small optional increment for an easy practice set. Apply a suggestion yourself; completed sets are not changed. Choose a real available equipment setting rather than treating a numerical preview as exact.
7. Log working sets and finish the session. Partial sessions can be saved. Do not rush to complete the plan after your available time ends.

## Equipment, substitutions, and notes

- **My equipment & exercise notes** remembers machine identifiers, seat/pad/handle settings, staff setup checks, and personal reminders. Saved setup notes appear when that movement returns.
- Save an identifier before logging sets. Changing it resets that movement's pending sets and uses its separate loading history. A blank identifier represents older or unspecified equipment; it cannot recover information you did not record.
- **Machine busy? Change exercise** offers available movements from the same movement group, excluding movements you avoided or that have a pain pause. An alternative uses its own load history. Substitutions are available before completing any set of the selected movement.
- Pain does not trigger a workaround or substitution. The movement pauses. The app cannot determine when it is safe to resume; get appropriate in-person guidance. Incorrect logged feedback can be corrected in **Progress → Session log → Edit workout**, then saved. For a mistaken pain entry, correct both set and movement feedback. Do not erase a real pain report merely to bypass the pause.
- Strength charts and personal records separate exercise/equipment-identifier combinations. Custom routine autofill uses the current recorded identifier for supported movements.

## Transparent rules

- Required daily recovery answers must be present before starting a coached session. New answers are required the next local day.
- Current pain, illness, or high soreness pauses the automatic session. Reported low energy, moderate soreness, high stress, or sleep under six hours reduces volume and prevents load increases. This cautious threshold is a product rule, not a diagnostic or validated readiness score. Imported Health metrics do not silently fill these answers.
- Within a session, missing effort or technique feedback means no adjustment recommendation. Pain stops the movement. Unsure technique asks for a form check. A hard set or a missed rep target suggests an optional smaller load; bodyweight movements stay at zero external weight. Easy working sets repeat the load; only an easy, controlled practice set can offer one small optional practice increment.
- Calibration suggests at most three completed practice sets. If the correct load remains unclear, ask staff instead of repeatedly testing heavier settings. Known-load warmup previews use approximately 50% for five reps and 75% for three reps. Round down to actual settings and use less as needed. No maximal testing is proposed.
- Between sessions, the original conservative multi-session progression rules remain. Missing per-set assessments prevent a load increase even if general movement feedback was confident. Any retained set-level pain report remains a block. Warmups do not enter strength records or load progression.
- A weekly review can keep usual rules, request one easier next session, or request seven easier calendar days. Easier sessions use one working set and no load increase. The one-session request is consumed when that session starts, even if you later discard it; save another review if needed. The seven-day option expires automatically. Neither overrides a pain/recovery block.
- A return after at least 14 days since a completed coached strength session uses one working set, no increase, and a reminder to recheck setup and use comfortable practice loads. Missed sessions are never added as catch-up volume.
- Three consecutive difficult coached sessions prompt a recovery/technique review. Three identical comparable exercise logs trigger a plateau checklist rather than automatically adding work. These are observations of your entries, not proof of fatigue or a physiological plateau.

## Reviews and accountability

**Review** shows the actual last seven days of sessions and working sets, recent comparable logs, fatigue/plateau prompts, and your written reviews. Review goals about every four weeks; measurements and progress photos are optional. Target dimensions are preferences and cannot determine starting loads or guarantee a final body shape.

**Schedule** lists upcoming example strength slots with the existing minimum 48-hour interval after the last coached session finishes. An early morning slot that is too soon is skipped; a fixed weekly target is not enforced. Missed days do not reset history or add catch-up sets. Times use the device's local timezone and your saved morning start, or a generic 07:15 default. An optional Calendar file contains only generic training events and requests a 15-minute alert. You import it and choose calendar permissions/alerts yourself. Repeated imports can create duplicates. No background browser alarm is promised.

**Learn** explains working sets, warmups, reps in reserve, progression, easier sessions, plateaus, logging conventions, and when in-person observation is needed.

## Private progress photos

**Photos** stores up to 30 resized JPEG copies in this browser's separate IndexedDB photo database. Selecting a photo processes it locally; no server receives it. New copies omit original image metadata. The original image is not modified or deleted. Use consistent framing and conditions; the app does not infer body fat or analyze your appearance.

**Regular workout JSON backups do not include photos.** Use **Export separate photo backup** as well. Photo imports merge by ID after confirmation, replacing matching IDs and keeping other images, subject to the 30-image limit. Both new backup types are encrypted. Older exports remain readable. A file-picker photo or backup is never uploaded by this app, but your chosen Files or cloud destination has its own privacy rules. Keep backups away from the public GitHub repository.

Site-data clearing, browser storage eviction, app removal, device loss, or a different browser/profile can make entries and photos unavailable. No automatic cloud backup or recovery exists. Export before changing devices or updating the app.

## Health and verification

See [HEALTH-CONNECTION.md](HEALTH-CONNECTION.md). The app has manual metric entry/import and a workout summary export, not direct Apple Health/Fitness synchronization.

Automated checks cover rules, UI events, old/new backup validation, pain and missing feedback, variants, calendar output, Health import confirmation, photo backup validation, and offline asset inclusion. Desktop browser checks verify the new screens and interaction flow. Physical iPhone behavior, Calendar imports, and optional Shortcuts construction require testing on your own device. None of these rules or diagrams has been clinically validated as a personal training prescription.
