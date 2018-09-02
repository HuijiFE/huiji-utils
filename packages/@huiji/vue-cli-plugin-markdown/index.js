module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const pluginOptions =
      (options && options.pluginOptions && options.pluginOptions.markdownLoaderOptions) ||
      {};

    webpackConfig.resolve.extensions.merge(['.md']);

    const vueLoaderCacheConfig = api.genCacheConfig('@huiji/vue-markdown-loader', {
      'vue-loader': require('vue-loader/package.json').version,
      '@vue/component-compiler-utils': require('@vue/component-compiler-utils/package.json')
        .version,
      'vue-template-compiler': require('vue-template-compiler/package.json').version,
      '@huiji/vue-markdown-loader': require('@huiji/vue-markdown-loader/package.json')
        .version,
    });

    webpackConfig.module
      .rule('vue')
      .test(/\.vue$/)
      // cache loader
      .use('cache-loader')
      .loader('cache-loader')
      .options(vueLoaderCacheConfig)
      .end()
      // vue loader
      .use('vue-loader')
      .loader('vue-loader')
      .options(
        Object.assign(
          {
            compilerOptions: {
              preserveWhitespace: false,
            },
          },
          vueLoaderCacheConfig,
        ),
      )
      .end()
      // markdown loader
      .use('@huiji/vue-markdown-loader')
      .loader('@huiji/vue-markdown-loader')
      .options(pluginOptions)
      .end();
  });
};
