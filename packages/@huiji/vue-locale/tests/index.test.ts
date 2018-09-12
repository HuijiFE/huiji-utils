import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils';
import VueLocale from '../src/index';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VueLocale);
localVue.component('TestChild', {
  render: h => h('div', {}, 'child-component'),
});

const errorPrefix = /\[vue-locale\]/;

describe('Vue Plugin VueLocale', () => {
  let locale: VueLocale;
  let wrapper: Wrapper<Vue>;
  let vm: Vue;

  beforeEach(() => {
    locale = new VueLocale({
      dicts: {
        en: {
          message: 'A message.',
        },
        zhCN: {
          message: '一则消息。',
        },
        zh: {
          message: '一则消息。',
        },
      },
    });

    wrapper = mount(
      {
        locale,
        template: `
<div>
  <test-child ref="child" />
  <span v-if="$locale.language">{{$locale.dict.message}}</span>
</div>`,
      },
      {
        localVue,
        stubs: false,
      },
    );

    vm = wrapper.vm;
  });

  test('Options', () => {
    expect(() => new VueLocale(undefined as any)).toThrow(errorPrefix);
    expect(() => new VueLocale({} as any)).toThrow(errorPrefix);
    VueLocale.install(localVue);
  });

  test('Instancing', () => {
    expect(vm.$locale).toBeDefined();
    expect(vm.$locale).toHaveProperty('language', '');
    expect(vm.$locale).toHaveProperty('dict');
    expect(vm.$locale.dict.message).toBeUndefined();
  });

  test('Setter for dict', () => {
    expect(() => (vm.$locale.dict = { title: 'Vue Locale' })).toThrow(errorPrefix);
  });

  test('Language Selecting', async () => {
    try {
      await vm.$locale.selectLanguage('ja-JP');
    } catch (error) {
      expect(error.message).toMatch(errorPrefix);
    }

    expect(wrapper.contains('span')).toBe(false);
    expect((vm.$refs.child as Vue).$locale).toBeDefined();

    await vm.$locale.selectLanguage('en');
    expect(vm.$locale.language).toBe('en');
    expect(vm.$locale.dict.message).toBe('A message.');
    await localVue.nextTick();
    expect(wrapper.html()).toContain('A message.');

    await vm.$locale.selectLanguage('zhCN');
    expect(vm.$locale.language).toBe('zhCN');
    expect(vm.$locale.dict.message).toBe('一则消息。');
    await localVue.nextTick();
    expect(wrapper.html()).toContain('一则消息。');

    await vm.$locale.selectLanguage('en-US');
    expect(vm.$locale.language).toBe('en');
    expect(vm.$locale.dict.message).toBe('A message.');

    await vm.$locale.selectLanguage('zh-CN');
    expect(vm.$locale.language).toBe('zhCN');
    expect(vm.$locale.dict.message).toBe('一则消息。');

    vm.$locale.language = 'en-US';
    expect(vm.$locale.language).toBe('en');
    expect(vm.$locale.dict.message).toBe('A message.');

    vm.$locale.language = 'zh-CN';
    expect(vm.$locale.language).toBe('zhCN');
    expect(vm.$locale.dict.message).toBe('一则消息。');

    vm.$locale.language = 'zh-TW';
    expect(vm.$locale.language).toBe('zh');
  });
});

describe('Vue Plugin VueLocale Async', () => {
  let locale: VueLocale;
  let vm: Vue;

  test('Language Selecting', async () => {
    locale = new VueLocale({
      dicts: {
        en: async () => import('./en'),
        'zh-CN': async () => import('./zh-CN'),
      },
    });

    vm = shallowMount(
      {
        template: '<div></div>',
      },
      {
        locale,
        localVue,
      },
    ).vm;

    await locale.selectLanguage('en');
    expect(vm.$locale.language).toBe('en');
    expect(vm.$locale.dict.message).toBe('A message.');

    await locale.selectLanguage('zh-CN');
    expect(vm.$locale.language).toBe('zh-CN');
    expect(vm.$locale.dict.message).toBe('一则消息。');

    const all: Promise<void>[] = [];
    expect(vm.$locale.loading).toBe(false);
    all.push(locale.selectLanguage('en'));
    expect(vm.$locale.loading).toBe(true);
    all.push(locale.selectLanguage('zh-CN'));
    await Promise.all(all);
    expect(vm.$locale.loading).toBe(false);
    expect(vm.$locale.language).toBe('en');
  });
});
