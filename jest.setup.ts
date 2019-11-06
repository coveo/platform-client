import {GlobalWithFetchMock} from 'jest-fetch-mock';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
