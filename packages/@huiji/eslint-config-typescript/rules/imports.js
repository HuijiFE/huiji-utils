// note that airbnb base config includes plugin import
module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    'import/ignore': ['.(scss|less|css)$'],
  },

  rules: {
    // disable this rule, because file extensions in imports will be checked by typescript
    'import/extensions': 'off',
    // 'import/extensions': [
    //   'error',
    //   'always',
    //   {
    //     js: 'never',
    //     mjs: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],

    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
  },

  // overrides: [
  //   {
  //     files: ['*.test.ts', '*.spec.ts'],
  //     rules: {
  //       // issue in mono repo
  //       'import/extensions': 'off',
  //     },
  //   },
  // ],
};
