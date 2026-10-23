# Your encrypted gym vault

This version requires a passphrase before showing personal app data. It remains free, offline-capable, and account-free. Encryption is implemented with the browser's Web Crypto API: AES-256-GCM authenticated encryption, fresh random 96-bit IVs, and PBKDF2-HMAC-SHA-256 with 600,000 iterations and a random 128-bit salt. Record identifiers and vault identity are bound as authenticated context. Keys are derived locally, are non-extractable CryptoKey objects, and are not saved in browser storage or sent to a server.

Use normal Safari over HTTPS. An unsupported browser or unavailable storage stops setup; it does not fall back to readable storage. At least 14 characters are required. Prefer several unrelated words, and save your passphrase in a password manager you trust. The app does not measure actual password entropy. No password reset or server recovery exists.

## Turn encryption on after updating

1. Before updating, export your current workouts and any separate photo backup. Keep those files privately; old files remain readable until you separately remove them.
2. Upload the updated app files to your existing HTTPS site. Keep the same address. Include all new security scripts and ENCRYPTION.md. Close other copies of the app/site so an older copy cannot keep writing readable records.
3. Open the updated app. Create and repeat a passphrase, and acknowledge that there is no password reset. Your existing workout records and app photos are read locally, validated, encrypted into a separate vault, read back, and verified before the app removes the older readable browser records.
4. If a save, verification, or cleanup fails, the app preserves the existing records and shows a recovery or migration screen. Do not clear site data. Close other copies and retry. If an older copy wrote newer readable records, export an encrypted safety backup and explicitly review the option to encrypt the latest readable records.
5. Open Profile → Encryption & locking → Export complete encrypted backup. Save the file privately, then test restoring a copy on another browser/device with your passphrase before relying on it.

The app can remove its previous logical browser records. It cannot guarantee forensic erasure of old storage blocks, OS/browser backups, old exports, originals in Photos, or copies in Files/iCloud. It does not modify your source photos or files outside the app.

## Saving and locking

Every new workout/data save is queued for encryption before an IndexedDB transaction writes it. Photos and their dates/notes are encrypted as individual records. Local storage no longer contains the app's readable workout JSON. The vault header contains only encryption settings, a random identifier, and a revision number; ciphertext sizes, record counts, and random photo identifiers remain visible.

Leaving/hiding the app covers its private UI immediately and finishes pending encrypted saves before dropping its key and in-memory records. It also locks after two minutes without interaction, and offers Lock now. The app's in-memory private view, photo previews, notes, and editing drafts are cleared on lock. Save forms and historical/routine edits before leaving; unsaved drafts are discarded. An unfinished saved workout remains resumable after unlocking.

If saving fails, a privacy cover explains that changes may not be saved. The key is temporarily retained in memory for recovery; this is not claimed as a completed lock. Export an encrypted safety backup or retry before closing/reloading. Conflicting vault revisions are rejected rather than silently overwriting another app window. Use one app window at a time.

Encryption is asynchronous. Wait for “Encrypted changes saved” before closing after edits. A browser or OS can suspend or terminate the app before a pending save finishes; browser lifecycle events and background execution are not guaranteed on iPhone. Keep dated backups. JavaScript cannot guarantee immediate forensic zeroization of all strings or memory copies; locking removes app references and clears the visible private UI on a best-effort basis.

## Backups and restore

- **Complete encrypted backup:** Profile → Encryption & locking. Includes workouts, profile, body measurements, coaching notes/reviews, selected Health summaries, settings, active workout, and app photos.
- **Encrypted workout backup:** The regular export button. Includes workout/profile/coaching/Health data but does not include photos.
- **Encrypted photo backup:** Coaching → Photos. Includes app photo copies and their dates/notes. Photo restore merges by ID after confirmation.
- **Encrypted workout summary:** Health screen. A private reference export; it is not directly importable by Apple Health or a Shortcut until separately decrypted.

Each encrypted file records its format version, scope, KDF parameters, random vault ID, IV, and ciphertext. It does not contain your passphrase. The password used at export is required to decrypt the file. Wrong passwords, authentication failures, and malformed/unsupported contents are rejected before replacing data. Full restore replaces both workouts and app photos; workout-only restore preserves photos. Restore asks for confirmation.

Older readable workout/photo JSON backups remain importable after unlocking. They are encrypted before saving into the vault. They do not become encrypted on disk merely because you imported them. Blank Health templates remain ordinary files and contain generic sample fields. Optional Calendar files are also readable so Calendar can import them; they contain planned training times and generic event titles. Keep them privately. Never upload any personal backup, encrypted or readable, to the public app repository.

Changing the passphrase requires the current passphrase and atomically re-encrypts saved vault records under a new random salt and derived key. Old exported backups keep their old password. Export a new backup after changing it. A locked device vault must be unlocked before replacing it; if you only know an older backup password, restore that backup on another browser/device. No destructive “forgot password” reset is provided.

## What encryption protects

It protects the contents of copied saved vault records and encrypted exports against someone who lacks the passphrase, subject to passphrase strength and implementation/browser security. It does not hide unlocked screens, stop an unlocked authorized user from exporting, protect a compromised device, or defend against malicious code served from your hosting origin. Public app source code contains no personal records or secret key; protect your hosting account and device too. HTTPS protects delivery in transit and is required, but is not the same as encryption at rest.

This is an application implementation using standard browser primitives, not an independently audited cryptographic product. Physical iPhone lifecycle behavior, password-manager integration, and real-device restore must be verified on your phone.

References: [Web Crypto key derivation](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey), [AES-GCM parameters](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams), [OWASP password-storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [OWASP cryptographic-storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html).

## Verification for this release

136 automated checks passed, including 23 encryption/vault/UI checks. Browser checks verified migration of generic workout/photo fixtures, absence of readable fixture contents in saved vault records, removal of legacy readable stores after verification, wrong-password rejection, manual and inactivity locking, and resuming an encrypted workout. The app also loaded from its offline cache with the development server stopped. Test fixtures were isolated from the live site. Real iPhone behavior and independent security review remain outstanding.
