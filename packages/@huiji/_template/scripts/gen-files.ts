/**
 * Auto generate files
 */
import { GenFilesOptions, genFiles } from '@huiji/shared-utils';

genFiles({
  comments: ['Hello~'],
  patterns: ['src/lib/**/*.ts'],
  output: 'src/lib/index.ts',
});
