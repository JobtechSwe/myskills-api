module.exports = {
  ...require('./jest.config'),
  testPathIgnorePatterns: [],
  testMatch: [
    '<rootDir>/test/integration/**/*.spec.ts',
    '<rootDir>/test/features/steps/*.steps.ts',
  ],
  setupFiles: ['<rootDir>/test/integration/setup.ts'],
}
