/**
 * Augment the typings of MarkdownIt.
 */
declare module 'markdown-it' {
  interface MarkdownIt {
    generateVueComponentData: GenerateVueComponentDataFn;
  }
}

// tslint:disable:no-any
import { MarkdownIt, Token } from 'markdown-it';

/**
 * MarkdownIt Plugin Component Options
 */
export interface PluginComponentOptions {
  /**
   * The root tag name in vue component template.
   * @default 'article'
   */
  rootTag?: string;
  /**
   * The props for applying to template root tag.
   */
  rootTagProps?: Record<string, string>;
}

export interface VueMarkdownComponentData {
  template: string;
  scriptBlocks: string[];
  styleBlocks: string[];
}

export type GenerateVueComponentDataFn = (
  src: string,
  env?: any,
) => VueMarkdownComponentData;

const regScript: [RegExp, RegExp] = [/^<script(?=(\s|>|$))/i, /<\/script>/i];
const regStyle: [RegExp, RegExp] = [/^<style(?=(\s|>|$))/i, /<\/style>/i];

function extractScriptBlocks(tokens: Token[]): string[] {
  const blocks: string[] = [];
  const blockTokens: Token[] = [];

  tokens.filter(t => t.type === 'html_block').forEach(t => {
    const content: string = t.content.trim();
    if (regScript[0].test(content) && regScript[1].test(content)) {
      blocks.push(content);
      blockTokens.push(t);
    }
  });

  blockTokens.forEach(t => tokens.splice(tokens.indexOf(t), 1));

  return blocks;
}

function extractStyleBlocks(tokens: Token[]): string[] {
  const blocks: string[] = [];
  const blockTokens: Token[] = [];

  tokens.filter(t => t.type === 'html_block').forEach(t => {
    const content: string = t.content.trim();
    if (regStyle[0].test(content) && regStyle[1].test(content)) {
      blocks.push(content);
      blockTokens.push(t);
    }
  });

  blockTokens.forEach(t => tokens.splice(tokens.indexOf(t), 1));

  return blocks;
}

/**
 * MarkdownIt Plugin Component
 * @param md MarkdownIt instance
 * @param param1 Plugin options
 */
export default function pluginComponent(
  md: MarkdownIt,
  { rootTag = 'article', rootTagProps = {} }: PluginComponentOptions = {},
): void {
  // tslint:disable:no-invalid-this
  md.generateVueComponentData = function generateVueComponentData(
    src: string,
    env?: any,
  ): VueMarkdownComponentData {
    const tokens: Token[] = this.parse(src, env);

    const scriptBlocks: string[] = extractScriptBlocks(tokens);
    const styleBlocks: string[] = extractStyleBlocks(tokens);

    const html: string = this.renderer.render(tokens, (this as any).options, env);
    const props: string = Object.entries(rootTagProps)
      .map(([name, value]) => ` ${name}="${value}"`)
      .join('');
    const template: string = `<${rootTag}${props}>\n${html}</${rootTag}>`;

    return {
      template,
      scriptBlocks,
      styleBlocks,
    };
  };
  // tslint:enable:no-any;
}
