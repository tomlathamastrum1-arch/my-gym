> **Encryption update:** This release requires a passphrase. Saved workouts, notes, Health summaries, and app photos are encrypted. Use Profile → Encryption & locking for a complete encrypted backup, including photos. Older installation/history notes below may describe the earlier readable format; ENCRYPTION.md takes precedence.

# Exercise library update

Open **Plan → Exercise library**, or **Exercise guide** in a supported workout. All 13 movements used by the adaptive planner include two original schematic drawings, equipment recognition, three setup steps, technique cues, common mistakes, breathing guidance, approximate muscle maps, and instructions for recording weights and reps.

Pictures can show Start, Move, or both. The library supports exercise/muscle search and machine, dumbbell, and bodyweight filters. The guide opens over the current workout without changing its sets or timer. Custom exercises only receive a guide when their name matches a supported movement; the app does not guess which movement you intended.

## Offline and privacy

All diagrams and instructions are included in the app's offline files. No accounts, analytics, paid APIs, remote fonts, downloaded videos, or embedded video players were added. Existing workout data and backup format remain compatible. Your personal profile is not included in this public app package.

Videos & sources contains optional links to the original providers. Internet is required; opening a link visits that provider under its own privacy policy. The app sends no workout data in these links. Six movements have demonstration links; the remaining movements have written resources. The supported dumbbell row link is explicitly labeled as a related standing variation, rather than an exact demonstration of the supported setup. Provider availability can change.

## Guidance and sources

The drawings are simplified reference illustrations, not photographs or a professional assessment of your technique. They show representative equipment; actual machines differ. Ask gym staff to confirm the equipment setup and your first attempts. The diagrams and muscle maps do not measure range, alignment, or muscle activation. They cannot replace a trainer watching your movement.

Short setup and technique text is original paraphrased guidance. No provider photographs, illustrations, or videos are copied into the package. Source resources are linked inside each guide:

- [Mayo Clinic: leg press](https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/leg-press/vid-20084684)
- [ACE: seated chest press](https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/) and [Ascension demonstration](https://phl.ascension.org/wellness/fitness/your-exercise-routine-seated-chest-press)
- [Mayo Clinic: seated row](https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/seated-row/vid-20084688)
- [NASM: seated leg curl](https://www.nasm.org/workout-exercise-guidance/how-to-seated-leg-curl)
- [ACE: lat pulldown](https://www.acefitness.org/resources/everyone/exercise-library/158/seated-lat-pulldown/)
- [ACE: goblet squat](https://www.acefitness.org/resources/everyone/exercise-library/362/goblet-squat/)
- [NSCA: floor press variation](https://www.nsca.com/certification/tsac-f/essentials-of-tactical-strength-training-and-conditioning-2nd-edition/excerpts/modification-of-exercises-to-allow-injured-individuals-to-continue-training/)
- [Mayo Clinic: standing dumbbell row, related variation](https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/bent-over-row/vid-20084680)
- [Cornell Physical Therapy: double-leg bridge](https://vod.video.cornell.edu/media/Double%2BLeg%2BBridge/1_y8zru15q)
- [Mayo Clinic: chair squat / stand](https://connect.mayoclinic.org/blog/living-with-mild-cognitive-impairment-mci/newsfeed-post/the-best-exercise-for-strong-legs/)
- [Mayo Clinic: modified pushup, including wall version](https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/modified-pushup/vid-20084674)
- [ACE: prone W stabilization](https://www.acefitness.org/resources/everyone/exercise-library/249/prone-scapular-shoulder-stabilization-series-i-y-t-w-o-formation/)
- [NASM: dead bug](https://www.nasm.org/resource-center/exercise-library/dead-bug)

## Update your existing app

1. Export a JSON backup in **Profile → Data & backup** and save it privately.
2. Extract the new ZIP. Upload the files inside `iron-local` to your existing GitHub repository, replacing the old versions. Include the three new exercise scripts. Keep `index.html` at the repository root.
3. After GitHub Pages finishes deploying, close every open copy of the app and reopen online. The offline cache is version 11; it may take a second close/reopen to activate after downloading.
4. Open **Plan → Exercise library**. Do not clear browser/site data to force an update. Your existing entries use the same storage key and should remain in place; keep the backup regardless.

Desktop browser preview and automated data/UI checks were performed. Physical iPhone installation and airplane-mode behavior still need verification on your device.
