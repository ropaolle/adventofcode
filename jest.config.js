// https://jestjs.io/docs/configuration
module.exports = {
  testTimeout: 5000,
  testPathIgnorePatterns: ['/node_modules/', '/__test__/helpers', '__test__/reports/'],
  reporters: [
    'default',
    // https://github.com/jest-community/jest-junit
    ['jest-junit', { outputDirectory: '__test__/reports' /* , outputName: 'test.xml' */ }],
    ['jest-slow-test-reporter', { numTests: 1, warnOnSlowerThan: 30, color: true }],
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/__test__/helpers', '__test__/reports/'],
  coverageDirectory: '__test__/reports',
  // https://github.com/jest-community/awesome-jest#reporters
  coverageReporters: ['clover', 'text', 'text-summary' /*,  'json-summary' */],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
