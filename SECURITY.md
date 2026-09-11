# Security Policy

## Supported versions

Security fixes are applied to the latest commit on `main`. This starter does not maintain security
patch branches for older generated projects; generated applications should keep Expo and other
dependencies current.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability.

Use GitHub's **Report a vulnerability** action on the repository's Security page when private
vulnerability reporting is enabled. Include the affected files or versions, reproduction steps,
impact, and any suggested mitigation. If private reporting is unavailable, contact a repository
maintainer privately through a verified profile without including sensitive details in a public
thread.

Maintainers should acknowledge a report within seven days and coordinate disclosure after a fix is
available. Please allow a reasonable remediation window before publishing details.

## Dependency audit exceptions

### Expo Router URL decoder

Expo Router 57 still depends on CommonJS `query-string@7.1.3`, which requests an affected
`decode-uri-component` version (`CVE-2026-45822` / `GHSA-vcc3-ghjq-m6fr`). The scoped override
selects the fixed `decode-uri-component@0.5.0`. A one-line pnpm patch reads its ESM default export
from `query-string`, preserving the query-string API used by Expo Router. Jest transforms that
decoder, and routing dependency tests cover query round trips and bounded malformed-input parsing.
This advisory is fixed, not suppressed. Remove the patch and override when Expo Router adopts a
compatible fixed decoder upstream.

### Temporary image-size exceptions

`pnpm audit:dependencies` remains a blocking CI gate. Two high-severity `image-size`
denial-of-service advisories are temporarily excluded because GitHub currently lists no patched npm
release:

- `CVE-2025-71329` / `GHSA-5p2g-fcmc-qvqq`
- `CVE-2025-71330` / `GHSA-w3rx-r6r6-pgpr`

Both arrive through the React Native/Expo development-time Metro toolchain. The starter does not
process user-supplied images on a server, and application assets remain repository-controlled,
which limits the exposed path while upstream is unpatched. Do not feed untrusted ICNS, JXL, or HEIF
assets into Metro.

The exception owner is the starter maintainers. Both upstream advisories were rechecked on
**2026-09-11** and still list no patched release. Recheck the advisories and the Metro dependency
path by **2026-10-11**, or immediately when Expo, React Native, or `image-size` publishes a fix.
Remove the corresponding entries from `pnpm.auditConfig.ignoreCves` in the root `package.json` as
soon as a patched compatibility set is available.
