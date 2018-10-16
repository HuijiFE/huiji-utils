import {
  __Schema,
  __Type,
  __TypeKind,
  __Field,
  __InputValue,
  __EnumValue,
} from '../introspection';

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

/**
 *
 * @param introspection the GraphQL introspection
 */
export function generateSchema(introspection: __Schema, debug: boolean = false): string {
  let types: __Type[];

  let schema = '';
  if (debug) {
    schema += 'schema {\n';
    schema += `  query: ${introspection.queryType.name}\n`;
    if (introspection.mutationType) {
      schema += `  mutation: ${introspection.mutationType.name}\n`;
    }
    if (introspection.subscriptionType) {
      schema += `  subscription: ${introspection.subscriptionType}\n`;
    }
    schema += '}\n\n';

    types = introspection.types;
  } else {
    types = introspection.types.filter(
      t => !(t.name as string).startsWith('__') && t.name !== 'Query',
    );
  }

  types.sort(({ name: a }, { name: b }) => {
    a = a || '';
    b = b || '';
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }

    return 0;
  });

  schema += types
    .map(td => genTypeDeclaration(td))
    .filter(s => s !== '')
    .join('\n\n');

  schema += '\n';

  return schema;
}

function genTypeDeclaration(td: __Type): string {
  const lines: string[] = [];

  lines.push(...genDescription(td.description));

  let firstLine: string = `${TYPE_KIND_KEYWORD_MAP[td.kind] || 'unknown'} ${td.name}`;

  if (td.interfaces && td.interfaces.length > 0) {
    firstLine += ` implements ${td.interfaces.map(t => t.name).join(' & ')}`;
  }
  if (td.kind === __TypeKind.UNION && td.possibleTypes) {
    firstLine += ` = ${td.possibleTypes.map(t => t.name).join(' | ')}`;
  }

  const block: string[] = [
    ...genFields(td.fields),
    ...genFields(td.inputFields),
    ...genEnumValues(td.enumValues),
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
  return description ? [...description.split(/[\n\r]/).map(l => `# ${l.trim()}`)] : [];
}

function genFields(fileds: (__Field | __InputValue)[] | null | undefined): string[] {
  return fileds && fileds.length > 0
    ? fileds.map(fd => genFieldOrValue(fd)).reduce<string[]>((result, cur) => {
        result.push(...cur);

        return result;
      }, [])
    : [];
}

function genArgs(args: __InputValue[] | null | undefined): string[] {
  return args && args.length > 0
    ? args.map(a => genFieldOrValue(a)).reduce<string[]>((result, cur) => {
        result.push(...cur);

        return result;
      }, [])
    : [];
}

function genEnumValues(enumValues: __EnumValue[] | null | undefined): string[] {
  return enumValues && enumValues.length > 0
    ? enumValues.map(e => genFieldOrValue(e)).reduce<string[]>((result, cur) => {
        result.push(...cur);

        return result;
      }, [])
    : [];
}

function genFieldOrValue(fd: __Field | __InputValue | __EnumValue): string[] {
  const args: string[] = 'args' in fd ? genArgs(fd.args) : [];

  let firstLine: string = fd.name;
  let lastLine: string = '';

  if (args.length > 0) {
    args.pop();
    firstLine += '(';
    lastLine += ')';
  }

  if ('type' in fd) {
    lastLine += `: ${genType(fd.type)}`;
  }

  if ('defaultValue' in fd && fd.defaultValue) {
    lastLine += ` = ${fd.defaultValue}`;
  }

  if ('isDeprecated' in fd && fd.isDeprecated) {
    lastLine += ` @deprecated(reason: "${fd.deprecationReason}")`;
  }

  return (args.length > 0
    ? [...genDescription(fd.description), firstLine, ...args, lastLine, '']
    : [...genDescription(fd.description), firstLine + lastLine, '']
  ).map(l => `  ${l}`);
}

function genType(td: __Type | null | undefined): string {
  if (!td) {
    return '';
  }

  switch (td.kind) {
    case __TypeKind.LIST:
      return `[${genType(td.ofType)}]`;
    case __TypeKind.NON_NULL:
      return `${genType(td.ofType)}!`;

    default:
      return td.name || '';
  }
}
