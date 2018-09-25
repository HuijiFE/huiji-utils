/**
 * Test
 */

import MarkdownIt from 'markdown-it';
import component, { PluginComponentOptions, VueMarkdownComponentData } from './Component';

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

const src: string = `
# Title

${scriptBlocks.join('\n\n')}

<div>

test block

</div>

${styleBlocks.join('\n\n')}

`;

let md: MarkdownIt.MarkdownIt;

function init(options?: PluginComponentOptions): void {
  md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
    typographer: true,
  });

  md.use(component, options);
}

describe('MarkdownIt Plugin Component', () => {
  test('Check module definition', () => {
    expect(component).toBeDefined();
    expect(typeof component).toBe('function');
    init();
    expect(md).toHaveProperty('generateVueComponentData');
    expect(typeof md.generateVueComponentData).toBe('function');
  });

  test('Test template', () => {
    init();
    expect(md.generateVueComponentData(src, {}).template).toBe(
      `<article>
<h1>Title</h1>
<div>
<p>test block</p>
</div>
</article>`,
    );
  });

  test('Test template root tag', () => {
    init({
      rootTag: 'vd-article',
    });
    expect(md.generateVueComponentData(src).template).toBe(
      `<vd-article>
<h1>Title</h1>
<div>
<p>test block</p>
</div>
</vd-article>`,
    );
  });

  test('Test template root tag props', () => {
    init({
      rootTagProps: {
        class: 'content',
        '@click': 'onClick',
      },
    });
    expect(md.generateVueComponentData(src).template).toBe(
      `<article class="content" @click="onClick">
<h1>Title</h1>
<div>
<p>test block</p>
</div>
</article>`,
    );
  });

  test('Test script blocks', () => {
    init();
    expect(md.generateVueComponentData(src).scriptBlocks).toStrictEqual(scriptBlocks);
  });

  test('Test style blocks', () => {
    init();
    expect(md.generateVueComponentData(src).styleBlocks).toStrictEqual(styleBlocks);
  });

  test('Test empty html', () => {
    init();
    expect(
      md.generateVueComponentData(`
<script>
export default {
  data() {
    return {
      test: 'abc',
    };
  };
};

</script>

<style lang="scss">
$content-color: #333;

.content {
  color: $content-color;
}
</style>

`).template,
    ).toBe(`<article>
</article>`);
  });
});
