import { MarkdownIt, Core, Token } from 'markdown-it';
import anchor from 'markdown-it-anchor';

export interface AnchorInfo {
  slug: string;
  title: string;
}

/**
 * MarkdownIt Plugin Anchor Options
 */
export interface AnchorOptions {
  level?: number;
  slugify?(str: string): string;
  permalink?: boolean;
  renderPermalink?(slug: string, opts: AnchorOptions, state: Core, idx: number): void;
  permalinkClass?: string;
  permalinkSymbol?: string;
  permalinkBefore?: boolean;
  permalinkHref?(slug: string): string;
  callback?(token: Token, anchorInfo: AnchorInfo): void;
}

// tslint:disable
function renderPermalink(
  slug: string,
  opts: AnchorOptions,
  state: any,
  idx: number,
): void {
  const linkTokens: Token[] = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', (opts.permalinkHref as (src: string) => string)(slug)],
        ['aria-hidden', 'true'],
      ],
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      content: opts.permalinkSymbol,
    }),
    new state.Token('link_close', 'a', -1),
  ];

  if (opts.permalinkBefore) {
    state.tokens[idx + 1].children.unshift(...linkTokens);
  } else {
    state.tokens[idx + 1].children.push(...linkTokens);
  }
}
// tslint:enable

/**
 * MarkdownIt Anchor (wrapper)
 * @param md MarkdownIt instance
 * @param options Plugin options
 */
export default function pluginAnchor(md: MarkdownIt, options: AnchorOptions): void {
  md.use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
    renderPermalink,
    ...options,
  });
}
