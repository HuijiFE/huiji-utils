// tslint:disable:no-any no-unsafe-any no-reserved-keywords

/**
 * Internationalization plugin for vue
 */

import Vue, { PluginFunction, ComponentOptions } from 'vue';

export interface Dict extends Record<string, string> {}

export type AsyncDict = () => Promise<Dict | { default: Dict }>;

let $$Vue: typeof Vue | undefined;

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    locale?: VueLocale;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $locale: VueLocale;
  }
}

export interface VueLocaleOptions {
  /**
   * Cache the async dict or not, default: true
   */
  cache?: boolean;
  /**
   * The map of dicts.
   */
  dicts: Record<string, Dict | AsyncDict>;
}

/**
 * Localization plugin for Vue.js 2+
 */
export default class VueLocale {
  public static install: PluginFunction<undefined> = $Vue => {
    if ($$Vue && $$Vue === $Vue) {
      return;
    }

    $$Vue = $Vue;

    $Vue.mixin({
      beforeCreate(): void {
        if (this.$options.locale) {
          (this as any).$locale = this.$options.locale;
        } else if (this.$options.parent && this.$options.parent.$locale) {
          (this as any).$locale = this.$options.parent.$locale;
        }
      },
    });
  };

  public cache!: boolean;

  // tslint:disable:variable-name
  private readonly _dicts!: Record<string, Dict | AsyncDict>;
  private readonly _vm!: Vue;
  // tslint:enable:variable-name

  public get loading(): boolean {
    return (this._vm as any)._data.$$loading;
  }

  public get language(): string {
    return (this._vm as any)._data.$$language;
  }
  public set language(value: string) {
    // tslint:disable-next-line:no-floating-promises
    this.selectLanguage(value);
  }

  public get dict(): Record<string, string> {
    return (this._vm as any)._data.$$dict;
  }
  public set dict(value: Record<string, string>) {
    throw error(
      'use VueLocale.selectLanguage() or reassign VueLocale.language to explicit replace VueLocale.dict.',
    );
  }

  /**
   *
   */
  constructor(options: VueLocaleOptions) {
    // validate
    if (!options || !options.dicts || typeof options.dicts !== 'object') {
      throw error('invalid options for create VueLocale instance.');
    }

    this.cache = options.cache === undefined ? true : options.cache;
    this._dicts = options.dicts;
    this._vm = new ($$Vue as typeof Vue)({
      data(): any {
        return {
          $$loading: false,
          $$language: '',
          $$dict: {},
        };
      },
    });
  }

  /**
   * select
   */
  public async selectLanguage(language: string): Promise<void> {
    if (this.loading) {
      return;
    }

    (this._vm as any)._data.$$loading = true;

    let probable: string | undefined = language;
    let dict: Dict | AsyncDict | undefined = this._dicts[probable];

    if (!dict) {
      const probables: string[] = [language.replace(/-/g, ''), language.split('-')[0]];
      const languages: string[] = Object.keys(this._dicts);
      probable = probables.find(p => languages.includes(p));
      if (probable) {
        dict = this._dicts[probable];
      }
    }

    if (!dict) {
      const dicts: string = Object.keys(this._dicts).join(', ');
      (this._vm as any)._data.$$loading = false;

      throw error(`dict for language ${language} not found, installed dicts: ${dicts}.`);
    } else {
      if (typeof dict === 'function') {
        let raw: Dict | { default: Dict } = await dict();
        if ('default' in raw && typeof raw.default === 'object') {
          raw = raw.default;
        }
        if (this.cache && probable) {
          this._dicts[probable] = raw as Dict;
        }
        (this._vm as any)._data.$$dict = { ...raw };
      } else {
        (this._vm as any)._data.$$dict = { ...dict };
      }

      (this._vm as any)._data.$$language = probable;
      (this._vm as any)._data.$$loading = false;
    }
  }
}

function error(message: string): Error {
  return new Error(`[vue-locale] ${message}`);
}
