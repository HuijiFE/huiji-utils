# graphql-tools

> A tool kit to generate schema for GraphQL and type declaration for other languages.

## Present Supports

- GraphQL Schema (IDL format)
- TypeScript Declaration

## Usage

```typescript
import fs from 'fs';
import { getIntrospection, generateGraphQLSchema } from '@huiji/graphql-loader';

(async () => {
  const intro = await getIntrospection('https://graphql.xy.huijitrans.com/graphql');

  const schema = generateGraphQLSchema(intro);
  fs.writeFileSync('.tmp/gamelib.gql', schema);

  const declaration = generateTypeScriptDeclaration(intro);
  fs.writeFileSync('.tmp/gamelib.d.ts', schema);
})();

(async () => {
  const intro = await getIntrospection('https://api.github.com/graphql', {
    headers: {
      Authorization: `bearer ${process.env.PERSONAL_ACCESS_TOKEN_TEST}`,
    },
  });

  const schema = generateGraphQLSchema(intro);
  fs.writeFileSync('.tmp/github.gql', schema);

  const declaration = generateTypeScriptDeclaration(intro, {
    customScalars: {
      Date: 'string',
      DateTime: 'string',
      HTML: 'string',
      URI: 'string',
    },
  });
  fs.writeFileSync('.tmp/github.d.ts', schema);
})();
```
