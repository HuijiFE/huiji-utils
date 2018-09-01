// tslint:disable-next-line:no-import-side-effect
import './markdown-it';

import { PluginComponentOptions } from './Component';
import { PluginRouterLinkOptions } from './RouterLink';

/**
 * Webpack Loader VueMarkdownLoader Options
 */
export interface VueMarkdownLoaderOptions {
  componentOptions?: PluginComponentOptions;
  routerLinkOptions?: PluginRouterLinkOptions;
}

/**
 * Webpack Loader VueMarkdownLoader
 */
export default function loaderVueMarkdownLoader(source: string): string {
  return source;
}
