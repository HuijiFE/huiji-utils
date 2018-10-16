/**
 * Test
 */

import { introAsync, rawIntroAsync } from './test-utils';

describe('introspection.ts', () => {
  test('getIntrospection', async () => {
    const [intro, rawIntro] = await Promise.all([introAsync, rawIntroAsync]);
    expect(intro).toHaveProperty('queryType');
    expect(intro).toHaveProperty('types');
    expect(intro).toMatchObject(rawIntro);
  });
});
