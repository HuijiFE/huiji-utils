const path = require('path');

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
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.(spec|test).ts'],
  testURL: 'http://localhost',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'packages'],
};
