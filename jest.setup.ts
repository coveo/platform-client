import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {GlobalWithFetchMock} from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as any as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
