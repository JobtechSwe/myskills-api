module.exports = {
    projects: [{
        displayName: 'api',
        ...require('./jest.config'),
        testPathIgnorePatterns: ['<rootDir>/test/*', '<rootDir>/dist/*'],
    }, {
        displayName: 'lint',
        ...require('./jest.config'),
        runner: 'jest-runner-eslint',
        testPathIgnorePatterns: ['<rootDir>/dist/*'],
    }],
}
