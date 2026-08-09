# Changelog

This file records changes that affect newly generated applications and the work required to adopt
them in existing applications. GitHub template repositories do not update their consumers
automatically.

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
