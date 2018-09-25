/**
 * Test
 */

import MarkdownIt from 'markdown-it';
import anchor, { AnchorOptions } from './Anchor';

let md: MarkdownIt.MarkdownIt;

function init(options?: AnchorOptions): MarkdownIt.MarkdownIt {
  md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
    typographer: true,
  });

  md.use(anchor, options);

  return md;
}

describe('MarkdownIt Plugin Anchor', () => {
  test('Check module definition', () => {
    expect(anchor).toBeDefined();
    expect(typeof anchor).toBe('function');
    init();
  });

  test('Test anchor', () => {
    init();
    expect(md.render('# Title\n\nSome test text.'))
      .toBe(`<h1 id="title"><a class="header-anchor" href="#title" aria-hidden="true">#</a>Title</h1>
<p>Some test text.</p>
`);
  });

  test('Test anchor options', () => {
    init({
      permalinkBefore: false,
    });
    expect(md.render('# Title\n\nSome test text.'))
      .toBe(`<h1 id="title">Title<a class="header-anchor" href="#title" aria-hidden="true">#</a></h1>
<p>Some test text.</p>
`);
  });
});
