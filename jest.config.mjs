const unmockedDependencies = ['query-string-esm', 'decode-uri-component', 'split-on-first', 'filter-obj'];

// /*
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    projects: [
        {
            displayName: 'ESLint',
            runner: 'jest-runner-eslint',
            watchPlugins: ['jest-runner-eslint/watch-fix'],
        },
        {
            displayName: 'ts-check and test',
            extensionsToTreatAsEsm: ['.ts'],
            preset: 'ts-jest/presets/default-esm',
            moduleNameMapper: {
                '^(\\.{1,2}/.*)\\.js$': '$1',
                '^#query-string': 'query-string-esm',
            },
            globals: {'ts-jest': {tsconfig: '<rootDir>/../tsconfig.test.json', useESM: true}},
            transform: {
                '^.+\\.[tj]s$': ['ts-jest'],
            },
            clearMocks: true,
            collectCoverage: true,
            collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
            coverageDirectory: 'coverage',
            setupFiles: ['../jest.setup.ts'],
            transformIgnorePatterns: [`node_modules/(?!(${unmockedDependencies.join('|')}))`],
            rootDir: './src',
            testEnvironment: 'node',
        },
    ],
};
