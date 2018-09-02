# vue-markdown-loader

> A webpack loader for loading markdown files as Vue Single-File Components,
> based on [MarkdownIt](https://github.com/markdown-it/markdown-it)

## Features

- supports all `<script>` and `<style>` types of Vue Single-File Components
- auto convert internal links to Vue `<router-link>`
- customize MarkdownIt options and additional plugins
- insert anchor to headings (base on markdown-it-anchor)
- custom container (base on markdown-it-container) **TODO**
- front matter **TODO**
- highlighting **TODO**

## Usage

```bash
npm i -D @void/vue-markdown-loader

# or use yarn
yarn add -D @void/vue-markdown-loader
```

### webpack

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json', '.md'],
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
          },
          {
            loader: '@void/vue-markdown-loader',
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
```

### vue-cli 3.0

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.resolve.extensions.merge(['.md']);

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('@void/vue-markdown-loader')
      .loader('@void/vue-markdown-loader')
      .end();
  },
};
```
