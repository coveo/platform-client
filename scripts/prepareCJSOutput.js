import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const pjson = JSON.parse(readFileSync('package.json', {encoding: 'utf-8'}));

// See https://github.com/microsoft/TypeScript/pull/54567
writeFileSync(join('src', 'package.json'), JSON.stringify({...pjson, type: 'commonjs'}));
