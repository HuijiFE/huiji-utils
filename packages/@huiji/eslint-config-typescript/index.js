module.exports = {
  env: {
    es6: true,
    node: true,
  },

  plugins: ['@typescript-eslint'],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/@typescript-eslint',
  ].concat(
    [
      './rules/best-practices',
      './rules/errors',
      './rules/node',
      './rules/style',
      './rules/variables',
      './rules/es6',
      './rules/imports',
      './rules/typescript',
    ].map(require.resolve),
  ),

  rules: {},
};
