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

    describe('when making requests', () => {
        let api: API;

        beforeEach(() => {
            api = new API(testConfig);
            jest.clearAllMocks();
        });

        describe('get', () => {
            it('should do a simple GET request', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.get<typeof testData.response>(testData.route);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('get');
                expect(response).toEqual(testData.response);
            });

            it('should make the promise fail on a failed request', async () => {
                const error = new Error('the request has failed');
                global.fetch.mockRejectedValue(error);

                try {
                    await api.get(testData.route);
                } catch (e) {
                    expect(e).toEqual(error);
                }
            });

            it('should bind GET requests to an abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal).toBeDefined();
                expect(global.fetch.mock.calls[0][1].signal instanceof AbortSignal).toBe(true);
            });
        });

        describe('post', () => {
            it('should do a simple POST request', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.post(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('post');
                expect(options.body).toBe(JSON.stringify(testData.body));
                expect(options.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind POST requests to an abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.post(testData.route, testData.body);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('postForm', () => {
            const formMock: jest.Mocked<FormData> = jest.fn() as any;

            it('should do a simple POST request using form data', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.postForm(testData.route, formMock);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('post');
                expect(options.body).toBe(formMock);
                expect(options.headers).not.toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind POST requests to an abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.postForm(testData.route, formMock);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('put', () => {
            it('should do a simple PUT request', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.put(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('put');
                expect(options.body).toBe(JSON.stringify(testData.body));
                expect(options.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind PUT requests to an abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.put(testData.route, testData.body);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('delete', () => {
            it('should do a simple DELETE request', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.delete(testData.route);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('delete');
                expect(response).toEqual(testData.response);
            });

            it('should not bind DELETE requests to an abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.delete(testData.route);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('when calling abortGetRequests', () => {
            it('should abort pending get requests', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(false);
                api.abortGetRequests();
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
            });

            it('should not abort get requests that are being sent after the abort signal', () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                api.abortGetRequests();
                api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(false);
            });

            it('should not resolve nor reject the fetch promise', () => {
                jest.useFakeTimers();
                const resolvedPromiseSpy = jest.fn().mockName('resolvedPromiseSpy');
                const rejectedPromiseSpy = jest.fn().mockName('rejectedPromiseSpy');

                global.fetch.mockImplementationOnce(() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(new Response(JSON.stringify(testData.response), {status: 200}));
                        }, 1000);
                    });
                });

                api.get(testData.route)
                    .then(resolvedPromiseSpy)
                    .catch(rejectedPromiseSpy);

                jest.advanceTimersByTime(500);
                api.abortGetRequests();
                jest.advanceTimersByTime(2000);

                expect(resolvedPromiseSpy).not.toHaveBeenCalled();
                expect(rejectedPromiseSpy).not.toHaveBeenCalled();
            });
        });
    });

    it('should not throw errors when instanciating a new API', () => {
        expect(() => {
            new API(testConfig);
        }).not.toThrow();
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

    describe('organizationId', () => {
        it('should return the organization id option if no organizationIdRetriever is set', () => {
            const api = new API(testConfig);
            expect(api.organizationId).toBe(testConfig.organizationId);
        });

        it('should return call the organization id retriver function to get the organization id', () => {
            const api = new API({...testConfig, organizationIdRetriever: () => 'another-org-id'});
            expect(api.organizationId).not.toBe(testConfig.organizationId);
            expect(api.organizationId).toBe('another-org-id');
        });
    });
});
