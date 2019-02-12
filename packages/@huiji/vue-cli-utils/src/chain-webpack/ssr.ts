// tslint:disable:no-require-imports
import ChainableWebpackConfig from 'webpack-chain';
import { VueServiceOptions } from '@vue/cli-service/lib/options';

export interface ChainWebpackSSROptions {
  /** @default 'app' */
  entryName?: string;
  /** @default './src/entry-client.ts' */
  entryClient?: string;
  /** @default './src/entry-server.ts  */
  entryServer?: string;
  webpackExternalsWhitelist?: (string | RegExp)[];
}

export function isSSRBundle(): boolean {
  return process.argv.slice(2).includes('--ssr');
}

/**
 * Generates chain webpack function for server side rendering related
 */
export function chainWebpackSSR(
  projectOptions: VueServiceOptions,
  ssrOptions: ChainWebpackSSROptions = {},
): (config: ChainableWebpackConfig) => void {
  return config => {
    const isSSR = isSSRBundle();
    const {
      entryName = 'app',
      entryClient = './src/entry-client.ts',
      entryServer = './src/entry-server.ts',
      webpackExternalsWhitelist = [],
    } = ssrOptions;

    if (!projectOptions.pages) {
      if (ssrOptions.entryName !== 'app') {
        config.entryPoints.delete('app');
      }
      config
        .entry(entryName)
        .clear()
        .add(isSSR ? entryServer : entryClient);
    }

    config.resolve.alias.set(
      'create-api',
      isSSR ? './create-api-server.js' : './create-api-client.js',
    );

    config
      .plugin('vue-ssr')
      .use(
        isSSR
          ? require('vue-server-renderer/server-plugin')
          : require('vue-server-renderer/client-plugin'),
      );

    if (isSSR) {
      config.target('node').devtool('source-map');
      config.output.libraryTarget('commonjs2');
      config.externals(
        require('webpack-node-externals')({
          whitelist: [
            /\.vue$/,
            /\.jsx$/,
            /\.tsx?$/,
            /\.css$/,
            /\.p(ost)?css$/,
            /\.scss$/,
            /\.sass$/,
            /\.less$/,
            /\.styl(us)?$/,
            ...webpackExternalsWhitelist,
          ],
        }),
      );
      config.optimization
        .delete('minimizer')
        .delete('splitChunks')
        .end();
      config.plugins.delete('pwa').delete('workbox');
    }
  };
}
