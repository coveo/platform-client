import API from '../APICore';
import {APIConfiguration} from '../ConfigurationInterfaces';
import {ResponseHandler} from '../handlers/ResponseHandlerInterfaces';

describe('APICore', () => {
    const testConfig: APIConfiguration = {
        host: 'https://some.url/',
        organizationId: 'some-org-id',
        accessTokenRetriever: jest.fn(() => 'my-token'),
    };
    const testData = {
        route: 'rest/resource',
        response: {nuggets: 12345},
        body: {q: 'how many nuggets'},
    };
    const api = new API(testConfig);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('get', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.get<typeof testData.response>(testData.route);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testConfig.host}${testData.route}`);
            expect(options.method).toBe('get');
            expect(response).toEqual(testData.response);
        });

        test('request with params', async () => {
            const fetchMock = global.fetch.mockResponseOnce('{}');
            await api.get(testData.route, {a: 'b', c: 'd'});
            const [url] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testConfig.host}${testData.route}?a=b&c=d`);
        });

        test('failed request', async () => {
            const error = new Error('the request has failed');
            global.fetch.mockRejectedValue(error);

            try {
                await api.get(testData.route);
            } catch (e) {
                expect(e).toEqual(error);
            }
        });
    });

    describe('post', () => {
        test('simple request', async () => {
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
            const response = await api.post(testData.route, testData.body);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            const [url, options] = fetchMock.mock.calls[0];

            expect(url).toBe(`${testConfig.host}${testData.route}`);
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

            expect(url).toBe(`${testConfig.host}${testData.route}`);
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

            expect(url).toBe(`${testConfig.host}${testData.route}`);
            expect(options.method).toBe('delete');
            expect(response).toEqual(testData.response);
        });
    });

    it('should give priority to custom response handlers when specified', async () => {
        global.fetch.mockResponseOnce(JSON.stringify(testData.response));
        const CustomResponseHandler: ResponseHandler = {
            canProcess: (response: Response): boolean => response.ok,
            process: jest.fn(),
        };
        const apiWithCustomResponseHandler = new API({...testConfig, responseHandlers: [CustomResponseHandler]});
        await apiWithCustomResponseHandler.get('some/resource');

        expect(CustomResponseHandler.process).toHaveBeenCalledTimes(1);
    });
});
