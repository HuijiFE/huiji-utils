/**
 * Test
 */
import fs from 'fs';
import { __IntrospectionBase, getIntrospection, commonCompare } from './introspection';
import { gamelibEntry } from '../test/test-utils';

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

    const game = intro.types.find(td => td.name === 'game');
    if (game) {
      const news = game.fields.find(fd => fd.name === 'news');
      if (news) {
        expect(news.args.map(a => a.name)).toMatchObject([
          'data_source_keys',
          'first',
          'orderBy',
          'skip',
          'tag',
        ]);
      }
    }

    fs.writeFileSync('.tmp/gl.intro.json', JSON.stringify(intro, undefined, '  '));
    expect(intro).toHaveProperty('types');
    expect(intro).toHaveProperty('queryType');
  });
});
