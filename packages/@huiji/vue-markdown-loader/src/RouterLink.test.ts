/**
 * Test
 */

import MarkdownIt from 'markdown-it';
import routerLink, { PluginRouterLinkOptions } from './RouterLink';

let md: MarkdownIt.MarkdownIt;

function init(options?: PluginRouterLinkOptions): MarkdownIt.MarkdownIt {
  md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
    typographer: true,
  });

  md.use(routerLink, options);

  return md;
}

describe('MarkdownIt Plugin RouterLink', () => {
  test('Check module definition', () => {
    expect(routerLink).toBeDefined();
    expect(typeof routerLink).toBe('function');
    init();
  });

  test('Test empty link', () => {
    init();
    expect(md.renderInline('[Empty link]()')).toBe('<a href="">Empty link</a>');
  });

  test('Test anchor link', () => {
    init();
    expect(md.renderInline('[Title 1](#title-1)')).toBe('<a href="#title-1">Title 1</a>');
  });

  test('Test linkify link', () => {
    init();
    expect(md.renderInline('https://github.com')).toBe(
      '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>',
    );
  });

  test('Test external link', () => {
    init();
    expect(md.renderInline('[GitHub.com](https://github.com)')).toBe(
      '<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub.com</a>',
    );
  });

  test('Test external link with attributes', () => {
    init({
      externalAttributes: {
        target: '_blank',
      },
    });
    expect(md.renderInline('[GitHub.com](https://github.com)')).toBe(
      '<a href="https://github.com" target="_blank">GitHub.com</a>',
    );
  });

  test('Test external link with after', () => {
    init({
      externalAfter: '<fa-icon icon="external-link-alt"></fa-icon>',
    });
    expect(md.renderInline('[GitHub.com](https://github.com)')).toBe(
      '<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub.com<fa-icon icon="external-link-alt"></fa-icon></a>',
    );
  });

  test('Test external link non-standard', () => {
    init();
    expect(md.renderInline('[GitHub.com]( https://github.com )')).toBe(
      '<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub.com</a>',
    );
  });

  test('Test router-link', () => {
    init();
    expect(md.renderInline('[Lear More](/api/router-link-plugin)')).toBe(
      '<router-link to="/api/router-link-plugin">Lear More</router-link>',
    );
  });

  test('Test router-link with props', () => {
    init({
      routerLinkProps: {
        tag: 'button',
        ':key': '1',
      },
    });
    expect(md.renderInline('[Lear More](/api/router-link-plugin)')).toBe(
      '<router-link to="/api/router-link-plugin" tag="button" :key="1">Lear More</router-link>',
    );
  });

  test('Test router-link disabled', () => {
    init({
      internalAsRouterLink: false,
    });
    expect(md.renderInline('[Lear More](/api/router-link-plugin)')).toBe(
      '<a href="/api/router-link-plugin">Lear More</a>',
    );
  });
});
