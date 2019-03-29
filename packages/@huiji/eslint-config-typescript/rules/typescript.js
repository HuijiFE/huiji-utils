module.exports = {
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',

    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
      },
    ],
  },
};
