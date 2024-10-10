import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginJest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            jsdoc.configs['flat/recommended-typescript'],
            eslintConfigPrettier,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            '@typescript-eslint/only-throw-error': 'warn',
            '@typescript-eslint/unbound-method': 'warn',
        },
    },
    {
        files: ['**/*.spec.ts'],
        extends: [eslintPluginJest.configs['flat/recommended']],
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {files: ['**/*.js', '**/*.mjs'], ...tseslint.configs.disableTypeChecked},
);
