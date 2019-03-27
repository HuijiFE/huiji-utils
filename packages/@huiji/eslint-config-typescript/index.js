module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-prettier',
    'eslint-config-prettier/@typescript-eslint',
    './rules/best-practices',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/variables',
    './rules/es6',
    './rules/imports',
  ].map(require.resolve),

  rules: {
    // https://typescript-eslint.io/parser
    'no-undef': 'off',
    'no-unused-vars': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/46
    // '@typescript-eslint/no-unused-vars': 'error',
  },
};
