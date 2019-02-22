import pth from 'path';
import fs from 'fs';
import globby from 'globby';
import { Options as FastGlobOptions } from 'fast-glob';
import mkdirp from 'mkdirp';
import chalk, { Chalk } from 'chalk';

function log(color: Chalk, label: string, content: string): void {
  console.info(`${color(` ${label} `)}${''.padEnd(16 - label.length, ' ')} ${content}`);
}

export interface FileInfo {
  path: string;
  name: string;
  ext: string;
}

/**
 * Options for generate files
 */
export interface GenFilesOptions {
  patterns: string | string[];
  globbyOptions?: FastGlobOptions;
  output: string;
  comments?: string[];
  header?: string;
  footer?: string;
  body?(files: FileInfo[]): string;
  item?(info: FileInfo): string;
}

/**
 * Replace the matching part with alias in the path.
 * @param path the path
 */
function resolvePath(path: string, output: string): string {
  return path.replace(pth.dirname(output), '.');
}

/**
 * Use files paths to generate export/import statements.
 */
function scriptResolve({ path, name, ext }: FileInfo): string {
  switch (ext) {
    case '.vue':
      return `export { default as ${name} } from '${path}';`;

    case '.ts':
    case '.tsx':
    case '.js':
    case '.jsx':
      return `export * from '${path.replace(/\.(j|t)sx?$/, '')}';`;

    default:
      throw new Error(`Cannot import ${ext} file (${path}) in .ts file.`);
  }
}

/**
 * Use files paths to generate export/import statements.
 */
function styleResolve({ path, name, ext }: FileInfo): string {
  switch (ext) {
    case '.scss':
    case '.less':
    case '.css':
      return `@import '${path.replace(/\.(scss|less)$/, '')}';`;

    default:
      throw new Error(`Cannot import ${ext} file (${path}) in scss/less/css file.`);
  }
}

function generateComments(comments: string[], jsdoc: boolean = true): string {
  return jsdoc
    ? ['/**', ...comments.map(c => ` * ${c}`), ' */'].join('\n')
    : comments.map(c => `// ${c}`).join('\n');
}

const banner: string = generateComments(
  [
    'Do not edit this file.',
    'It is auto generated by script "scripts/gen-files.ts".',
    'To update this file, please run command `yarn gen-files`.',
    'tslint:disable',
  ],
  false,
);

/**
 * Auto generate source code.
 * The patterns and output must in the same directory
 */
export async function genFiles(options: GenFilesOptions): Promise<void> {
  let body: string;
  const files: FileInfo[] = (await globby(
    [
      ...(Array.isArray(options.patterns) ? options.patterns : [options.patterns]),
      `!${options.output}`,
    ],
    options.globbyOptions,
  ))
    .sort()
    .map(f => ({
      path: resolvePath(f, options.output),
      name: pth.basename(f).replace(/\.[A-Za-z0-9\-\_]+/, ''),
      ext: pth.extname(f),
    }));

  if (files.length === 0) {
    return log(chalk.bgYellow.black, 'No files', options.output);
  }

  if (options.body) {
    body = options.body(files);
  } else if (options.item) {
    body = files.map(options.item).join('\n');
  } else if (/\.(j|t)sx?$/.test(options.output)) {
    body = files.map(scriptResolve).join('\n');
  } else if (/\.(scss|less|css)$/.test(options.output)) {
    body = files.map(styleResolve).join('\n');
  } else {
    throw new Error(
      `
Cannot generate "${options.output}",
${pth.extname(options.output)} file is not default supported,
please provide a resolver function.
`,
    );
  }

  const content: string = [
    banner,
    '\n\n',
    ...(options.comments && options.comments.length > 0
      ? [generateComments(options.comments), '\n\n']
      : []),
    ...(options.header ? [options.header, '\n'] : []),
    body,
    ...(options.footer ? ['\n', options.footer] : []),
    '\n',
  ].join('');

  return new Promise<void>((resolve, reject) => {
    const dir: string = pth.dirname(options.output);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    if (!fs.existsSync(options.output)) {
      fs.writeFileSync(options.output, '');
    }

    fs.readFile(options.output, 'utf-8', (readError, oldContent) => {
      if (readError) {
        return reject(readError);
      }
      if (content === oldContent) {
        log(chalk.bgGreen.black, 'No Changes', options.output);

        return resolve();
      }

      fs.writeFile(options.output, content, writeError => {
        if (writeError) {
          return reject(writeError);
        }
        log(chalk.bgCyanBright.black, 'File Updated', options.output);

        return resolve();
      });
    });
  });
}
