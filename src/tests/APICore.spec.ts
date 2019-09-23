import API from '../APICore';
import {UnauthorizedResponseError} from '../handlers/UnauthorizedResponseHandler';

describe('APICore', () => {
    const testOptions = {
        host: 'https://some.url/',
        org: 'some-org-id',
        token: 'my-token',
    };
    const testData = {
        route: 'rest/resource',
        response: {nuggets: 12345},
        body: {q: 'how many nuggets'},
    };
    const getTestToken = jest.fn(() => testOptions.token);
    const api = new API(testOptions.host, testOptions.org, getTestToken);

    beforeEach(() => {
        global.fetch.resetMocks();
    });

    describe('get', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.get<typeof testData.response>(testData.route);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testOptions.host}${testData.route}`);
            expect(options.method).toBe('get');
            expect(response).toEqual(testData.response);
        });

        test('request with params', async () => {
            const fetchMock = global.fetch.mockResponseOnce('{}');
            await api.get(testData.route, {a: 'b', c: 'd'});
            const [url] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testOptions.host}${testData.route}?a=b&c=d`);
        });

        test('failed request', async () => {
            const error = new UnauthorizedResponseError();
            global.fetch.mockReject(() => new Promise((resolve) => resolve({status: 403})));

            try {
                await api.get(testData.route);
            } catch (e) {
                expect(e).toStrictEqual(error);
            }
        });
    });

    describe('post', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.post(testData.route, testData.body);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testOptions.host}${testData.route}`);
            expect(options.method).toBe('post');
            expect(options.body).toBe(JSON.stringify(testData.body));
            expect(response).toEqual(testData.response);
        });
    });

    describe('put', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.put(testData.route, testData.body);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testOptions.host}${testData.route}`);
            expect(options.method).toBe('put');
            expect(options.body).toBe(JSON.stringify(testData.body));
            expect(response).toEqual(testData.response);
        });
    });

    describe('delete', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.delete(testData.route);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testOptions.host}${testData.route}`);
            expect(options.method).toBe('delete');
            expect(response).toEqual(testData.response);
        });
    });
});
