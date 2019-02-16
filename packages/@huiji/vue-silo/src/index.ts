// tslint:disable:no-invalid-this no-any no-unsafe-any no-reserved-keywords no-empty-interface function-name
import Vue, { PluginFunction, ComponentOptions, AsyncComponent } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import VueRouter from 'vue-router';

declare global {
  type ReadonlyR<T> = T extends any[]
    ? ReadonlyArrayR<T[number]>
    : T extends object
    ? ReadonlyObjectR<T>
    : T;

  interface ReadonlyArrayR<T> extends ReadonlyArray<ReadonlyR<T>> {}

  type ReadonlyObjectR<T extends object> = {
    [P in keyof T]: T[P] extends any[]
      ? ReadonlyArrayR<T[P][number]>
      : T[P] extends object
      ? ReadonlyObjectR<T[P]>
      : T[P]
  };

  /**
   * The `Silo` is a global state manager like vuex.
   */
  interface Silo {
    nothing: SiloComponent<string>;
  }

  interface Window {
    __INITIAL_SILO__?: InitialSilo;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    silo?: VueSilo;
    initSilo?: SiloModules;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $silo: VueSilo;
  }

  interface VueConstructor<V extends Vue = Vue> {
    options: ComponentOptions<V>;
  }
}

export interface SiloOptions {
  modules: SiloModules;
}

export type SiloModules = { [P in keyof Silo]?: new () => Silo[P] };

export type InitialSilo = { [P in keyof Silo]: Silo[P]['state'] };

export interface SiloComponent<S extends any> {
  initState(): S;
}

/**
 * For manage reactive data
 */
@Component
export class SiloComponent<S extends any> extends Vue {
  // tslint:disable-next-line:variable-name
  private __state: null = null;
  protected get $state(): S {
    return this.$data.__state;
  }
  protected set $state(s: S) {
    this.$data.__state = s;
  }
  private created(): void {
    this.initState();
  }

  public get state(): ReadonlyR<S> {
    return this.$state as ReadonlyR<S>;
  }

  private inited?: boolean;
  public replaceState(state: S, once: boolean = true): void {
    if (once && this.inited) {
      return;
    }
    this.$state = state;
    this.inited = true;
  }
}

let $$Vue: typeof Vue | undefined;

/**
 * Silo Plugin
 */
const install: PluginFunction<undefined> = $Vue => {
  if ($$Vue && $$Vue === $Vue) {
    return;
  }
  $$Vue = $Vue;

  $Vue.mixin({
    beforeCreate(this: Vue): void {
      if (this.$options.silo) {
        (this as any).$silo = this.$options.silo;
      } else if (this.$options.parent && this.$options.parent.$silo) {
        (this as any).$silo = this.$options.parent.$silo;
      }
    },
  });
};

export default interface VueSilo extends Silo {}

/**
 * vue silo, like vuex
 */
export default class VueSilo {
  public static readonly install: PluginFunction<undefined> = install;

  constructor(options: SiloOptions) {
    this.$mountModules(options.modules);
  }

  public $mountModules(modules: SiloModules): void {
    Object.entries(modules).forEach(([key, ctor]) => {
      if (ctor && !this[key as keyof Silo]) {
        this[key as keyof Silo] = new ctor();
      }
    });
  }

  public $init(
    components: (ComponentOptions<Vue> | typeof Vue | AsyncComponent)[],
  ): void {
    components.forEach(comp => {
      const modules =
        ('options' in comp && comp.options && comp.options.initSilo) ||
        ('initSilo' in comp && comp.initSilo);
      if (modules) {
        this.$mountModules(modules);
      }
    });

    if (window && window.__INITIAL_SILO__) {
      (Object.entries(window.__INITIAL_SILO__) as [keyof Silo, any][]).forEach(
        ([name, state]) => {
          if (state && this[name]) {
            (this[name] as SiloComponent<any>).replaceState(state);
          }
        },
      );
    }
  }

  public $syncRouter(router: VueRouter): void {
    router.beforeEach((to, from, next) => {
      const matches = router.getMatchedComponents();
      this.$init(matches);
      next();
    });
  }
}
