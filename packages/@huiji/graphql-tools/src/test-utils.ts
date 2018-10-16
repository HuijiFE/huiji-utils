import { getIntrospection, __Schema } from './introspection';
import fs from 'fs';

jest.setTimeout(300000);

// curl -H "Authorization: bearer token" https://api.github.com/graphql
// curl -H "Authorization: bearer token" -H "Accept: application/vnd.github.v4.idl" https://api.github.com/graphql
const token: string = process.env.PERSONAL_ACCESS_TOKEN_TEST as string;
console.info(`PERSONAL_ACCESS_TOKEN_TEST: ${token}`);

const entry: string = 'https://graphql.xy.huijitrans.com//graphql';
// const entry: string = 'https://api.github.com/graphql';

/**
 * github introspection
 */
export const rawIntroAsync = new Promise<__Schema>((resolve, reject) => {
  fs.readFile(
    '.tmp.gh.intro.json',
    { encoding: 'utf-8' },
    (error, content) =>
      error ? reject(error) : resolve(JSON.parse(content).data.__schema),
  );
});

/**
 * github idl
 */
export const rawIDLAsync = new Promise<string>((resolve, reject) => {
  fs.readFile(
    '.tmp.gh.idl.json',
    { encoding: 'utf-8' },
    (error, content) => (error ? reject(error) : resolve(JSON.parse(content).data)),
  );
});

/**
 * introspection
 */
// export const introAsync = getIntrospection(entry, {
//   headers: {
//     Authorization: `bearer ${token}`,
//   },
// });

export const introAsync = rawIntroAsync;
