module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 96,
      branches: 86,
      functions: 100,
      lines: 96,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.(spec|test).ts'],
  testURL: 'http://localhost',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'packages'],
};
