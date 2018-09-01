module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.ts|**/*.(spec|test).(js|ts)'],
  testURL: 'http://localhost/',
  moduleDirectories: ['node_modules', '../../'],
};
