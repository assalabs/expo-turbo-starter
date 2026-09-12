import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import test from 'node:test';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const requireApp = createRequire(new URL('../apps/mobile-app/package.json', import.meta.url));
const requireRouter = createRequire(requireApp.resolve('expo-router/package.json'));
const queryStringPath = requireRouter.resolve('query-string');
const queryString = requireRouter('query-string');

test('router query parameters preserve Unicode, spaces, repeated keys, and empty values', () => {
  const values = { city: 'Montréal', search: 'coffee & tea', tag: ['one', 'two'], empty: '' };
  assert.deepEqual({ ...queryString.parse(queryString.stringify(values)) }, values);
  assert.deepEqual(
    { ...queryString.parse('q=coffee+tea&flag&empty=') },
    {
      q: 'coffee tea',
      flag: null,
      empty: '',
    }
  );
});

test('router decoder handles long malformed percent encoding without hanging', async () => {
  // A separate process bounds the regression even if the decoder blocks its event loop.
  const script = `
    const assert = require('node:assert/strict');
    const queryString = require(process.argv[1]);
    const value = '%FF'.repeat(2000);
    assert.equal(queryString.parse('q=' + value).q, value);
    assert.equal(queryString.parse('q=%st%C3%A5le%').q, '%ståle%');
    assert.equal(queryString.parse('q=%FE%FF').q, '\\uFFFD\\uFFFD');
  `;
  await execFileAsync(process.execPath, ['-e', script, queryStringPath], { timeout: 5000 });
});
