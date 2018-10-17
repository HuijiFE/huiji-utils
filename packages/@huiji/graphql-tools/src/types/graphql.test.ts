/**
 * Test
 */
import fs from 'fs';
import { __Type, __TypeKind, __Field, getIntrospection } from '../introspection';
import { generateGraphQLSchema } from './graphql';
import { defaultPrettierOptions } from '../prettier-options';
import {
  gamelibEntry,
  rawIntroAsync,
  rawIDLAsync,
  rawIntroAsyncNoSort,
} from '../../test/test-utils';
import prettier from 'prettier';

const entry: string = 'https://graphql.xy.huijitrans.com/graphql';

describe('types/graphql.ts', () => {
  test('generateSchema', async () => {
    const intro = await getIntrospection(gamelibEntry);
    const schema = generateGraphQLSchema(intro);
    expect(typeof schema).toBe('string');
    expect(schema.split('\n').length > 20).toBe(true);
  });

  test('generateSchema GitHub', async () => {
    let [rawIntro, rawSchema] = await Promise.all([rawIntroAsync, rawIDLAsync]);
    rawSchema = prettier.format(rawSchema, {
      ...defaultPrettierOptions(),
      parser: 'graphql',
    });
    const genSchema = generateGraphQLSchema(rawIntro);

    expect(typeof genSchema).toBe('string');

    const filter = (l: string) => !!l && !/^(\ +)?\#/.test(l);

    const rawLines = rawSchema.split('\n').filter(filter);
    const genLines = genSchema.split('\n').filter(filter);

    expect(rawLines.length).toBe(genLines.length);

    for (let index = 0; index < genLines.length; index++) {
      expect(`[${index}] ${genLines[index]}`).toBe(`[${index}] ${rawLines[index]}`);
    }

    fs.writeFileSync('.tmp/gh.raw.gql', rawSchema);
    fs.writeFileSync('.tmp/gh.gen.gql', genSchema);
    fs.writeFileSync('.tmp/gh.raw.pure.gql', rawLines.join('\n'));
    fs.writeFileSync('.tmp/gh.gen.pure.gql', genLines.join('\n'));
  });

  test('generateSchema GameLib debug', async () => {
    const rawIntro = await getIntrospection(gamelibEntry, undefined, { sort: false });
    const genSchema = generateGraphQLSchema(rawIntro, {
      debug: true,
      outputRoot: true,
    });
    fs.writeFileSync('.tmp/gl.debug.gql', genSchema);
  });

  test('generateSchema GitHub debug', async () => {
    const rawIntro = await rawIntroAsyncNoSort;

    rawIntro.subscriptionType = { name: 'Subscription' } as any;
    const genSchema = generateGraphQLSchema(rawIntro, {
      debug: true,
      outputRoot: true,
    });
    fs.writeFileSync('.tmp/gh.debug.gql', genSchema);
  });
});
