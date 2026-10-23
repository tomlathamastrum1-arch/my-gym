# Iron Local — your free iPhone gym journal

No App Store, Mac, build tools, subscription, account inside the app, or paid AI API required. The app is plain HTML, CSS, and JavaScript. All assets are included; there are no external libraries or fonts. You need internet once to load/install it, then it can run offline.

## 1. Publish with free GitHub Pages (Windows computer recommended)

1. Extract `iron-local.zip` on your Windows computer: right-click → **Extract All**. Open the extracted `iron-local` folder. You should see `index.html`, `app.js`, and the other files listed below.
2. Visit https://github.com and create a free account, or sign in. No payment card or paid plan is needed.
3. Click the **+** menu near the top right → **New repository**.
4. Name it **my-gym**. Choose **Public**, select **Add a README file**, then **Create repository**. GitHub Free requires a public repository for this Pages method. Your app's source is public; workout data stays in your device's browser. Never upload a JSON workout backup to the repository.
5. In the repository's **Code** tab, select **Add file → Upload files** (it may also be in a menu). Drag the contents of the extracted `iron-local` folder into the upload area. Upload the files themselves, not the outer folder and not the ZIP. `index.html` must be at the repository root beside README, not inside `iron-local/`.
6. Upload all app files: `index.html`, `style.css`, `core.js`, `body.js`, `body-ui.js`, `coach.js`, `coach-ui.js`, `app.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`. Documentation/test files are optional. `.nojekyll` is included; if Windows hides it, the app also works without it because it uses ordinary filenames and no build step.
7. Click **Commit changes** to save to the `main` branch.
8. Open repository **Settings → Pages**. Under **Build and deployment**, choose **Source: Deploy from a branch**. Choose **main** and **/ (root)**, then **Save**.
9. Wait a few minutes. Refresh **Settings → Pages** until it shows your published address, usually `https://YOUR-USERNAME.github.io/my-gym/`. Open that exact address. You should see **IRON / LOCAL** and **Show up. Get stronger.** The HTTPS address is required on iPhone; opening downloaded `index.html` from Files does not install an offline PWA.
10. If you see 404, check that `index.html` is at the repository root, Pages uses `main / (root)`, and the repository's **Actions** tab shows a successful Pages deployment. Allow a few minutes after changes.

Official GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 2. Install on your iPhone

1. Open **Safari** on your iPhone. Use a normal tab, not Private Browsing.
2. Enter your HTTPS GitHub Pages address from step 9. Do not use the github.com repository address.
3. Tap Safari's **Share** button (square with an upward arrow; depending on Safari layout it may be inside the menu).
4. Select **Add to Home Screen**. If missing, scroll down in the share sheet and use **Edit Actions** to add it.
5. Keep **Open as Web App** enabled if that option appears. Name it **Iron Local**, then tap **Add**.
6. Open **Iron Local from its new Home Screen icon while online**. Go to **Settings** inside the app. Wait for **Offline files ready**.
7. Close the app, turn on airplane mode, and reopen it from the Home Screen. Check that you can open routines. Turn airplane mode off afterward. This confirms offline setup on your own iPhone.
8. Log your real workouts in that Home Screen app consistently. Safari and the installed app may use separate storage; use export/import if you began in Safari and need to move your entries.

Apple's instructions: https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios

## 3. Your first workout

1. Open **Routines**. Two editable example routines are included; they are starter templates, not a personalized training prescription.
2. Tap **Edit** to rename exercises, add/remove movements, choose sets, minimum/maximum reps, and the weight increment for progression. Save the routine. Use consistent names to link exercise history; changing an exercise name starts a separate chart.
3. In **Settings**, choose kg or lb and your default rest duration. Unit changes convert existing weights, including history. Rounding to two decimals can introduce tiny differences; choose one unit and stick with it.
4. Tap **Start** beside a routine. Enter the load and reps for each set, then tap the circle to mark it done. Completed fields lock; tap the check to unlock and correct them. Each change saves locally. Complete a field by tapping outside it before closing the app.
5. Each completed set starts the rest timer. You can also start rest manually. The visible timer catches up after the app is suspended; it does not promise sound, push notifications, or alarms when the phone is locked.
6. Add or remove sets as needed. Tap **Finish session**, then confirm. Only working sets marked done with positive reps enter personal records and charts; completed warmups remain visible in history. You can resume an unfinished session after closing/reopening.
7. Check **History** for previous sets and **Progress** for the heaviest set, best set volume, and estimated one-rep max trend. The chart uses the best Epley estimate per session from weighted sets of 1–12 reps: `weight × (1 + reps / 30)`. This is an estimate, not a tested maximum. Bodyweight sets (load 0) are logged but do not produce useful weighted-strength estimates.

### Transparent progression rule

The app looks at the most recent completed session for an exercise. If at least the routine's target number of sets were completed, every completed set reached the upper rep target, and all loads match, it suggests that weight plus your chosen increment. Otherwise it suggests repeating the highest completed load. No previous data means choose your own comfortable starting load. Label warmup sets using the set-type button. They remain in history but are excluded from progression and records. The rule does not evaluate pain, technique, readiness, or equipment limitations; you can always override it. Suggestions for bodyweight movements may not be appropriate.

## 4. Keep your data safe — do this weekly

1. Open app **Settings → Export JSON backup**.
2. Save the downloaded `iron-local-backup-YYYY-MM-DD.json` in **Files**. Safari may show a download arrow; open the download and use Share → Save to Files if needed. Use iCloud Drive if you already use it, or copy the file to your computer. The app itself never uploads data or provides cloud sync.
3. Keep at least two dated backups. Exports made on the same date can have the same name; rename or keep both rather than replacing your only copy.
4. To restore, choose **Import backup**, select the JSON, and confirm the replacement. Export your current entries before importing. Invalid/unsupported files are rejected. Import replaces everything, including routines, history, unit preferences, and unfinished sessions; it does not merge data. Maximum import file size is 20 MB.
5. After installation, try an export and restore with a small test workout so you know the process before relying on it.

### Local storage limits

- Data is stored in this browser profile on this device, not in your GitHub account or app files. No automatic sync, server backup, or recovery exists. The hosting service sees ordinary file requests, not workout entries.
- Browser/site-data clearing, app removal, device loss/reset, storage eviction, or private browsing can erase entries. Storage quotas vary; if saving fails, the app shows a warning. Export immediately and do not close until the backup is saved. If startup data cannot be read, the app avoids overwriting it and displays a warning; preserve existing data before clearing anything.
- Local storage and exported JSON are not encrypted by the app. Someone with access to your unlocked device/browser or backup file can read them. Protect your device and backup location.
- Use a single open app window at a time to avoid simultaneous edits. Entries are associated with the site's origin/browser profile. Changing your GitHub username, hosting domain, browser, or device may require export/import. Keep this app on a dedicated origin if hosting other apps; avoid reusing its local-storage key.
- No paid services are used. GitHub Pages has usage limits and future policies can change. This is a lightweight personal app and needs no custom domain.

## 5. Updating the app later

1. Export a backup first. Keep the same published URL.
2. Replace changed files in the repository and commit them.
3. For code/asset changes, change the `CACHE` string at the top of `sw.js`, e.g. `iron-local-v5` → `iron-local-v6`. Keep all app files listed in `ASSETS`.
4. Open the app online to let the replacement service worker download. Close every app/Safari window for this site, then reopen. The new worker activates once the old pages are closed. Do not clear site data to update; that deletes workouts.
5. Verify **Settings → Offline files ready**, then test airplane mode again. If an update is incomplete, stay online, check Pages deployment success, and retry after closing all app windows.

## Files and optional developer checks

The project has no dependencies or build step. `index.html` is the entry point; `style.css` styles the app; `core.js` contains data validation and progression rules; `app.js` contains the UI and local storage; `coach.js` and `coach-ui.js` add adaptive beginner planning; `sw.js` caches offline assets; `manifest.webmanifest` defines installation; PNG/SVG icons are included. `.nojekyll` disables unnecessary GitHub processing.

If Node.js is already installed, run `node test.cjs` from the project folder. It checks progression, backup validation, formula calculations, offline asset presence, and PNG dimensions. You do not need Node to publish or use the app. All 51 included automated checks passed during delivery, including draft workout edits, warmup exclusion, autofill, and backup reminders. Browser checks confirmed set entry (20 kg × 12), completion, rest countdown, session saving, personal records, chart rendering, routine saving, and offline readiness. Installation, airplane-mode behavior, and backup file picking still need verification on your actual iPhone; no physical iPhone was available for testing.

## Troubleshooting

- **Not installing/offline not ready:** use HTTPS in Safari, avoid private browsing, verify every app file was uploaded with exact lowercase spelling, and open the installed app online first.
- **Old version:** follow the update steps and close all open windows before reopening. Do not clear browser data without a backup.
- **Missing workouts:** check you are using the same installed app and address. Try the original Safari profile if you first logged there. Restore your latest JSON backup. There is no server copy to retrieve.
- **No chart:** finish a session containing a completed weighted set of 1–12 reps. Bodyweight or higher-rep sets remain in history and set-volume records.
- **Rest notification while locked:** not supported reliably by this PWA. Use the iPhone Clock timer if you need a guaranteed audible alarm.
