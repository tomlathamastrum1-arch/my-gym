> **Encryption update:** This release requires a passphrase. Saved workouts, notes, Health summaries, and app photos are encrypted. Use Profile → Encryption & locking for a complete encrypted backup, including photos. Older installation/history notes below may describe the earlier readable format; ENCRYPTION.md takes precedence.

# Refined training interface

This version redesigns the daily experience while keeping the existing on-device storage key, backup format, training rules, and private profile compatible.

- **Today:** a current-week activity strip based on actual saved workouts, a clear next-session or recovery card, training totals, and a compact movement overview. No fabricated streaks, readiness scores, or progress records.
- **Plan:** adaptive planning and custom routines share one area. A three-step setup separates goals, schedule, and equipment. Movement details and planning explanations expand when needed.
- **Workout:** one movement at a time, exercise navigation, session set progress, large load/rep inputs, concise load guidance, feedback that opens after completed working sets, and a prominent rest countdown. The saved session still contains every exercise. Historical editing retains the complete session view.
- **Progress:** strength and session-log views are connected with tabs; body goals link to the profile check-in screen.
- **Profile:** personal measurements, training preferences, and backup/restore are grouped into separate screens.
- **Visual system:** charcoal surfaces, restrained lime accents, consistent vector icons, a custom equipment illustration, floating four-item navigation, responsive layouts, reduced-motion support, and visible keyboard focus.

All assets remain local; no external fonts, paid libraries, subscriptions, tracking, accounts, or cloud storage were introduced. The private profile file remains separate from public hosting files.

## Update the existing GitHub Pages app

1. Export your current app data first.
2. Extract the updated ZIP. Upload the app files to the same repository root, replacing old versions. Include the new `interface.js` file. Keep `my-private-profile.json` and workout backups off GitHub.
3. Commit the replacement files, then wait for the Pages deployment to complete.
4. Open the same app address online, then close every window of that app/site and reopen to activate the new offline version. Do not clear website data; that can erase workout records.

The live GitHub site is updated only after these replacement files are uploaded. This package does not claim to have changed your repository automatically.
