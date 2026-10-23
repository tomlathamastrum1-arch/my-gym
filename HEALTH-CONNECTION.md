> **Encryption update:** This release requires a passphrase. Saved workouts, notes, Health summaries, and app photos are encrypted. Use Profile → Encryption & locking for a complete encrypted backup, including photos. Older installation/history notes below may describe the earlier readable format; ENCRYPTION.md takes precedence.

# Apple Health and Fitness: what this app can do

Iron Local remains a free installable web app. It has **no direct HealthKit permission, live Apple Watch connection, background Health sync, or Activity-ring access**. HealthKit requires a native app capability and authorization; adding a web app to the Home Screen does not provide that capability. No paid bridge, subscription, or native app was added.

Apple references: [HealthKit setup](https://developer.apple.com/documentation/healthkit/setting-up-healthkit), [authorizing health-data access](https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data).

## Option 1: selected metrics, entered privately

1. Open Apple Health and check the daily totals you want to use.
2. In Iron Local, open **Plan → Coaching → Health**.
3. Record the date and source. Enter any of steps, sleep hours, and body weight in kg; leave unknown fields blank. Weight in lb divided by 2.2046226218 gives kg. The app labels the field explicitly as kg.
4. Save. One daily summary is kept per date; saving the same date replaces that summary. This does not write anything back to Health.

The entries provide context. They do not automatically change lifting loads, become body-measurement check-ins, diagnose recovery, or fill your daily pain/illness answers. Use the separate daily Check-in screen for training decisions.

## Option 2: a local JSON file bridge

Open **Health → Download import template**. It downloads a generic format, not any of your health records. Replace its sample fields with your own selected data. Delete metrics you do not know; zero is an actual value, not “unknown.” Example format using fictitious values:

```json
{
  "kind": "iron-local-health-summary",
  "version": 1,
  "days": [
    {
      "date": "2026-01-15",
      "source": "Apple Health daily summary — manually checked",
      "steps": 6000,
      "sleepHours": 7.5,
      "weightKg": 75
    }
  ]
}
```

Choose **Preview health-summary import**. Review the dates, sources, and values, then press **Import these summaries**. Up to 366 unique dates / 1 MB are accepted per file. Matching dates replace existing daily summaries, while other dates remain. The regular workout backup includes these selected summaries.

This format is not Apple's full Health export format. Apple export ZIP/XML, third-party proprietary formats, and automatic cloud exchange are not supported.

## Optional Apple Shortcuts construction

Apple Shortcuts offers **Find Health Samples**, with your permission. A Shortcut can prepare a file matching the format above, but a ready-made signed Shortcut is not included or installed. No Health permission has been requested by Iron Local. See [Apple's Find and Filter actions guide](https://support.apple.com/guide/shortcuts/intro-to-find-and-filter-actions-apd3c845e881/ios).

For the simplest reliable file bridge, build a Shortcut that asks for the daily totals you already checked in Health:

1. Create a new Shortcut called **My gym daily summary**.
2. Add **Ask for Input** for a date. Use **Format Date** with custom format `yyyy-MM-dd`.
3. Add **Ask for Input**, Number, for the day's step total. Optionally add separate numeric questions for sleep hours and weight in kg. Only include metrics you are willing to save.
4. Add a **Dictionary** with `date` (formatted date), `source` (a fixed descriptive text), and your numeric `steps`, `sleepHours`, or `weightKg` values. Use Number values for metrics, not quoted text.
5. Add a **List** containing that Dictionary.
6. Add another **Dictionary** with `kind` set to `iron-local-health-summary`, `version` as Number `1`, and `days` set to the List.
7. Convert the outer Dictionary to JSON text with **Get Text from Input**. Use **Quick Look** to check that it has the same structure as the example above; actions and labels can vary by iOS version.
8. Use **Set Name** for `gym-health-summary.json`, then **Save File**, choosing the location yourself. Do not add any network-upload action or place it in the public GitHub repository.
9. In Iron Local, select that file for import and confirm its preview.

For an advanced Shortcut that reads Health samples, filter the precise date range and chosen source and verify the resulting totals against Health. Raw phone/watch step samples can overlap; sleep “in bed,” sleep stages, and other samples can overlap too. Do not sum all sources or all sleep categories. Iron Local deliberately does not invent an aggregation algorithm or treat raw sample sums as Apple's deduplicated daily total. Automatic sample collection is not configured or tested here.

## Taking a workout to Apple Health

After finishing a workout, the Health screen shows its recorded start, end, and elapsed minutes, including rest. **Download latest workout summary** saves a local reference JSON file. This is not a file Apple Health can directly import. A custom Shortcut could use selected fields, but would need its own Health permissions and testing.

To add a missing workout manually, follow [Apple's instructions](https://support.apple.com/en-la/101952): open Health, find Activity → Workouts → Add, and enter your details. Labels may vary by iOS version. Check your start/end times, especially if the app was left running. Iron Local does not estimate calories, heart rate, or ring credit. Do not invent calories to fill a field, and do not add a duplicate of a workout your Watch or another app already recorded. Apple controls Fitness-ring behavior.

All exchange is user-initiated. A downloaded file contains private information in plain text; store it somewhere you trust. Files/iCloud or any other location you choose is separate from Iron Local's on-device storage and subject to that service's own settings.
