module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/(src|tests|__tests__)/**/*.(test|spec).[jt]s?(x)'],
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
};
