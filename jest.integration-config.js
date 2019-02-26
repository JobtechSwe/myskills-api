module.exports = {
  ...require('./jest.config'),
  testPathIgnorePatterns: [],
  testMatch: ['<rootDir>/test/integration/**/*.spec.(ts|js)'],
}
