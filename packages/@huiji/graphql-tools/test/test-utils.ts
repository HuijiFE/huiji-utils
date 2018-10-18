import { __Schema, __IntrospectionBase, sortSchemaTypes } from '../src/introspection';
import fs from 'fs';

jest.setTimeout(300000);

// curl -H "Authorization: bearer token" https://api.github.com/graphql
// curl -H "Authorization: bearer token" -H "Accept: application/vnd.github.v4.idl" https://api.github.com/graphql
const token: string = process.env.PERSONAL_ACCESS_TOKEN_TEST as string;
console.info(`PERSONAL_ACCESS_TOKEN_TEST: ${token}`);

export const gamelibEntry: string = 'https://graphql.xy.huijitrans.com/graphql';
const entry: string = 'https://api.github.com/graphql';

/**
 * github introspection
 */
export const rawIntroAsync = new Promise<__Schema>((resolve, reject) => {
  const schema: __Schema = JSON.parse(fs.readFileSync('.tmp/gh.intro.json', 'utf-8')).data
    .__schema;

  sortSchemaTypes(schema);

  resolve(schema);
});
/**
 * github introspection
 */
export const rawIntroAsyncNoSort = new Promise<__Schema>((resolve, reject) => {
  const schema: __Schema = JSON.parse(fs.readFileSync('.tmp/gh.intro.json', 'utf-8')).data
    .__schema;

  resolve(schema);
});

/**
 * github idl
 */
export const rawIDLAsync = new Promise<string>((resolve, reject) => {
  resolve(JSON.parse(fs.readFileSync('.tmp/gh.idl.json', 'utf-8')).data);
});

// /**
//  * introspection
//  */
// export const introAsync = getIntrospection(entry, {
//   headers: {
//     Authorization: `bearer ${token}`,
//   },
// });
