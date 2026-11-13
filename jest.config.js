// /*
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */

export default {
    extensionsToTreatAsEsm: ['.ts'],
    preset: 'ts-jest/presets/default-esm',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/../tsconfig.test.json', useESM: true}],
    },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    setupFiles: ['../jest.setup.ts'],
    rootDir: './src',
    testEnvironment: 'node',
};
