module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/integration/**/*.spec.ts'],
  globalSetup: '<rootDir>/test/integrationSetup.ts',
}
