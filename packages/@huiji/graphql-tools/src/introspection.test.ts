/**
 * Test
 */
import fs from 'fs';
import { __IntrospectionBase, getIntrospection, commonCompare } from './introspection';
import { gamelibEntry, rawIntroAsync, rawIntroAsyncNoSort } from '../test/test-utils';

describe('introspection.ts', () => {
  test('Compare', async () => {
    const seeds: (string | null)[] = ['cd', 'be', 'xa', '_ds', '__a', 'a', 'be', '', ''];
    expect(
      seeds
        .map<__IntrospectionBase>(s => ({ name: s }))
        .sort((a, b) => commonCompare(a, b))
        .map(i => i.name),
    ).toMatchObject(seeds.sort());
  });

  test('getIntrospection', async () => {
    const intro = await getIntrospection(gamelibEntry);
    fs.writeFileSync('.tmp/gl.intro.json', JSON.stringify(intro, undefined, '  '));
    expect(intro).toHaveProperty('types');
    expect(intro).toHaveProperty('queryType');
  });
});
