const presets = [
  [
    '@babel/preset-env',
    {
      modules: process.argv.includes('--cjs') && 'commonjs',
      targets: {
        esmodules: true,
      },
    },
  ],
  ['@babel/preset-typescript'],
];

module.exports = { presets };
