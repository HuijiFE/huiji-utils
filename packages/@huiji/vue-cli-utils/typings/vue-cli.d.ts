declare module '@vue/cli-service/lib/options' {
  interface VueServiceOptions {
    baseUrl?: string;
    publicPath?: string;
    outputDir?: string;
    assetsDir?: string;
    indexPath?: string;
    filenameHashing?: boolean;
    runtimeCompiler?: boolean;
    transpileDependencies?: any[];
    productionSourceMap?: boolean;
    parallel?: boolean;
    devServer?: any;
    pages?: any;
    crossorigin?: '' | 'anonymous' | 'use-credentials';
    integrity?: boolean;

    // css
    css?: {
      modules?: boolean;
      extract?: any;
    };

    // webpack
    chainWebpack?: Function;
    configureWebpack?: Function;

    // known runtime options for built-in plugins
    lintOnSave?: boolean | 'error';
    pwa?: any;

    // 3rd party plugin options
    pluginOptions?: any;
  }
}

declare module '@vue/cli-service/lib/PluginApi' {
  import Service from '@vue/cli-service/lib/Service';
  import ChainableWebpackConfig from 'webpack-chain';

  class PluginApi {
    /**
     * @param {string} id - Id of the plugin.
     * @param {Service} service - A vue-cli-service instance.
     */
    constructor(id: string, service: Service);

    /**
     * Current working directory.
     */
    getCwd(): string;

    /**
     * Resolve path for a project.
     *
     * @param {string} _path - Relative path from project root
     * @return {string} The resolved absolute path.
     */
    resolve(_path: string): string;

    /**
     * Check if the project has a given plugin.
     *
     * @param {string} id - Plugin id, can omit the (@vue/|vue-|@scope/vue)-cli-plugin- prefix
     * @return {boolean}
     */
    hasPlugin(id: string): boolean;

    /**
     * Register a command that will become available as `vue-cli-service [name]`.
     *
     * @param {string} name
     * @param {object} [opts]
     *   {
     *     description: string,
     *     usage: string,
     *     options: { [string]: string }
     *   }
     * @param {function} fn
     *   (args: { [string]: string }, rawArgs: string[]) => ?Promise
     */
    registerCommand(
      name: string,
      opts: any,
      fn: (args: Record<string, string>, rawArgs: string[]) => Promise<any>,
    ): void;

    /**
     * Register a function that will receive a chainable webpack config
     * the function is lazy and won't be called until `resolveWebpackConfig` is
     * called
     *
     * @param {function} fn
     */
    chainWebpack(fn: (config: ChainableWebpackConfig) => void): void;

    /**
     * Register
     * - a webpack configuration object that will be merged into the config
     * OR
     * - a function that will receive the raw webpack config.
     *   the function can either mutate the config directly or return an object
     *   that will be merged into the config.
     *
     * @param {object | function} fn
     */
    configureWebpack(fn: any | Function): void;

    /**
     * Register a dev serve config function. It will receive the express `app`
     * instance of the dev server.
     *
     * @param {function} fn
     */
    configureDevServer(fn: Function): void;

    /**
     * Resolve the final raw webpack config, that will be passed to webpack.
     *
     * @param {ChainableWebpackConfig} [chainableConfig]
     * @return {object} Raw webpack config.
     */
    resolveWebpackConfig(chainableConfig: ChainableWebpackConfig): any;

    /**
     * Resolve an intermediate chainable webpack config instance, which can be
     * further tweaked before generating the final raw webpack config.
     * You can call this multiple times to generate different branches of the
     * base webpack config.
     * See https://github.com/mozilla-neutrino/webpack-chain
     *
     * @return {ChainableWebpackConfig}
     */
    resolveChainableWebpackConfig(): ChainableWebpackConfig;

    /**
     * Generate a cache identifier from a number of variables
     */
    genCacheConfig(id: string, partialIdentifier: any, configFiles: string[]): any;
  }

  export = PluginApi;
}

declare module '@vue/cli-service/lib/Service' {
  class Service {}

  export = Service;
}
