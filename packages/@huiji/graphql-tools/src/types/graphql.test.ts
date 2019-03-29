/**
 * Test
 */
import fs from 'fs';
import prettier from 'prettier';
import { defaultPrettierOptions } from '../prettier-options';
import { getIntrospection, __TypeKind } from '../introspection';
import { generateGraphQLSchema } from './graphql';
import {
  gamelibEntry,
  rawIntroAsync,
  rawIDLAsync,
  rawIntroAsyncNoSort,
} from '../../test/test-utils';

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
    const filter = (): ((l: string) => boolean) => {
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
        // console.warn(gen, raw);
      } else {
        expect(gen).toBe(raw);
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

    rawIntro.subscriptionType = {
      kind: __TypeKind.OBJECT,
      name: 'Subscription',
      description: null,
      enumValues: [],
      fields: [],
      inputFields: [],
      interfaces: [],
      ofType: null,
      possibleTypes: [],
    };
    const genSchema = generateGraphQLSchema(rawIntro, {
      debug: true,
      outputRoot: true,
    });

    fs.writeFileSync('.tmp/gh.debug.gql', genSchema);
  });
});
