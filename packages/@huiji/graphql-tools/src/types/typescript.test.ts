/**
 * Test
 */
import fs from 'fs';
import { __Type, __TypeKind, __Field, getIntrospection } from '../introspection';
import { generateTypeScriptDeclaration } from './typescript';
import { defaultPrettierOptions } from '../prettier-options';
import {
  gamelibEntry,
  rawIntroAsync,
  rawIDLAsync,
  rawIntroAsyncNoSort,
} from '../../test/test-utils';
import prettier from 'prettier';

const entry: string = 'https://graphql.xy.huijitrans.com/graphql';

const customScalars: Record<string, string> = {
  Date: 'string',
  DateTime: 'string',
  HTML: 'string',
  URI: 'string',
};

describe('types/graphql.ts', () => {
  test('generateSchema', async () => {
    const intro = await getIntrospection(gamelibEntry);
    const schema = generateTypeScriptDeclaration(intro);
    expect(typeof schema).toBe('string');
    expect(schema.split('\n').length > 20).toBe(true);

    fs.writeFileSync('.tmp/gl.d.ts', schema);
  });

  test('generateSchema GitHub', async () => {
    const intro = await rawIntroAsync;
    const schema = generateTypeScriptDeclaration(intro, {
      outputRoot: false,
      customScalars,
    });

    expect(schema.includes('export type Date = string;')).toBe(true);
    expect(typeof schema).toBe('string');

    fs.writeFileSync('.tmp/gh.d.ts', schema);
  });

  test('generateSchema GameLib debug', async () => {
    const intro = await getIntrospection(gamelibEntry, undefined, { sort: false });
    const schema = generateTypeScriptDeclaration(intro, {
      debug: true,
      outputRoot: true,
      hoistScalars: false,
    });

    fs.writeFileSync('.tmp/gl.debug.d.ts', schema);
  });

  test('generateSchema GitHub debug', async () => {
    const intro = await rawIntroAsyncNoSort;
    const schema = generateTypeScriptDeclaration(intro, {
      debug: true,
      outputRoot: true,
      hoistScalars: false,
      customScalars,
    });

    fs.writeFileSync('.tmp/gh.debug.d.ts', schema);
  });
});
