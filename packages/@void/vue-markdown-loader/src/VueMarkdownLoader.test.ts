import * as MarkdownIt from 'markdown-it';
import * as anchor from 'markdown-it-anchor';
import loaderFn, { initMarkdownItInstance, loadVueMarkdown } from './VueMarkdownLoader';

const scriptBlocks: string[] = [
  `<script>
export default {
  data() {
    return {
      test: '123',
    };
  },
};
</script>`,
  `<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';

export default class MyComponent extends Vue {
  @Prop({ type: String })
  public readonly name!: string;
}

</script>`,
];

const styleBlocks: string[] = [
  `<style>
.content {
  color: #222;
  background-color: #eee;
}
</style>`,
  `<style lang="scss">
$fg-color: #222;
$bg-color: #eee;

.content {
  color: $fg-color;
  background-color: $bg-color;
}
</style>`,
];

function source(md: string): string {
  return `${md}

${scriptBlocks.join('\n\n')}

${styleBlocks.join('\n\n')}
`;
}

function result(template: string): string {
  return [scriptBlocks, styleBlocks]
    .reduce<string[]>(
      (parts, blocks) => {
        blocks.forEach(b => parts.push(b, ''));

        return parts;
      },
      [`<template>\n${template}\n</template>`, ''],
    )
    .join('\n');
}

describe('Webpack Loader VueMarkdownLoader', () => {
  test('Test module definition', () => {
    [loaderFn, initMarkdownItInstance, loadVueMarkdown].map(member => {
      expect(member).toBeDefined();
      expect(typeof member).toBe('function');
    });
  });

  test('Test MarkdownIt initializing', () => {
    expect(loaderFn('# Title')).toBe(`<template>
<article>
<h1>Title</h1>
</article>
</template>
`);
    expect((initMarkdownItInstance() as any) instanceof MarkdownIt).toBe(true);
    expect(initMarkdownItInstance() === initMarkdownItInstance()).toBe(false);
  });

  test('Test efault options', () => {
    initMarkdownItInstance();
    expect(loadVueMarkdown(source('# Title\n\nhttps://github.com'))).toBe(
      result(`<article>
<h1>Title</h1>
<p><a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a></p>
</article>`),
    );
  });

  test('Test template only', () => {
    initMarkdownItInstance();
    expect(loadVueMarkdown('# Title\n\nSome test text.')).toBe(`<template>
<article>
<h1>Title</h1>
<p>Some test text.</p>
</article>
</template>
`);
  });

  test('Test MarkdownIt options', () => {
    initMarkdownItInstance({
      markdownItOptions: {
        linkify: false,
      },
    });
    expect(loadVueMarkdown('# Title\n\nhttps://github.com')).toBe(`<template>
<article>
<h1>Title</h1>
<p>https://github.com</p>
</article>
</template>
`);
  });

  test('Test additional plugins', () => {
    initMarkdownItInstance({
      markdownItPlugins: [
        md =>
          md.use(anchor, {
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#',
          }),
      ],
    });
    expect(loadVueMarkdown('# Title\n\nSome test text.')).toBe(`<template>
<article>
<h1 id="title"><a class="header-anchor" href="#title" aria-hidden="true">#</a> Title</h1>
<p>Some test text.</p>
</article>
</template>
`);
  });

  test('Test anchor', () => {
    initMarkdownItInstance({
      useAnchor: true,
    });
    expect(loadVueMarkdown('# Title\n\nSome test text.')).toBe(`<template>
<article>
<h1 id="title"><a class="header-anchor" href="#title" aria-hidden="true">#</a>Title</h1>
<p>Some test text.</p>
</article>
</template>
`);
  });

  test('Test anchor options permalink after', () => {
    initMarkdownItInstance({
      useAnchor: true,
      anchorOptions: {
        permalinkBefore: false,
      },
    });
    expect(loadVueMarkdown('# Title\n\nSome test text.')).toBe(`<template>
<article>
<h1 id="title">Title<a class="header-anchor" href="#title" aria-hidden="true">#</a></h1>
<p>Some test text.</p>
</article>
</template>
`);
  });
});
