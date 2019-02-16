/**
 * Test
 */
import fs from 'fs';
import pth from 'path';
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

    fs.writeFileSync('.tmp/gl.gql', schema);
  });

  test('generateSchema GitHub', async () => {
    const [rawIntro, rawSchema] = await Promise.all([
      rawIntroAsync,
      rawIDLAsync.then(sc =>
        prettier.format(sc, {
          ...defaultPrettierOptions(),
          parser: 'graphql',
        }),
      ),
    ]);
    const genSchema = generateGraphQLSchema(rawIntro, {
      outputRoot: false,
    });

    expect(typeof genSchema).toBe('string');

    // for remove comments
    const filter = () => {
      let isComment = false;

      return (l: string) => {
        const content = l.trim();

        if (!content) {
          return false;
        }
        if (content.startsWith('"""')) {
          isComment = !isComment;

          return false;
        }
        if (isComment) {
          return false;
        }
        if (content.startsWith('#')) {
          return false;
        }

        return true;
      };
    };

    const rawLines = rawSchema.split('\n').filter(filter());
    const genLines = genSchema.split('\n').filter(filter());

    fs.writeFileSync('.tmp/gh.raw.gql', rawSchema);
    fs.writeFileSync('.tmp/gh.gen.gql', genSchema);
    fs.writeFileSync('.tmp/gh.raw.pure.gql', rawLines.join('\n'));
    fs.writeFileSync('.tmp/gh.gen.pure.gql', genLines.join('\n'));

    for (let index = 0; index < genLines.length; index++) {
      const gen = `[${index}] ${genLines[index]}`;
      const raw = `[${index}] ${rawLines[index]}`;
      if (gen.endsWith(' # INPUT_OBJECT')) {
        console.warn(gen, raw);
      } else {
        expect(`[${index}] ${genLines[index]}`).toBe(`[${index}] ${rawLines[index]}`);
      }
    }

    expect(rawLines.length).toBe(genLines.length);
  });

  test('generateSchema GameLib debug', async () => {
    const rawIntro = await getIntrospection(gamelibEntry, undefined, {
      sort: false,
      hoist: false,
    });
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
