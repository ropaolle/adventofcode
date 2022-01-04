// https://jestjs.io/docs/configuration
module.exports = {
  testTimeout: 5000,
  reporters: [
    'default',
    // https://github.com/jest-community/jest-junit
    ['jest-junit', { outputDirectory: 'test-reports', outputName: 'test.xml' }],
    ['jest-slow-test-reporter', { numTests: 1, warnOnSlowerThan: 300, color: true }],
  ],
  coverageDirectory: 'test-reports',
  collectCoverage: true,
  // https://github.com/jest-community/awesome-jest#reporters
  coverageReporters: [
    // 'text',
    'text-summary',
    'clover',
    //   'json-summary'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
