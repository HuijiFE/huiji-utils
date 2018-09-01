import { MarkdownIt, Token } from 'markdown-it';

/**
 * Options for MarkdownIt plugin router-link
 */
export interface PluginRouterLinkOptions {
  /**
   * Convert internal links to router links or not.
   * @default true
   */
  internalAsRouterLink?: boolean;
  routerLinkProps?: Record<string, string>;
  /**
   * Attributes for pushing to external links.
   * @default { target: '_blank', rel: 'noopener noreferrer', }
   */
  externalAttributes?: Record<string, string>;
  /**
   * The text or component for appending at the end of external links.
   */
  externalAfter?: string;
}

/**
 * MarkdownIt Plugin RouterLink
 * @param md MarkdownIt instance
 * @param param1 Plugin options
 */
export default function pluginRouterLink(
  md: MarkdownIt,
  {
    internalAsRouterLink = true,
    routerLinkProps = {},
    externalAttributes = {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    externalAfter = '',
  }: PluginRouterLinkOptions = {},
): void {
  let isRouterLink: boolean = false;
  let isExternalLink: boolean = false;

  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const token: Token = tokens[index];
    const hrefIndex: number = token.attrIndex('href');

    if (hrefIndex > -1) {
      const link: string[] = token.attrs[hrefIndex];
      const href: string = link[1];

      if (href.startsWith('http')) {
        isExternalLink = true;
        Object.entries(externalAttributes).forEach(([name, value]) =>
          token.attrSet(name, value),
        );
      } else if (internalAsRouterLink) {
        isRouterLink = true;
        token.tag = 'router-link';
        link[0] = 'to';
        Object.entries(routerLinkProps).forEach(([name, value]) =>
          token.attrSet(name, value),
        );
      }
    }

    return self.renderToken(tokens, index, options);
  };

  md.renderer.rules.link_close = (tokens, index, options, env, self) => {
    const token: Token = tokens[index];

    if (isExternalLink) {
      isExternalLink = false;

      return `${externalAfter || ''}${self.renderToken(tokens, index, options)}`;
    }

    if (isRouterLink) {
      isRouterLink = false;
      token.tag = 'router-link';
    }

    return self.renderToken(tokens, index, options);
  };
}
