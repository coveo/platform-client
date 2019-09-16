import API from '../APICore';
import {UnauthorizedResponseError} from '../handlers/UnauthorizedResponseHandler';

describe('APICore', () => {
    const api = new API('https://some.url/', 'some-org', () => 'my-token');

    beforeEach(() => {
        global.fetch.resetMocks();
    });

    describe('get', () => {
        test('simple request', async () => {
            global.fetch.mockResponseOnce(JSON.stringify({data: 12345}));

            const response = await api.get<{data: number}>('rest/object');
            expect(response.data).toBe(12345);
        });

        test('request with params', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify({data: 12345}));
            const response = await api.get<{data: number}>('rest/object', {a: 'b', c: 'd'});
            const [url] = fetchMock.mock.calls[0];

            expect(url).toMatch(/\?a=b&c=d$/);
            expect(response.data).toBe(12345);
        });

        test('failed request', async () => {
            const error = new UnauthorizedResponseError();
            global.fetch.mockReject(() => new Promise((resolve) => resolve({status: 403})));

            try {
                await api.get('rest/object');
            } catch (e) {
                expect(e).toStrictEqual(error);
            }
        });
    });
});
