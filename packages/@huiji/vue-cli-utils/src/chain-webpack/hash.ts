// tslint:disable:no-require-imports
import ChainableWebpackConfig from 'webpack-chain';
import { VueServiceOptions } from '@vue/cli-service/lib/options';

export interface ChainWebpackHashOptions {
  /** @default true */
  hashModify?: boolean;
  /** @default 'hex' */
  hashDigest?: string;
  /** @default 128 */
  hashDigestLength?: number;
  /** @default 'sha512' */
  hashFunction?: string;
  /** @default 32 */
  inlineLimit?: number;
}

/**
 * Generates chain webpack function for modifying webpack filename hash behavior
 */
export function chainWebpackHash(
  projectOptions: VueServiceOptions,
  hashOptions: ChainWebpackHashOptions = {},
): (config: ChainableWebpackConfig) => void {
  return (config: ChainableWebpackConfig) => {
    const isProd = process.env.NODE_ENV === 'production';
    const isLegacyBundle =
      !!process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD;

    if (!isProd) {
      return;
    }

    const {
      hashDigest = 'hex',
      hashDigestLength = 128,
      hashFunction = 'sha512',
      inlineLimit = 32,
    } = hashOptions;

    const getAssetPath = require('@vue/cli-service/lib/util/getAssetPath');

    // js

    const jsFilename = getAssetPath(
      projectOptions,
      `js/[name]${isLegacyBundle ? '-legacy' : ''}.[contenthash].js`,
    );
    config.output
      .filename(jsFilename)
      .chunkFilename(jsFilename)
      .hashDigest(hashDigest)
      .hashDigestLength(hashDigestLength)
      .hashFunction(hashFunction);

    // css

    const cssFilename = getAssetPath(
      projectOptions,
      `css/[name]${projectOptions.filenameHashing ? '.[contenthash]' : ''}.css`,
    );
    config.plugin('extract-css').tap(opts => {
      opts[0] = {
        ...opts[0],
        filename: cssFilename,
        chunkFilename: cssFilename,
        hashDigest,
        hashDigestLength,
        hashFunction,
      };

      return opts;
    });

    // assets

    const genFileLoaderOptions = (dir: string) => ({
      name: getAssetPath(
        projectOptions,
        `${dir}/[name]${
          projectOptions.filenameHashing
            ? `.[${hashFunction}:hash:${hashDigest}:${hashDigestLength}]`
            : ''
        }.[ext]`,
      ),
    });

    [['images', 'img'], ['media', 'media'], ['fonts', 'fonts']].forEach(([rule, dir]) => {
      config.module
        .rule(rule)
        .use('url-loader')
        .loader('url-loader')
        .tap(opt => ({
          ...opt,
          ...{
            limit: inlineLimit,
            fallback: {
              loader: 'file-loader',
              options: genFileLoaderOptions(dir),
            },
          },
        }));
    });

    config.module
      .rule('svg')
      .use('file-loader')
      .loader('file-loader')
      .tap(opt => ({
        ...opt,
        ...genFileLoaderOptions('img'),
      }));
  };
}
