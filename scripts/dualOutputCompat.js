import {readFileSync, writeFileSync} from 'node:fs';

// Ensure NodeJS resolves dist/cjs/**/*.js as dist/cjs/**/*.cjs
writeFileSync(
    'dist/cjs/package.json',
    JSON.stringify({
        type: 'commonjs',
    }),
);

// Ensure NodeJS resolves dist/esm/**/*.js as dist/esm/**/*.mjs
writeFileSync(
    'dist/esm/package.json',
    JSON.stringify({
        type: 'module',
    }),
);

// Replace #query-string by the proper query-string version.
const cjsPath = 'dist/cjs/resources/Resource.js';
writeFileSync(cjsPath, readFileSync(cjsPath, 'utf-8').replaceAll(/#query-string/gm, 'query-string-cjs'));
const esmPath = 'dist/esm/resources/Resource.js';
writeFileSync(esmPath, readFileSync(esmPath, 'utf-8').replaceAll(/#query-string/gm, 'query-string-esm'));
const dtsPath = 'dist/types/resources/Resource.d.ts';
writeFileSync(dtsPath, readFileSync(dtsPath, 'utf-8').replaceAll(/#query-string/gm, 'query-string-esm'));
