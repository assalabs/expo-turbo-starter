# Maintaining and Upgrading the Starter

GitHub creates a template consumer with a new, unrelated history. Updating this repository improves
future projects; it does not silently modify applications already created from it.

## Version contract

- The root `package.json` version is the template version.
- `pnpm run setup` records that version in `.template-initialized.json`.
- Every template release updates `CHANGELOG.md` with adoption notes.
- Stable releases receive a `v<version>` Git tag and GitHub release.
- `main` is the supported moving target; security fixes are not backported to old template versions.

Existing applications should compare their recorded version with the changelog, then port relevant
changes as normal application pull requests. Prefer copying small commits or files deliberately over
merging histories that GitHub created as unrelated.

If multiple applications need to receive the same runtime behavior continuously, that behavior has
outgrown the template. Move it into a versioned package or a maintained generator migration instead
of copying it repeatedly.

## Expo upgrade loop

For every Expo SDK upgrade:

1. Create a dedicated branch.
2. From the repository root, update Expo and its compatibility set in the mobile workspace:

   ```sh
   pnpm --filter ./apps/mobile-app exec expo install expo@latest
   pnpm --filter ./apps/mobile-app exec expo install --fix
   ```

   For SDK patch alignment without a major upgrade, run only the second command.

3. Update duplicated React Native test dependencies in shared native packages to match the app.
4. Run `pnpm install` to refresh `pnpm-lock.yaml`, then prove it is reproducible with
   `pnpm install --frozen-lockfile`.
5. Run `pnpm check`, `pnpm expo:doctor`, `pnpm export:web`, `pnpm check:workflows`,
   `pnpm audit:dependencies`, and `pnpm verify:template`.
6. Run both platforms through `.eas/workflows/e2e.yml` before tagging the template release.
7. Record native rebuild requirements and downstream migration notes in `CHANGELOG.md`.

Dependabot is an input to this loop, not an automatic compatibility decision. Expo, React, React
Native, Jest, TypeScript, and native modules should move as a tested compatibility set.

## Routine maintenance

CI runs weekly and can be dispatched manually to catch new advisories and SDK patch requirements
even when no source files have changed. Keep its quality, shared-package tests, app tests,
generated-template canary, dependency review, and secret scan checks required on the default branch.
Dependency and native configuration changes must also pass both native compile jobs before merging.

Dependabot groups Expo-compatible patch proposals, including the React Native development packages
and Expo test/lint presets. Other development tools receive minor and patch proposals. Major npm
upgrades and React Native minor upgrades are handled deliberately through the upgrade loop above;
do not infer compatibility from a version number or combine them with routine patches. Keep Jest,
TypeScript, and ESLint on versions supported by the Expo presets and TypeScript tooling.

Review dependency overrides and the dated exceptions in `SECURITY.md` during each maintenance pass.
Overrides that used to fix an advisory can become vulnerable themselves. Validate the generated
consumer as well as the source checkout before publishing a template release.
