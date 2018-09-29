import path from 'path';

/**
 * Create a function for resolving relative path to absolute path.
 * @param rootDirs path parts of the root directory
 */
export function genPathResolve(...rootDirs: string[]): (...paths: string[]) => string {
  const root: string = path.resolve(...rootDirs);

  return (...paths) => path.resolve(root, ...paths);
}
