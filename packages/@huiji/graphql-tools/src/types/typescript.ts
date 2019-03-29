/* eslint-disable no-underscore-dangle */
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
import { eliminateIntrospectionType, isEnum, isNonNull } from '../utils';

const TYPE_KIND_KEYWORD_MAP: Record<__TypeKind, string> = {
  [__TypeKind.SCALAR]: 'type',
  [__TypeKind.OBJECT]: 'interface',
  [__TypeKind.INTERFACE]: 'interface',
  [__TypeKind.UNION]: 'type',
  [__TypeKind.ENUM]: 'enum',
  [__TypeKind.INPUT_OBJECT]: 'interface',
  [__TypeKind.LIST]: 'list',
  [__TypeKind.NON_NULL]: 'nonnull',
};

const BUILT_IN_SCALAR_TYPES: string[] = ['String', 'Boolean'];

const BUILT_IN_SCALAR_TYPE_MAP: Record<string, string> = {
  Int: 'number',
  Float: 'number',
  /**
   * The ID scalar type represents a unique identifier,
   * often used to refetch an object or as the key for a cache.
   * The ID type is serialized in the same way as a String;
   * however, defining it as an ID signifies that it is not intended to be human‐readable.
   */
  ID: 'string',
};

export interface TypeScriptDeclarationOptions {
  /**
   * @default false
   */
  debug?: boolean;
  /**
   * If true, output the root type `Query`, `Mutation` and `Subscript`.
   * @default true
   */
  outputRoot?: boolean;
  /**
   * @default true
   */
  outputResponse?: boolean;
  /**
   * Make all properties optional
   * @default true
   */
  partial?: boolean;
  /**
   * Make all properties readonly
   * @default true
   */
  readonly?: boolean;

  customScalars?: Record<string, string>;

  prettierOptions?: PrettierOptions;
}

/**
 * Generate TypeScript declaration with GraphQL introspection.
 * @param schema the GraphQL introspection
 */
export function generateTypeScriptDeclaration(
  schema: __Schema,
  {
    debug = false,
    outputRoot = true,
    partial = true,
    readonly = true,
    customScalars = {},
    prettierOptions = {},
  }: TypeScriptDeclarationOptions = {},
): string {
  let idl = genDescription(schema.__info, true).join('\n');
  idl += '\n\n';

  if (outputRoot) {
    idl += genRoot(schema);
  }

  const types: __Type[] = debug
    ? schema.types
    : schema.types.filter(eliminateIntrospectionType);

  const scalarsMap: Record<string, string> = {
    ...BUILT_IN_SCALAR_TYPE_MAP,
    ...customScalars,
  };
  idl += types
    .map(td => genTypeDeclaration(td, partial, readonly, scalarsMap))
    .filter(s => !!s)
    .join('\n\n');

  idl += '\n';

  idl = prettier.format(idl, {
    ...defaultPrettierOptions(),
    ...prettierOptions,
    parser: 'typescript',
  });

  return idl;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function genRoot(schema: __Schema): string {
  // let idl = `export interface Schema {\n  query: ${schema.queryType.name};\n`;
  // if (schema.mutationType) {
  //   idl += `  mutation: ${schema.mutationType.name};\n`;
  // }
  // if (schema.subscriptionType) {
  //   idl += `  subscription: ${schema.subscriptionType.name};\n`;
  // }
  // return idl;

  return '';
}

function genTypeDeclaration(
  td: __Type,
  partial: boolean,
  readonly: boolean,
  customScalarTypes: Record<string, string>,
): string {
  if (
    td.kind === __TypeKind.SCALAR &&
    BUILT_IN_SCALAR_TYPES.includes(td.name as string)
  ) {
    return '';
  }

  const lines: string[] = [];

  lines.push(...genDescription(td.description));

  let firstLine: string = `export ${TYPE_KIND_KEYWORD_MAP[td.kind]} ${td.name}`;

  if (td.interfaces && td.interfaces.length > 0) {
    firstLine += ` extends ${td.interfaces.map(t => t.name).join(', ')}`;
  }
  if (td.kind === __TypeKind.UNION && td.possibleTypes) {
    firstLine += ` = ${td.possibleTypes.map(t => t.name).join(' | ')}`;
  }
  if (td.kind === __TypeKind.SCALAR) {
    firstLine += ` = ${customScalarTypes[td.name as string] || 'never'}`;
  }

  const block: string[] = [
    ...genFieldOrValueArray(td.fields, partial, readonly, 'fields'),
    ...genFieldOrValueArray(td.inputFields, partial, readonly, 'inputFields'),
    ...genFieldOrValueArray(td.enumValues, false, false, 'enumValues'),
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

function genDescription(
  description: string | null | undefined,
  line?: boolean,
): string[] {
  if (description) {
    return line
      ? description
          .trim()
          .split(/[\n\r]/)
          .map(l => `// ${l}`)
      : [
          '/**',
          ...description
            .trim()
            .split(/[\n\r]/)
            .map(l => ` * ${l}`),
          ' */',
        ];
  }

  return [];
}

function genFieldOrValueArray(
  arr: (__Field | __InputValue | __EnumValue)[] | null | undefined,
  partial: boolean,
  readonly: boolean,
  category: 'fields' | 'inputFields' | 'enumValues',
): string[] {
  return arr && arr.length > 0
    ? arr
        .map(e => genFieldOrValue(e, partial, readonly, category))
        .reduce<string[]>((result, cur) => result.concat(cur), [])
    : [];
}

function genFieldOrValue(
  mb: __Field | __InputValue | __EnumValue,
  partial: boolean,
  readonly: boolean,
  category: 'fields' | 'inputFields' | 'enumValues',
): string[] {
  let text: string = readonly ? `readonly ${mb.name}` : mb.name;

  let description = (mb.description || '')
    .trim()
    .split(/[\n\r]/)
    .map(l => l.trim())
    .join('\n');

  if (category === 'fields' || category === 'inputFields') {
    const fd = mb as __Field | __InputValue;
    const nonNull = isNonNull(fd.type);
    let typeName: string;

    if (category === 'fields' && partial) {
      text += '?';
      typeName = genType(fd.type, nonNull);
    } else {
      if (!nonNull) {
        text += '?';
      }
      typeName = genType(fd.type, true);
    }

    text += `: ${typeName}`;

    if ('args' in fd && fd.args.length > 0) {
      description += '\n\n';
      description += generateFieldWithArgsComment(fd.name, fd.args, typeName);
    }
  }

  if (category === 'inputFields' && 'defaultValue' in mb && mb.defaultValue) {
    let { defaultValue } = mb;
    if (isEnum(mb.type)) {
      defaultValue = `${mb.type.name}.${defaultValue.replace(/"/g, '')}`;
    }
    description += `\n\n@default ${defaultValue}`;
  }

  if (category === 'enumValues') {
    text += ` = '${mb.name}'`;
  }

  text += category === 'enumValues' ? ',' : ';';

  return [...genDescription(description), text, ''].map(l => `  ${l}`);
}

function generateFieldWithArgsComment(
  fieldName: string,
  args: __InputValue[],
  typeName: string,
): string {
  const argsLines: string[] = [];

  args.forEach(a => {
    if (a.description) {
      argsLines.push(
        ...a.description
          .trim()
          .split(/[\n\r]/)
          .map(l => `  // ${l.trim()}`),
      );
    }
    argsLines.push(
      `  ${a.name}${isNonNull(a.type) ? '' : '?'}: ${genType(a.type, true)},`,
    );
  });

  return ['```', `function ${fieldName}(`, ...argsLines, `): ${typeName};`, '```'].join(
    '\n',
  );
}

function genType(td: __Type, nonNull?: boolean): string {
  let name = td.name as string;

  switch (td.kind) {
    case __TypeKind.SCALAR:
      name = BUILT_IN_SCALAR_TYPES.includes(name) ? name.toLowerCase() : name;
      break;
    case __TypeKind.LIST:
      return nonNull
        ? `(${genType(td.ofType as __Type, isNonNull(td.ofType))})[]`
        : `((${genType(td.ofType as __Type, isNonNull(td.ofType))})[] | null)`;
    case __TypeKind.NON_NULL:
      return genType(td.ofType as __Type, true);

    default:
  }

  return nonNull ? name : `${name} | null`;
}
