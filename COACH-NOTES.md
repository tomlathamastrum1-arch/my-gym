# Your adaptive beginner planner

Open **Coach** to set up your goal, available days, session time, age group, equipment, and exercises you want to exclude. Setup is required; the app does not infer your needs from generic defaults. Profiles, feedback, and plans stay on device and are included in JSON backups.

## What is implemented

- A beginner full-body plan with exercise selection based on available machines, dumbbells, or bodyweight options. Four movement groups are included for 30-minute sessions; a core movement is added for longer sessions. You can exclude unavailable movements. This is a small curated exercise library, not an unlimited exercise generator.
- Two or three strength days each week with rest between them. If you select four available days, the fourth is an optional light-activity day. Example weekdays are suggestions; the app enforces a minimum 48-hour interval between its coached strength sessions, not a calendar booking.
- Day-one load calibration guidance using light practice sets and controlled reps. The first weighted working-load field stays empty; it will not accept completion at an unknown/zero working load. It does not estimate weights from age, height, body size, or an untested one-rep max.
- Working-set and rep targets, warmup labels, per-movement rest, short technique cues, and optional load recommendations. Dumbbell loads are per dumbbell. Bodyweight movements stay at zero external load.
- Effort feedback (easy, comfortable challenge, too hard), technique confidence, pain reports, and pre-session readiness. There is no camera-based form assessment.
- Profile and feedback-aware rules that can increase working sets, suggest a load increment, hold steady, reduce sets on a low-energy day, or pause planning. Every proposed change includes its reason and is shown before you start; loads remain editable. Your gym equipment may use different increments, so an optional suggestion is never a command to force an unavailable load.
- Pain-only partial sessions can be saved so pain feedback is not lost just because you stopped before completing a set.
- Corrections in History affect future plans. Past backups without coaching data remain supported.

## Exact adaptation rules

These are deliberately simple app rules, not a validated personal-training or medical assessment system:

1. New movements begin with one working set of 8–12 controlled reps. Starting load is chosen through light practice, not an app-generated number.
2. Two recent logged exposures with no reported pain, controlled technique, and known comfortable effort permit two sets. A muscle-building goal, 60-minute sessions, at least six exposures, and three recent comfortable exposures permit three sets. The first weeks otherwise share the same foundation across goals; strength goals do not trigger heavy maximum testing, and fat-loss goals do not trigger calorie promises.
3. A load increase requires two recent sessions completing all current target sets at the upper rep limit, at the same load, with matching set targets, confident technique, no reported pain, and known comfortable effort. The suggestion is +1 kg or +2 lb for weighted exercises. If equipment does not support that increment, repeat the previous load. The app does not increase load in the same step that adds a set.
4. Missing feedback or uncertain technique prevents increases. A low-energy check-in reduces the target set count by one (minimum one) and prevents increases. A poor-recovery/pain/illness check-in pauses that day's automatic plan.
5. Three hard recent exposures prompt a lighter-load and technique-review suggestion rather than an automatic increase. The app does not prescribe a rehabilitation routine or automatically swap a painful exercise for another.
6. Pain in the latest saved exposure pauses the movement and automatic plan. Get appropriate in-person advice. Historical feedback can be corrected through History if it was entered incorrectly; do not erase a real pain report just to unlock a plan.

## Limits

The automatic planner currently supports adults without reported exercise restrictions. A minor or someone reporting an injury/restriction sees a message to discuss appropriate training with a qualified professional rather than receiving an automatic adult plan. Custom routine tools remain available.

Gym staff or a qualified trainer should show equipment setup and check your initial technique. The app cannot observe your movement, diagnose pain, judge medical readiness, replace hands-on coaching, or guarantee progress. It does not prescribe nutrition, supplements, calories, or fat-loss outcomes. If the machine/model changes, its numbers may not represent the same resistance; select a light load again rather than transferring the previous machine's number blindly.

## Evidence and testing

General beginner guidance supports starting gradually, practicing controlled movement, and building resistance-training volume over time. The app's precise progression thresholds, selected exercise library, goal mapping, and gating rules are product choices rather than a copied or clinically validated protocol.

- Better Health Channel, Victoria Department of Health: https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits
- NIDDK: https://www.niddk.nih.gov/health-information/weight-management/tips-get-active/tips-starting-physical-activity

Developer checks: `node test.cjs` and `node coach-test.cjs`. Coaching checks cover first-day calibration, goals/time/equipment filters, exclusion handling, feedback requirements, readiness, pain, session spacing, progression, volume changes, bodyweight treatment, and backup validation. Browser checks covered setup, demonstration-plan generation, workout start, feedback controls, and rejecting an unknown starting load. The demonstration profile used for testing is not your personal prescription.
