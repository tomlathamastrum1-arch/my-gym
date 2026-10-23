# Personal goals and five-day availability

The Coach tab now supports five available gym days and a 75-minute session window. Its introductory layout is three full-body strength days separated by recovery, with two optional easy-activity days. Availability does not force five hard lifting sessions or require using every minute. The exact schedule remains a product suggestion; readiness and your feedback take priority.

Use **Coach → Your body goals & check-ins** to record your age, approximate height range, availability, morning start/end time, and circumference targets in inches. A separate private profile JSON can prefill those fields without replacing workouts. When that file includes validated training preferences and an initial check-in, those are merged too. Loading the same initial check-in again does not duplicate it. Missing measurements remain blank; they can be added later and do not prevent beginning the training setup. A statement of no restrictions records the user's answer rather than medical clearance.

The personal profile file is deliberately outside the app ZIP. Keep it private; do not upload it to your public website repository. Load it inside the app using **Load a private profile file**. Its contents stay in this browser, and the normal full JSON backup includes them afterward. The app source contains no preloaded personal age, height, target measurements, or assumed body weight.

Optional dated check-ins track current body weight and any of the eight measurements. Weight is stored in kg and displayed in your preferred weight unit; circumference values are explicitly in inches. Missing readings remain blank. Each measurement tile shows its latest reading, target, and change from its own first recorded baseline, rather than mixing measurements from different dates. Partial check-ins and weight-only check-ins are supported. You can delete a mistaken check-in and enter its correction; deletion requires confirmation.

Circumference goals do not reveal current body composition, an appropriate target body weight, a calorie requirement, or safe starting gym loads. The app does not promise these exact dimensions or estimate a date for achieving them. Current baseline measurements, training performance, recovery, equipment, and any restrictions are still needed for meaningful personalization. It does not add loaded neck training because a neck circumference target was entered.

General activity guidance supports building up gradually and combining aerobic and muscle-strengthening activity. The app's exact three-plus-two layout and adaptation rules are design choices, not a validated individualized prescription:

- https://www.niddk.nih.gov/health-information/weight-management/tips-get-active/tips-starting-physical-activity
- https://www.cdc.gov/physical-activity-basics/guidelines/adults.html

Checks: `node test.cjs`, `node coach-test.cjs`, and `node body-test.cjs`.
