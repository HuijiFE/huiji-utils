import { __Type, __TypeKind } from './introspection';

/**
 * For eliminating debug types in introspection
 */
export const eliminateIntrospectionType = (t: __Type): boolean =>
  !(t.name as string).startsWith('__');

export const isEnum = (td: __Type | null | undefined): boolean =>
  !!td && (td.kind === __TypeKind.ENUM || (!!td.ofType && isEnum(td.ofType)));

export const isInputObject = (td: __Type | null | undefined): boolean =>
  !!td && td.kind === __TypeKind.INPUT_OBJECT;

export const isNonNull = (td: __Type | null | undefined): boolean =>
  !!td && td.kind === __TypeKind.NON_NULL;
