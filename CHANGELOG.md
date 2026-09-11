# Changelog

This file records changes that affect newly generated applications and the work required to adopt
them in existing applications. GitHub template repositories do not update their consumers
automatically.

## 1.0.1 - 2026-09-11

- Aligned Expo SDK 57 patches and React Native 0.86.3 across the app and shared UI, including native
  test and Metro packages. Updated compatible development tooling while retaining Jest 29,
  TypeScript 6, and ESLint 9.
- Refreshed transitive dependencies and security overrides. Fixed the Expo Router URL decoder
  advisory with a scoped override and a CommonJS compatibility patch, with routing regression tests.
- Added weekly and manual CI health runs, separated compatible Dependabot updates from deliberate
  migrations, and included dependency audits and EAS schema validation in the generated canary.
- Updated EAS schema validation to accept the upstream schema's union types while retaining strict
  validation, and rechecked the two temporary image-size exceptions.
- Updated pinned Checkout, Setup Java, and Gradle Actions. Gradle's proprietary caching component is
  explicitly disabled; wrapper validation remains enabled.
- Documented optional installation of Expo's official Codex plugin without vendoring its skills.

Adoption: copy dependency manifests, security overrides, and `patches/query-string@7.1.3.patch`
together; regenerate and commit your application's lockfile. Rebuild native development clients
after updating Expo and React Native. Keep application identifiers and product configuration intact.

## 1.0.0 - 2026-07-19

- Established the Expo SDK 57, React Native 0.86, Node 24, and pnpm 10 baseline.
- Added the mobile app plus private theme, UI, and utility packages.
- Added initialization and package generators with behavior tests.
- Added strict lint, type, unit, coverage, dependency, secret, Expo, and web-export checks.
- Added generated-template canary validation, native compile checks, and production configuration
  guards.
- Added a root recovery screen with a provider-neutral error-reporting seam.
- Added opt-in EAS production delivery and Maestro smoke-test workflows.
- Aligned the release candidate with current Expo SDK 57 patches and secured vulnerable transitive
  tooling dependencies.
- Hardened initialization formatting, cold Jest runs, Turbo cache invalidation, generated-package
  cleanup, and first-run/upgrade documentation.
- Replaced the license-gated Gitleaks Action wrapper with a pinned standalone scan that works for
  both personal and organization-owned template consumers.
