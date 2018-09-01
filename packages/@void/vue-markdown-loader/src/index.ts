import { PluginRouterLinkOptions } from './RouterLinkPlugin';

/**
 * Webpack loader vue-markdown-loader options
 */
export interface VueMarkdownLoaderOptions {
  routerLinkOptions: PluginRouterLinkOptions;
}

/**
 * Webpack loader vue-markdown-loader
 */
export default function loaderVueMarkdownLoader(source: string): string {
  return source;
}
