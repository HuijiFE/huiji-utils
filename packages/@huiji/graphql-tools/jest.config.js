module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 93,
      functions: 100,
      lines: 100,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/(src|tests|__tests__)/**/*.(test|spec).[jt]s?(x)'],
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
};
