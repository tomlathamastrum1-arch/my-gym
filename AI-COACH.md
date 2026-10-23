# AI coach with encrypted saved history

This release adds a real in-app text coach. It is not active until you deploy the separate backend and configure your own API billing. The free Ask ChatGPT copy/paste feature and existing offline coach remain available. No AI account, API key, access token, or paid service has been created for you.

## Privacy and encryption

- Chat messages and the backend connection token are part of the existing encrypted device vault. They are included in full and workout-only encrypted backups. Your vault passphrase is never sent to the backend or OpenAI. You never enter an OpenAI API key into this PWA.
- Before every send, review the message, optional selected workout context, and any previous chat messages being resent. Sharing options start unchecked. Editing the composer invalidates the preview; editing the preview clears sharing approval. Nothing sends until you approve and press Send.
- Automatic context excludes photos, measurements, Health entries, journal notes, equipment identifiers/settings, and the unfinished workout. You can still disclose private information by typing it or using it in an exercise name. Inspect the preview carefully.
- HTTPS protects transit to the backend and OpenAI. Both providers process the submitted readable text. This is not end-to-end encryption that hides the text from them. `store:false` disables Responses API response storage for later retrieval; it does not guarantee zero provider retention. Provider abuse-monitoring retention and account-specific controls still apply. [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).
- This backend code does not log or store message bodies. It stores one usage-counter record containing dates, counts, and a last-request timestamp. Infrastructure providers may process connection metadata. Worker observability is disabled in the supplied configuration; do not add body logging or trace capture.
- Locking or closing the chat aborts waiting and clears its visible content. An already sent request cannot be recalled, may complete and cost money, and its reply is discarded if the app locked. A pending saved message means delivery is uncertain; do not assume it was unsent. Nothing retries automatically. The UI renders replies as plain text, never executable HTML.
- Removing a connection or deleting chat affects this device's current records, not older backups or provider records. Rotate the backend token to revoke other copies. Browser deletion is not a forensic wipe. A compromised/unlocked device or modified hosted app can access readable data while unlocked; there is no independent security audit.

## Using the coach

1. Open Today → AI coach or Plan → AI coach.
2. Expand Private connection and enter the HTTPS `/coach` endpoint from your own backend and its private access token. Approve the displayed backend destination. This saves the connection encrypted; it does not send a chat.
3. Ask a question. Optionally include completed workouts (latest 1 or 3), training preferences, workout feedback, or up to 4 previous delivered chat messages. Previous messages are off by default and may include earlier shared context.
4. Choose Review message before sending. Read/edit the outgoing message and review any included previous messages. The combined text must fit 16 KB; choose less context if needed. Check the sharing approval and press Send to AI coach.
5. The reply appears inside the app and saves encrypted. Review its suggestions and make routine changes yourself. There is no automatic modification or guarantee of sound advice. AI cannot see or check your form. An in-person trainer is useful for setup and technique, especially on day one.

Up to 100 saved messages (about 50 exchanges) are supported; the last 20 are displayed. Before deleting old chat, export an encrypted backup if you want to retain it. Saved history works offline after the app is cached; new replies need internet. There are no background replies, push notifications, photo analysis, voice features, or automatic data synchronization.

## Activation on Windows: separate backend

The backend is in the separate `ai-coach-backend` folder/ZIP. **Do not upload that ZIP, secrets, or private backup files to your public gym repository.** GitHub Pages hosts only the `iron-local` app files and cannot protect an API key by itself.

1. Create/use an OpenAI API account and enable API billing. Make a dedicated project and secret API key at [OpenAI Platform](https://platform.openai.com/). Review current pricing and set project budget alerts. This backend uses `gpt-6-luna`; API model access must be available on your account. Existing ChatGPT subscriptions do not automatically fund this API-key path.
2. Create/use a Cloudflare account. Review [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [Durable Objects pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/). The supplied SQLite-backed Durable Object supports request counting; personal use may fit free quotas, but hosting is not guaranteed free under every account configuration or usage level. No paid plan is required by this project itself.
3. Install the LTS version of [Node.js](https://nodejs.org/) on Windows. Extract `ai-coach-backend.zip` into a private folder. Open PowerShell in that folder.
4. Open `wrangler.toml` in Notepad. Replace `https://YOUR-USERNAME.github.io` with your actual app **origin** (for example `https://example.github.io`). Do not add the repository path or a trailing slash. Leave the default daily/monthly limits initially.
5. Run `npx wrangler login` and sign in to Cloudflare. The first `npx` run may ask to install the official Wrangler tool; accept that installation if you trust Cloudflare.
6. Run `npx wrangler deploy`. It deploys the Worker and SQLite-backed Durable Object usage counter. Note the HTTPS Worker address. Until its secrets are configured, it refuses requests. Do not reset/delete its Durable Object namespace to bypass usage limits.
7. Run `npx wrangler secret put OPENAI_API_KEY`. At the private prompt, enter your OpenAI API key. **Do not paste it into ChatGPT, the gym app, source files, or GitHub.**
8. Run `node generate-access-token.cjs` privately. Save its generated token in your password manager. Run `npx wrangler secret put COACH_TOKEN` and enter that token at the private prompt. Never reuse your vault passphrase as this token. The token authorizes spending your AI budget.
9. In the gym app's AI coach connection form, enter `https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/coach` and the COACH_TOKEN from step 8. The OpenAI API key stays exclusively in Cloudflare's secret storage. Save the encrypted connection.
10. Test with a generic question and no personal context. Check that the reply arrives, then lock/unlock and confirm it remains in history. Check wrong-token rejection, your app's exact origin setting, and usage limits before trusting the setup with personal information. Do not send your passphrase as a test.

Default server limits are 20 admitted attempts per UTC day, 100 per UTC month, at least 3 seconds between admitted requests, 16 KB combined message input, and 1,200 output tokens including reasoning. Limits are enforced atomically by a single Durable Object for this deployment and count failed/cancelled attempts conservatively. They are request/token caps, **not a guaranteed dollar spending cap**. Costs depend on model pricing and input size. Requests using another API key/deployment are outside these limits. Budget alerts may not stop spending. No tools, search, images, or audio are enabled. The model is fixed server-side so clients cannot request a more expensive model.

To disable AI: remove/revoke OPENAI_API_KEY or COACH_TOKEN in Cloudflare. To rotate access: generate a new token, replace the COACH_TOKEN secret, and save it in the app; old app copies and backups will no longer authenticate. Keep your Cloudflare/OpenAI accounts secure. No credentials or billable API call were used in development tests for this package.

Implementation references: [OpenAI text generation](https://developers.openai.com/api/docs/guides/text), [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna), [Cloudflare Durable Object storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/).
