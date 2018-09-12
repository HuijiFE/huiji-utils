// tslint:disable:no-any

/**
 * Internationalization plugin for vue
 */

import Vue, { PluginFunction, ComponentOptions } from 'vue';

export type Dict = Record<string, string>;

// tslint:disable-next-line:no-reserved-keywords
export type AsyncDict = () => Promise<{ default: Dict }>;

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
  dicts: Record<string, Dict | AsyncDict>;
}

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
      const clone: Dict = {
        ...(typeof dict === 'function' ? (await dict()).default : dict),
      };

      (this._vm as any)._data.$$language = probable;
      (this._vm as any)._data.$$dict = clone;
      (this._vm as any)._data.$$loading = false;
    }
  }
}

function error(message: string): Error {
  return new Error(`[vue-locale] ${message}`);
}
