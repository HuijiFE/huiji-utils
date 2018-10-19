import fs from 'fs';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import { genPathResolve } from '@huiji/shared-utils';
import {
  getIntrospection,
  generateGraphQLSchema,
  generateTypeScriptDeclaration,
} from '@huiji/graphql-tools';

const resolvePath = genPathResolve(__dirname);

/**
 * Generate
 */
async function generate(): Promise<void> {
  const [newsIntro, gameIntro] = await Promise.all([
    getIntrospection('https://news-graphql.xy.huijitrans.com/graphql'),
    getIntrospection('https://graphql.xy.huijitrans.com/graphql'),
  ]);

  const newsSchema = generateGraphQLSchema(newsIntro);
  const newsDeclaration = generateTypeScriptDeclaration(newsIntro);

  const gameSchema = generateGraphQLSchema(gameIntro);
  const gameDeclaration = generateTypeScriptDeclaration(gameIntro);

  rimraf.sync(resolvePath('tgbus_schemas'));
  mkdirp.sync(resolvePath('tgbus_schemas'));

  fs.writeFileSync(
    resolvePath('tgbus_schemas/news.json'),
    JSON.stringify(newsIntro, undefined, '  '),
  );
  fs.writeFileSync(resolvePath('tgbus_schemas/news.gql'), newsSchema);
  fs.writeFileSync(resolvePath('tgbus_schemas/news.ts'), newsDeclaration);

  fs.writeFileSync(
    resolvePath('tgbus_schemas/game.json'),
    JSON.stringify(gameIntro, undefined, '  '),
  );
  fs.writeFileSync(resolvePath('tgbus_schemas/game.gql'), gameSchema);
  fs.writeFileSync(resolvePath('tgbus_schemas/game.ts'), gameDeclaration);
}

generate().catch(console.error);
