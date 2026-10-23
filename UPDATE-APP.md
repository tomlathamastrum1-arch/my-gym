# Update to the encrypted app

1. Before updating, export your existing workout data and any separate photo backup. Keep them privately. These older files remain readable until you separately remove them.
2. Extract iron-local-encrypted.zip. Upload the contents of its iron-local folder to your existing GitHub repository, replacing old app files. index.html must remain at the repository root. Never upload your private profile or backups.
3. Include all files. New required files are crypto-box.js, vault.js, security-ui.js, and ENCRYPTION.md. This release uses offline cache version 16.
4. After GitHub Pages finishes deploying, open the same HTTPS address online, let the files download, then close all copies and reopen. A second close/reopen may be needed. Do not clear site data.
5. You will see the passphrase setup screen. Choose and repeat your own strong passphrase (at least 14 characters). Close other app/site windows before enabling encryption. There is no password reset.
6. The app encrypts and verifies its current workout data and app photos before removing older readable browser records. If it reports a migration/save problem, keep the app open and follow its recovery screen.
7. Open Profile → Encryption & locking → Export complete encrypted backup. Save it privately. This complete backup includes photos. Test a restore on another browser/device using the passphrase you chose.

Your live site has not been changed automatically. The package contains generic source/tests only, with no personal records, photos, backup files, or preset user password. Read ENCRYPTION.md for the security boundaries and recovery rules.

The workout-only export excludes photos; a complete encrypted backup includes them. Old files in Photos, Files, iCloud, or earlier exports are not changed by the app. Encryption does not protect an unlocked screen or compromised app code. Physical iPhone lifecycle and restore behavior still need verification on your phone.
