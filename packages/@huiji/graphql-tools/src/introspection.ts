import axios, { AxiosRequestConfig } from 'axios';

const query = `
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

// tslint:disable:class-name no-reserved-keywords

/**
 * A GraphQL Schema defines the capabilities of a GraphQL server.
 * It exposes all available types and directives on the server,
 * as well as the entry points for query, mutation, and subscription operations.
 */
export interface __Schema {
  types: __Type[];
  queryType: __Type;
  mutationType: __Type | null;
  subscriptionType: __Type | null;
  directives: __Directive[];
}

/**
 * The fundamental unit of any GraphQL Schema is the type.
 * There are many kinds of types in GraphQL as represented by the __TypeKind enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type.
 * Scalar types provide no information beyond a name and description, while Enum types provide their values.
 * Object and Interface types provide the fields they describe.
 * Abstract types, Union and Interface, provide the Object types possible at runtime.
 * List and NonNull types compose other types.
 */
export interface __Type {
  kind: __TypeKind;
  name: string | null;
  description: string | null;
  fields: __Field[] | null;
  interfaces: __Type[] | null;
  possibleTypes: __Type[] | null;
  enumValues: __EnumValue[] | null;
  inputFields: __InputValue[] | null;
  ofType: __Type | null;
}

/**
 * An enum describing what kind of type a given __Type is.
 */
export enum __TypeKind {
  /**
   * Indicates this type is a scalar.
   */
  SCALAR = 'SCALAR',

  /**
   * Indicates this type is an object. fields and interfaces are valid fields.
   */
  OBJECT = 'OBJECT',

  /**
   * Indicates this type is an interface. fields and possibleTypes are valid fields.
   */
  INTERFACE = 'INTERFACE',

  /**
   * Indicates this type is a union. possibleTypes is a valid field.
   */
  UNION = 'UNION',

  /**
   * Indicates this type is an enum. enumValues is a valid field.
   */
  ENUM = 'ENUM',

  /**
   * Indicates this type is an input object. inputFields is a valid field.
   */
  INPUT_OBJECT = 'INPUT_OBJECT',

  /**
   * Indicates this type is a list. ofType is a valid field.
   */
  LIST = 'LIST',

  /**
   * Indicates this type is a non-null. ofType is a valid field.
   */
  NON_NULL = 'NON_NULL',
}

/**
 * Object and Interface types are described by a list of Fields,
 * each of which has a name, potentially a list of arguments, and a return type.
 */
export interface __Field {
  name: string;
  description: string | null;
  args: __InputValue[];
  type: __Type;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

/**
 * Arguments provided to Fields or Directives and the input fields of an InputObject
 * are represented as Input Values which describe their type and optionally a default value.
 */
export interface __InputValue {
  name: string;
  description: string | null;
  type: __Type;
  /**
   * A GraphQL-formatted string representing the default value for this input value.
   */
  defaultValue: string | null;
}

/**
 * One possible value for a given Enum. Enum values are unique values,
 * not a placeholder for a string or numeric value.
 * However an Enum value is returned in a JSON response as a string.
 */
export interface __EnumValue {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

/**
 * A Directive provides a way to describe alternate runtime execution
 * and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior
 * in ways field arguments will not suffice,
 * such as conditionally including or skipping a field.
 * Directives provide this by describing additional information to the executor.
 */
export interface __Directive {
  name: string;
  description?: string;
  locations: __DirectiveLocation[];
  args: __InputValue[];
}

/**
 * A Directive can be adjacent to many parts of the GraphQL language,
 * a __DirectiveLocation describes one such possible adjacencies.
 */
export enum __DirectiveLocation {
  /**
   * Location adjacent to a query operation.
   */
  QUERY = 'QUERY',

  /**
   * Location adjacent to a mutation operation.
   */
  MUTATION = 'MUTATION',

  /**
   * Location adjacent to a subscription operation.
   */
  SUBSCRIPTION = 'SUBSCRIPTION',

  /**
   * Location adjacent to a field.
   */
  FIELD = 'FIELD',

  /**
   * Location adjacent to a fragment definition.
   */
  FRAGMENT_DEFINITION = 'FRAGMENT_DEFINITION',

  /**
   * Location adjacent to a fragment spread.
   */
  FRAGMENT_SPREAD = 'FRAGMENT_SPREAD',

  /**
   * Location adjacent to an inline fragment.
   */
  INLINE_FRAGMENT = 'INLINE_FRAGMENT',

  /**
   * Location adjacent to a schema definition.
   */
  SCHEMA = 'SCHEMA',

  /**
   * Location adjacent to a scalar definition.
   */
  SCALAR = 'SCALAR',

  /**
   * Location adjacent to an object type definition.
   */
  OBJECT = 'OBJECT',

  /**
   * Location adjacent to a field definition.
   */
  FIELD_DEFINITION = 'FIELD_DEFINITION',

  /**
   * Location adjacent to an argument definition.
   */
  ARGUMENT_DEFINITION = 'ARGUMENT_DEFINITION',

  /**
   * Location adjacent to an interface definition.
   */
  INTERFACE = 'INTERFACE',

  /**
   * Location adjacent to a union definition.
   */
  UNION = 'UNION',

  /**
   * Location adjacent to an enum definition.
   */
  ENUM = 'ENUM',

  /**
   * Location adjacent to an enum value definition.
   */
  ENUM_VALUE = 'ENUM_VALUE',

  /**
   * Location adjacent to an input object type definition.
   */
  INPUT_OBJECT = 'INPUT_OBJECT',

  /**
   * Location adjacent to an input object field definition.
   */
  INPUT_FIELD_DEFINITION = 'INPUT_FIELD_DEFINITION',
}

export interface __IntrospectionBase {
  name: string | undefined | null;
}

// tslint:enable:class-name no-reserved-keywords

const stringCompare = (a: string, b: string) => (a < b && -1) || (a > b && 1) || 0;

export const commonCompare = (a: __IntrospectionBase, b: __IntrospectionBase) =>
  stringCompare(a.name || '', b.name || '');

export interface IntrospectionOptions {
  /**
   * Sorts members or interface in a `__Type` or not
   */
  sort?: boolean;
}

/**
 * Get GraphQL introspection
 * @param entry the url of GraphQL API entry
 */
export async function getIntrospection(
  entry: string,
  config?: AxiosRequestConfig,
  { sort = true }: IntrospectionOptions = {},
): Promise<__Schema> {
  const {
    data: {
      data: { __schema: schema },
    },
  } = await axios.post<{
    data: {
      __schema: __Schema;
    };
  }>(
    entry,
    {
      query,
    },
    config,
  );

  if (sort) {
    sortSchema(schema);
  }

  return schema;
}

export function sortSchema(schema: __Schema): __Schema {
  schema.types.sort(commonCompare);
  schema.types.forEach(td => {
    [td.fields, td.interfaces, td.possibleTypes, td.enumValues, td.inputFields].forEach(
      (arr: __IntrospectionBase[] | null) => arr && arr.sort(commonCompare),
    );
    if (td.fields) {
      td.fields.forEach(fd => fd.args.sort(commonCompare));
    }
  });

  return schema;
}
