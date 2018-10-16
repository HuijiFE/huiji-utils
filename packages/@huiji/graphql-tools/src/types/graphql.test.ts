/**
 * Test
 */

import { introAsync, rawIDLAsync } from '../test-utils';
import { generateSchema } from './graphql';
import fs from 'fs';

const entry: string = 'https://graphql.xy.huijitrans.com/graphql';

describe('types/graphql.ts', () => {
  test('generateSchema', async () => {
    const [intro, rawSchema] = await Promise.all([introAsync, rawIDLAsync]);
    const schema = generateSchema(intro);

    // expect(schema).toBe(rawSchema);

    expect(typeof schema).toBe('string');
    fs.writeFileSync('.tmp.1.gql', schema);
    fs.writeFileSync('.tmp.2.gql', rawSchema);
  });
});
