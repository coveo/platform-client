module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [require.resolve('tsjs/eslint-config')],
    parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['**/*.spec.ts'],
            env: {
                jest: true,
            },
            extends: ['plugin:jest/recommended'],
        },
    ],
    rules: {
        'prettier/prettier': ['error', {endOfLine: 'auto'}],
    },
};
