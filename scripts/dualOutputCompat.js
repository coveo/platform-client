import {writeFileSync} from 'node:fs';

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
