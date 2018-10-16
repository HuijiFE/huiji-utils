const config = require('../../../jest.config');

config.coverageThreshold.global.statements = 96;
config.coverageThreshold.global.branches = 86;
config.coverageThreshold.global.lines = 96;

module.exports = config;
