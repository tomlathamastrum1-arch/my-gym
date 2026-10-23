# Update: in-app AI coach and encrypted chat

1. In your current app, export a complete encrypted backup and save it privately.
2. Extract iron-local-ai-coach.zip. Upload only the files inside its iron-local folder to your existing GitHub repository, replacing matching files. Keep index.html at the repository root and include all new AI modules. Never upload private profiles, backups, photos, API keys, or connection tokens.
3. After GitHub Pages deploys, open the same app address online, let it load, close all copies, then reopen. A second close/reopen may be needed for offline cache version 18. Do not clear site data or uninstall the app.
4. Unlock using your existing passphrase. Open Today → AI coach or Plan → AI coach. The screen is built, but live replies require the separate backend setup in AI-COACH.md.
5. The separate ai-coach-backend.zip is for Cloudflare, not your public gym site. It contains no secrets. Supply OPENAI_API_KEY and COACH_TOKEN through Cloudflare's private secret prompts, then enter only the backend URL and COACH_TOKEN into the gym app. Do not share your API key or vault passphrase in chat.
6. Test first with a generic question and no workout context. Confirm a reply saves, lock/unlock, then export a new encrypted backup. Saved AI chat and the connection token are included in full and workout backups; photos remain excluded from workout-only backups.

No live site, paid account, API billing, backend deployment, or API credentials were changed automatically. The new AI requests need internet and incur API costs. The existing offline rule-based coach and free Ask ChatGPT copy/paste feature remain available. All shipped source/tests use generic or fictional data, with no personal records or preset user password.
