const unmockedDependencies = ['query-string-esm', 'decode-uri-component', 'split-on-first', 'filter-obj'];

// /*
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    extensionsToTreatAsEsm: ['.ts'],
    preset: 'ts-jest/presets/default-esm',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^#query-string': 'query-string-cjs',
    },
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/../tsconfig.test.json', useESM: true}],
    },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    setupFiles: ['../jest.setup.ts'],
    transformIgnorePatterns: [`node_modules/(?!(${unmockedDependencies.join('|')}))`],
    rootDir: './src',
    testEnvironment: 'node',
};
