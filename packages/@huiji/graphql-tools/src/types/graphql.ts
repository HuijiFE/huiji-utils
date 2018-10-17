import prettier, { Options as PrettierOptions } from 'prettier';
import { defaultPrettierOptions } from '../prettier-options';
import {
  __Schema,
  __Type,
  __TypeKind,
  __Field,
  __InputValue,
  __EnumValue,
} from '../introspection';
import { eliminateIntrospectionType, isEnum } from '../utils';

const TYPE_KIND_KEYWORD_MAP: Record<__TypeKind, string> = {
  [__TypeKind.SCALAR]: 'scalar',
  [__TypeKind.OBJECT]: 'type',
  [__TypeKind.INTERFACE]: 'interface',
  [__TypeKind.UNION]: 'union',
  [__TypeKind.ENUM]: 'enum',
  [__TypeKind.INPUT_OBJECT]: 'input',
  [__TypeKind.LIST]: 'list',
  [__TypeKind.NON_NULL]: 'nonnull',
};

const BUILT_IN_SCALAR_TYPES: string[] = ['Int', 'Float', 'String', 'Boolean', 'ID'];

export interface GraphQLSchemaOptions {
  /**
   * @default false
   */
  debug?: boolean;
  /**
   * @default true
   */
  outputRoot?: boolean;

  prettierOptions?: PrettierOptions;
}

/**
 * Generate GraphQL schema (IDL format) with introspection.
 * @param schema the GraphQL introspection
 */
export function generateGraphQLSchema(
  schema: __Schema,
  { debug = false, outputRoot = true, prettierOptions = {} }: GraphQLSchemaOptions = {},
): string {
  let idl = '';

  if (outputRoot) {
    idl += genRoot(schema);
  }

  const types: __Type[] = debug
    ? schema.types
    : schema.types.filter(eliminateIntrospectionType);

  idl += types
    .map(td => genTypeDeclaration(td))
    .filter(s => !!s)
    .join('\n\n');

  idl += '\n';

  idl = prettier.format(idl, {
    ...defaultPrettierOptions(),
    ...prettierOptions,
    parser: 'graphql',
  });

  return idl;
}

function genRoot(schema: __Schema): string {
  let idl = `schema {\n  query: ${schema.queryType.name}\n`;
  if (schema.mutationType) {
    idl += `  mutation: ${schema.mutationType.name}\n`;
  }
  if (schema.subscriptionType) {
    idl += `  subscription: ${schema.subscriptionType.name}\n`;
  }
  idl += '}\n\n';

  return idl;
}

function genTypeDeclaration(td: __Type): string {
  if (
    td.kind === __TypeKind.SCALAR &&
    BUILT_IN_SCALAR_TYPES.includes(td.name as string)
  ) {
    return '';
  }

  const lines: string[] = [];

  lines.push(...genDescription(td.description));

  let firstLine: string = `${TYPE_KIND_KEYWORD_MAP[td.kind]} ${td.name}`;

  if (td.interfaces && td.interfaces.length > 0) {
    firstLine += ` implements ${td.interfaces.map(t => t.name).join(' & ')}`;
  }
  if (td.kind === __TypeKind.UNION && td.possibleTypes) {
    firstLine += ` = ${td.possibleTypes.map(t => t.name).join(' | ')}`;
  }

  const block: string[] = [
    ...genFieldOrValueArray(td.fields),
    ...genFieldOrValueArray(td.inputFields),
    ...genFieldOrValueArray(td.enumValues),
  ];

  if (block.length > 0) {
    block.pop();
    lines.push(`${firstLine} {`);
    lines.push(...block);
    lines.push('}');
  } else {
    lines.push(firstLine);
  }

  return lines.join('\n');
}

function genDescription(description: string | null | undefined): string[] {
  return description
    ? [
        ...description
          .trim()
          .split(/[\n\r]/)
          .map(l => `# ${l}`),
      ]
    : [];
}

function genFieldOrValueArray(
  arr: (__Field | __InputValue | __EnumValue)[] | null | undefined,
): string[] {
  return arr && arr.length > 0
    ? arr
        .map(e => genFieldOrValue(e))
        .reduce<string[]>((result, cur) => result.concat(cur), [])
    : [];
}

function genFieldOrValue(fd: __Field | __InputValue | __EnumValue): string[] {
  let firstLine: string = fd.name;
  let lastLine: string = '';

  const args: string[] = 'args' in fd ? genFieldOrValueArray(fd.args) : [];
  if (args.length > 0) {
    args.pop();
    firstLine += '(';
    lastLine += ')';
  }

  const typeName = 'type' in fd ? genType(fd.type) : undefined;
  if (typeName) {
    lastLine += `: ${typeName}`;
  }

  if ('defaultValue' in fd && fd.defaultValue) {
    let defaultValue = fd.defaultValue;
    if (isEnum(fd.type)) {
      defaultValue = defaultValue.replace(/"/g, '');
    }
    lastLine += ` = ${defaultValue}`;
  }

  if ('isDeprecated' in fd && fd.isDeprecated) {
    lastLine += ` @deprecated(reason: "${fd.deprecationReason}")`;
  }

  return (args.length > 0
    ? [...genDescription(fd.description), firstLine, ...args, lastLine, '']
    : [...genDescription(fd.description), firstLine + lastLine, '']
  ).map(l => `  ${l}`);
}

function genType(td: __Type): string {
  switch (td.kind) {
    case __TypeKind.LIST:
      return `[${genType(td.ofType as __Type)}]`;
    case __TypeKind.NON_NULL:
      return `${genType(td.ofType as __Type)}!`;

    default:
      return td.name as string;
  }
}
