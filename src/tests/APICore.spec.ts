import API from '../APICore';
import {PlatformClientOptions} from '../ConfigurationInterfaces';
import getEndpoint, {Environment, Region} from '../Endpoints';
import {ResponseHandler} from '../handlers/ResponseHandlerInterfaces';

jest.mock('../Endpoints');

describe('APICore', () => {
    const testConfig: PlatformClientOptions = {
        host: 'https://some.url/',
        organizationId: 'some-org-id',
        accessToken: jest.fn(() => 'my-token'),
    };
    const testData = {
        route: 'rest/resource',
        response: {nuggets: 12345},
        body: {q: 'how many nuggets'},
    };

    describe('calling the right endpoint', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            global.fetch.mockResponseOnce(JSON.stringify(testData.response));
        });

        it('should call the default endpoint if no environment, region, and host is specified', async () => {
            const api = new API({accessToken: 'my-token', organizationId: 'some-org'});
            await api.get('this/that');
            expect(getEndpoint).toHaveBeenCalledTimes(1);
            expect(getEndpoint).toHaveBeenCalledWith(Environment.prod, Region.US, undefined);
        });

        it('should call the europe endpoint if the europe region is specified', async () => {
            const api = new API({accessToken: 'my-token', organizationId: 'some-org', region: Region.EU});
            await api.get('this/that');
            expect(getEndpoint).toHaveBeenCalledTimes(1);
            expect(getEndpoint).toHaveBeenCalledWith(Environment.prod, Region.EU, undefined);
        });

        it('should call the development endpoint if the dev environment option is provided', async () => {
            const api = new API({accessToken: 'my-token', organizationId: 'some-org', environment: Environment.dev});
            await api.get('this/that');
            expect(getEndpoint).toHaveBeenCalledTimes(1);
            expect(getEndpoint).toHaveBeenCalledWith(Environment.dev, Region.US, undefined);
        });

        it('should call the serverless endpoint if it is serverless host', async () => {
            const api = new API(
                {accessToken: 'my-token', organizationId: 'some-org', environment: Environment.dev},
                true
            );
            await api.get('this/that');
            expect(getEndpoint).toHaveBeenCalledTimes(1);
            expect(getEndpoint).toHaveBeenCalledWith(Environment.dev, Region.US, true);
        });

        it('should call the custom endpoint if a custom host option is provided', async () => {
            const myCustomHost = 'localhost:9999/my-api-running-locally';
            const api = new API({accessToken: 'my-token', organizationId: 'some-org', host: myCustomHost});
            await api.get('this/that');
            expect(getEndpoint).not.toHaveBeenCalled();
            const [url] = fetchMock.mock.calls[0];
            expect(url).toMatch(myCustomHost);
        });
    });

    describe('when making requests', () => {
        let api: API;

        beforeEach(() => {
            api = new API(testConfig);
            jest.clearAllMocks();
        });

        it('should retry on throttle', async () => {
            const fetchMock = global.fetch
                .mockResponseOnce('too fast there cowboy!', {status: 429})
                .mockResponseOnce(JSON.stringify(testData.response));
            await api.get(testData.route);

            expect(fetchMock).toHaveBeenCalledTimes(2);
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

                await expect(api.get(testData.route)).rejects.toThrow(error);
            });

            it('should bind GET requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal).toBeDefined();
                expect(global.fetch.mock.calls[0][1].signal instanceof AbortSignal).toBe(true);
            });
        });

        describe('getFile', () => {
            it('should do a GET request to the specified url and resolve with a blob', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const expectedResponse = await new Response(JSON.stringify(testData.response)).blob();
                const response = await api.getFile(testData.route);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('get');
                expect(response).toEqual(expectedResponse);
            });

            it('should make the promise fail on a failed request', async () => {
                const error = new Error('the request has failed');
                global.fetch.mockRejectedValue(error);
                await expect(api.getFile(testData.route)).rejects.toThrow(error);
            });

            it('should bind GET requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.getFile(testData.route);
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

            it('should not bind POST requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.post(testData.route, testData.body);
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

            it('should not bind POST requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.postForm(testData.route, formMock);
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

            it('should not bind PUT requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.put(testData.route, testData.body);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('patch', () => {
            it('should do a simple PATCH request', async () => {
                const fetchMock = global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.patch(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options.method).toBe('PATCH');
                expect(options.body).toBe(JSON.stringify(testData.body));
                expect(options.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind PATCH requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.patch(testData.route, testData.body);
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

            it('should not bind DELETE requests to an abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.delete(testData.route);
                expect(global.fetch.mock.calls[0][1].signal).toBeUndefined();
            });
        });

        describe('when calling abortGetRequests', () => {
            it('should abort pending get requests', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(false);
                await api.abortGetRequests();
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
            });

            it('should not abort get requests that are being sent after the abort signal', async () => {
                global.fetch.mockResponseOnce(JSON.stringify(testData.response));
                await api.abortGetRequests();
                await api.get(testData.route);
                expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(false);
            });

            it('should not resolve nor reject the fetch promise', () => {
                jest.useFakeTimers();
                const resolvedPromiseSpy = jest.fn().mockName('resolvedPromiseSpy');
                const rejectedPromiseSpy = jest.fn().mockName('rejectedPromiseSpy');

                global.fetch.mockImplementationOnce(
                    () =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(new Response(JSON.stringify(testData.response), {status: 200}));
                            }, 1000);
                        })
                );

                api.get(testData.route).then(resolvedPromiseSpy).catch(rejectedPromiseSpy);

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
            const api = new API({...testConfig, organizationId: () => 'another-org-id'});
            expect(api.organizationId).not.toBe(testConfig.organizationId);
            expect(api.organizationId).toBe('another-org-id');
        });
    });

    describe('checkToken', () => {
        const mockedFormData = {
            set: jest.fn(),
        };

        beforeEach(() => {
            (global as any).FormData = jest.fn(() => mockedFormData);
        });

        it('should check if the retrieved token is valid', async () => {
            const postFormSpy = jest.spyOn(API.prototype, 'postForm').mockResolvedValue(Promise.resolve());
            const api = new API(testConfig);

            await api.checkToken();

            expect(postFormSpy).toHaveBeenCalledTimes(1);
            expect(postFormSpy).toHaveBeenCalledWith('/oauth/check_token', mockedFormData);
            expect(mockedFormData.set).toHaveBeenCalledTimes(1);
            expect(mockedFormData.set).toHaveBeenCalledWith('token', 'my-token');
        });

        it('should throw an error if the check token call fails', async () => {
            jest.spyOn(API.prototype, 'postForm').mockRejectedValue(new Error('invalid token'));
            const api = new API(testConfig);
            await expect(api.checkToken()).rejects.toThrow(new Error('invalid token'));
        });

        it('should store the token info returned by the promise', async () => {
            const tokenInfo = {authentication: '💎', b: '🐟'};
            jest.spyOn(API.prototype, 'postForm').mockResolvedValue(Promise.resolve(tokenInfo));

            const api = new API(testConfig);

            await api.checkToken();
            expect(api.currentUser).toBe('💎');
        });
    });
});
