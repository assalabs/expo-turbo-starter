import { readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generatedDirectories = ['.expo', '.turbo', 'build', 'coverage', 'dist'];

async function childDirectories(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(directory, entry.name));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

export async function cleanWorkspace(workspaceRoot) {
  const workspaceDirectories = [
    workspaceRoot,
    ...(await childDirectories(path.join(workspaceRoot, 'apps'))),
    ...(await childDirectories(path.join(workspaceRoot, 'packages'))),
  ];

  for (const workspaceDirectory of workspaceDirectories) {
    for (const generatedDirectory of generatedDirectories) {
      await rm(path.join(workspaceDirectory, generatedDirectory), { force: true, recursive: true });
    }
  }
}

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  await cleanWorkspace(root);
  console.log('Removed generated Expo, Turbo, build, and coverage output.');
}
