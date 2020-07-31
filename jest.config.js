module.exports = {
    projects: [
        {
            displayName: 'ts-check and test',
            preset: 'ts-jest',
            testEnvironment: 'node',
            automock: false,
            setupFiles: ['./jest.setup.ts'],
        },
        {
            displayName: 'ESLint',
            runner: 'jest-runner-eslint',
            watchPlugins: ['jest-runner-eslint/watch-fix'],
        },
    ],
};
