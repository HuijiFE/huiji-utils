import { getOptions } from 'loader-utils';

import MarkdownIt from 'markdown-it';
import component, { PluginComponentOptions, VueMarkdownComponentData } from './Component';
import anchor, { AnchorOptions } from './Anchor';
import routerLink, { PluginRouterLinkOptions } from './RouterLink';

export type ResolveMarkdownItPlugin = (md: MarkdownIt.MarkdownIt) => void;

/**
 * Webpack Loader VueMarkdownLoader Options
 */
export interface VueMarkdownLoaderOptions {
  markdownItOptions?: MarkdownIt.Options;
  markdownItPlugins?: ResolveMarkdownItPlugin[];
  useAnchor?: boolean;
  anchorOptions?: AnchorOptions;
  componentOptions?: PluginComponentOptions;
  routerLinkOptions?: PluginRouterLinkOptions;
}

let md: MarkdownIt.MarkdownIt;
const defaultOptions: VueMarkdownLoaderOptions = {};

export function initMarkdownItInstance(
  options?: VueMarkdownLoaderOptions,
): MarkdownIt.MarkdownIt {
  const {
    markdownItOptions = {},
    markdownItPlugins = [],
    useAnchor,
    anchorOptions,
    componentOptions,
    routerLinkOptions,
  } = options || defaultOptions;

  md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
    ...markdownItOptions,
  })
    .use(component, componentOptions)
    .use(routerLink, routerLinkOptions);

  if (useAnchor) {
    md.use(anchor, anchorOptions);
  }

  markdownItPlugins.forEach(fn => fn(md));

  return md;
}

/**
 * Webpack Loader VueMarkdownLoader
 */
export function loadVueMarkdown(
  source: string,
  options?: VueMarkdownLoaderOptions,
): string {
  if (!md) {
    initMarkdownItInstance(options);
  }

  const parts: string[] = [];

  // push a empty string is for appending new line at the end of the file.

  const data: VueMarkdownComponentData = md.generateVueComponentData(source);
  parts.push(`<template>\n${data.template}\n</template>`, '');

  [data.scriptBlocks, data.styleBlocks].forEach(blocks =>
    blocks.forEach(b => parts.push(b, '')),
  );

  return parts.join('\n');
}

// tslint:disable:no-any no-unsafe-any
export default function loaderFn(this: any, source: string): string {
  return loadVueMarkdown(source, getOptions(this));
}
