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
   * @default true
   */
  outputRoot?: boolean;
  /**
   * @default true
   */
  outputResponse?: boolean;
  /**
   * @default true
   */
  partial?: boolean;

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
    customScalars = {},
    prettierOptions = {},
  }: TypeScriptDeclarationOptions = {},
): string {
  let idl = '';

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
    .map(td => genTypeDeclaration(td, partial, scalarsMap))
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

function genRoot(schema: __Schema): string {
  return '';
}

function genTypeDeclaration(
  td: __Type,
  partial: boolean,
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
    ...genFieldOrValueArray(td.fields, partial, 'fields'),
    ...genFieldOrValueArray(td.inputFields, partial, 'inputFields'),
    ...genFieldOrValueArray(td.enumValues, false, 'enumValues'),
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
        '/**',
        ...description
          .trim()
          .split(/[\n\r]/)
          .map(l => ` * ${l}`),
        ' */',
      ]
    : [];
}

function genFieldOrValueArray(
  arr: (__Field | __InputValue | __EnumValue)[] | null | undefined,
  partial: boolean,
  category: 'fields' | 'inputFields' | 'enumValues',
): string[] {
  return arr && arr.length > 0
    ? arr
        .map(e => genFieldOrValue(e, partial, category))
        .reduce<string[]>((result, cur) => result.concat(cur), [])
    : [];
}

function genFieldOrValue(
  mb: __Field | __InputValue | __EnumValue,
  partial: boolean,
  category: 'fields' | 'inputFields' | 'enumValues',
): string[] {
  let text: string = mb.name;

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
    let defaultValue = mb.defaultValue;
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
      return `(${genType(td.ofType as __Type)})[]`;
    case __TypeKind.NON_NULL:
      return genType(td.ofType as __Type, true);

    default:
  }

  return nonNull ? name : `${name} | null`;
}
