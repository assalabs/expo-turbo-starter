import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { cleanWorkspace } from './clean.mjs';

test('cleans generated output from apps and generated packages', async (context) => {
  const workspace = await mkdtemp(path.join(tmpdir(), 'expo-turbo-clean-'));
  context.after(() => rm(workspace, { force: true, recursive: true }));

  const generatedPaths = [
    path.join(workspace, '.turbo'),
    path.join(workspace, 'apps/mobile-app/.expo'),
    path.join(workspace, 'packages/analytics/coverage'),
    path.join(workspace, 'packages/ui/dist'),
  ];
  const sourcePath = path.join(workspace, 'packages/analytics/src/index.ts');

  await Promise.all(generatedPaths.map((directory) => mkdir(directory, { recursive: true })));
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await writeFile(sourcePath, 'export const value = 1;\n');

  await cleanWorkspace(workspace);

  await Promise.all(
    generatedPaths.map((directory) => assert.rejects(access(directory), { code: 'ENOENT' }))
  );
  assert.equal(await readFile(sourcePath, 'utf8'), 'export const value = 1;\n');
});
