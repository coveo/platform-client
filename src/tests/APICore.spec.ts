import jestFetchMock from 'jest-fetch-mock';
const fetchMock = jestFetchMock.default;
import API from '../APICore.js';
import {PlatformClientOptions} from '../ConfigurationInterfaces.js';
import getEndpoint, {Environment, Region} from '../Endpoints.js';
import {ResponseHandler} from '../handlers/response/ResponseHandlerInterfaces.js';

jest.mock('../Endpoints.js');

/**
 * Creates a method that can be passed to `fetchMock` to handle a request.
 * It will delay completing the request, and handle abort like `fetch` would.
 *
 * @param result The value to resolve with after timeout, if the request is not aborted.
 * @param timeout The delay to resolve with.
 * @returns A functhion that can be passed to `fetchMock`.
 */
const delayedResponse =
    <T>(result: T, timeout: number) =>
    (_: string, init: RequestInit | undefined): Promise<T> =>
        new Promise((resolve, reject) => {
            const signal = init?.signal;
            let tid: NodeJS.Timeout | null = null;

            if (signal?.aborted) {
                reject(signal.reason);
                return;
            }

            function abort(this: AbortSignal) {
                if (tid !== null) {
                    clearTimeout(tid);
                    tid = null;
                }
                if (signal) {
                    signal.removeEventListener('abort', abort);
                }
                reject(this.reason);
            }

            if (signal) {
                signal.addEventListener('abort', abort);
            }

            tid = setTimeout(() => {
                tid = null;
                if (signal) {
                    signal.removeEventListener('abort', abort);
                }
                resolve(result);
            }, timeout);
        });

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
            fetchMock.mockResponseOnce(JSON.stringify(testData.response));
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
                true,
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
            fetchMock
                .mockResponseOnce('too fast there cowboy!', {status: 429})
                .mockResponseOnce(JSON.stringify(testData.response));
            await api.get(testData.route);

            expect(fetchMock).toHaveBeenCalledTimes(2);
        });

        describe('get', () => {
            it('should do a simple GET request', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.get<typeof testData.response>(testData.route);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('GET');
                expect(response).toEqual(testData.response);
            });

            it('should make the promise fail on a failed request', async () => {
                const error = new Error('the request has failed');
                fetchMock.mockRejectedValue(error);

                await expect(api.get(testData.route)).rejects.toThrow(error);
            });

            it('should bind GET requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeInstanceOf(AbortSignal);
            });

            it('user arguments can set anything but the method', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route, {
                    window: null,
                    credentials: 'include',
                    headers: {Authorization: 'custom', 'Content-Type': 'text/plain'},
                });

                const init = fetchMock.mock.calls[0][1];
                expect(init).toBeDefined();
                expect(init).toHaveProperty('method', 'GET');
                expect(init).toHaveProperty('credentials', 'include');
                expect(init).toHaveProperty('window', null);
                expect(init?.headers).toHaveProperty('Authorization', 'custom');
                expect(init?.headers).toHaveProperty('Content-Type', 'text/plain');
            });

            it('user signal can abort', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const userAbort = new AbortController();
                await api.get(testData.route, {signal: userAbort.signal});

                const init = fetchMock.mock.calls[0][1]!;
                expect(init?.signal).toBeInstanceOf(AbortSignal);
                // There is both the "get abort" signal, and the user abort signal,
                // So the signal should be a combined one.
                expect(init?.signal).not.toEqual(userAbort.signal);

                expect(init?.signal?.aborted).toBe(false);
                userAbort.abort();
                expect(init?.signal?.aborted).toBe(true);
            });
        });

        describe('post', () => {
            it('should do a simple POST request', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.post(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('POST');
                expect(options?.body).toBe(JSON.stringify(testData.body));
                expect(options?.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind POST requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.post(testData.route, testData.body);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeUndefined();
            });

            it('user arguments can set anything but the method', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const userAbort = new AbortController();
                const body: BodyInit = 'RAW STRING';

                await api.post(testData.route, undefined, {
                    body,
                    credentials: 'include',
                    signal: userAbort.signal,
                    headers: {Authorization: 'custom'},
                });

                const init = fetchMock.mock.calls[0][1];
                expect(init).toBeDefined();
                expect(init).toHaveProperty('method', 'POST');
                expect(init).toHaveProperty('credentials', 'include');
                expect(init).toHaveProperty('body', body);
                expect(init).toHaveProperty('signal', userAbort.signal);
                expect(init?.headers).toHaveProperty('Authorization', 'custom');
                expect(init?.headers).not.toHaveProperty('Content-Type');
            });
        });

        describe('postForm', () => {
            const formMock: jest.Mocked<FormData> = jest.fn() as any;

            it('should do a simple POST request using form data', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.postForm(testData.route, formMock);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('POST');
                expect(options?.body).toBe(formMock);
                expect(options?.headers).not.toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind POST requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.postForm(testData.route, formMock);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeUndefined();
            });
        });

        describe('put', () => {
            it('should do a simple PUT request', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.put(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('PUT');
                expect(options?.body).toBe(JSON.stringify(testData.body));
                expect(options?.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind PUT requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.put(testData.route, testData.body);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeUndefined();
            });

            it('user arguments can set anything but the method', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const userAbort = new AbortController();
                const body: BodyInit = 'RAW STRING';

                await api.put(testData.route, undefined, {
                    body,
                    credentials: 'include',
                    signal: userAbort.signal,
                    headers: {Authorization: 'custom'},
                });

                const init = fetchMock.mock.calls[0][1];
                expect(init).toBeDefined();
                expect(init).toHaveProperty('method', 'PUT');
                expect(init).toHaveProperty('credentials', 'include');
                expect(init).toHaveProperty('body', body);
                expect(init).toHaveProperty('signal', userAbort.signal);
                expect(init?.headers).toHaveProperty('Authorization', 'custom');
                expect(init?.headers).not.toHaveProperty('Content-Type');
            });
        });

        describe('patch', () => {
            it('should do a simple PATCH request', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.patch(testData.route, testData.body);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('PATCH');
                expect(options?.body).toBe(JSON.stringify(testData.body));
                expect(options?.headers).toEqual(expect.objectContaining({'Content-Type': 'application/json'}));
                expect(response).toEqual(testData.response);
            });

            it('should not bind PATCH requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.patch(testData.route, testData.body);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeUndefined();
            });

            it('user arguments can set anything but the method', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const userAbort = new AbortController();
                const body: BodyInit = 'RAW STRING';

                await api.patch(testData.route, undefined, {
                    body,
                    credentials: 'include',
                    signal: userAbort.signal,
                    headers: {Authorization: 'custom'},
                });

                const init = fetchMock.mock.calls[0][1];
                expect(init).toBeDefined();
                expect(init).toHaveProperty('method', 'PATCH');
                expect(init).toHaveProperty('credentials', 'include');
                expect(init).toHaveProperty('body', body);
                expect(init).toHaveProperty('signal', userAbort.signal);
                expect(init?.headers).toHaveProperty('Authorization', 'custom');
                expect(init?.headers).not.toHaveProperty('Content-Type');
            });
        });

        describe('delete', () => {
            it('should do a simple DELETE request', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                const response = await api.delete(testData.route);

                expect(fetchMock).toHaveBeenCalledTimes(1);
                const [url, options] = fetchMock.mock.calls[0];

                expect(url).toBe(`${testConfig.host}${testData.route}`);
                expect(options?.method).toBe('DELETE');
                expect(response).toEqual(testData.response);
            });

            it('should not bind DELETE requests to an abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.delete(testData.route);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal).toBeUndefined();
            });

            it('user arguments can set anything but the method', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.delete(testData.route, {
                    window: null,
                    credentials: 'include',
                    headers: {Authorization: 'custom', 'Content-Type': 'text/plain'},
                });

                const init = fetchMock.mock.calls[0][1];
                expect(init).toBeDefined();
                expect(init).toHaveProperty('method', 'DELETE');
                expect(init).toHaveProperty('credentials', 'include');
                expect(init).toHaveProperty('window', null);
                expect(init?.headers).toHaveProperty('Authorization', 'custom');
                expect(init?.headers).toHaveProperty('Content-Type', 'text/plain');
            });
        });

        describe('when calling abortGetRequests', () => {
            it('should abort pending get requests', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal?.aborted).toBe(false);
                await api.abortGetRequests();
                expect(init?.signal?.aborted).toBe(true);
            });

            it('should abort pending get requests even with user abort', async () => {
                const userAbort = new AbortController();
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.get(testData.route, {signal: userAbort.signal});
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal?.aborted).toBe(false);
                await api.abortGetRequests();
                expect(init?.signal?.aborted).toBe(true);
                expect(userAbort.signal.aborted).toBe(false);
            });

            it('should not abort get requests that are being sent after the abort signal', async () => {
                fetchMock.mockResponseOnce(JSON.stringify(testData.response));
                await api.abortGetRequests();
                await api.get(testData.route);
                const init = fetchMock.mock.calls[0][1];
                expect(init?.signal?.aborted).toBe(false);
            });

            it('throws an AbortError when aborting a GET request', async () => {
                fetchMock.mockImplementationOnce(
                    delayedResponse(new Response(JSON.stringify(testData.response), {status: 200}), 1000),
                );

                const request = api.get(testData.route);
                api.abortGetRequests();

                await expect(request).rejects.toThrow('This operation was aborted');
            });
        });
    });

    it('should not throw errors when instanciating a new API', () => {
        expect(() => {
            new API(testConfig);
        }).not.toThrow();
    });

    describe('response handling', () => {
        it('should give priority to custom response handlers when specified', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(testData.response));
            const CustomResponseHandler: ResponseHandler = {
                canProcess: (response: Response): boolean => response.ok,
                process: jest.fn(),
            };
            const apiWithCustomResponseHandler = new API({...testConfig, responseHandlers: [CustomResponseHandler]});
            await apiWithCustomResponseHandler.get('some/resource');

            expect(CustomResponseHandler.process).toHaveBeenCalledTimes(1);
        });

        it('forwards responseBodyFormat argument to the response handlers', async () => {
            fetchMock.mockResponseOnce('the response');
            const handlerSpy = jest.fn();
            const CustomResponseHandler: ResponseHandler = {
                canProcess: (response: Response): boolean => response.ok,
                process: handlerSpy,
            };
            const apiWithCustomResponseHandler = new API({...testConfig, responseHandlers: [CustomResponseHandler]});
            await apiWithCustomResponseHandler.get('some/resource', {responseBodyFormat: 'text'});
            expect(CustomResponseHandler.process).toHaveBeenCalledWith(expect.anything(), 'text');
        });
    });

    describe('organizationId', () => {
        it('should return the organization id option if no organizationIdRetriever is set', () => {
            const api = new API(testConfig);
            expect(api.organizationId).toBe(testConfig.organizationId);
        });

        it('should throw an error if organization is undefined', () => {
            const api = new API({accessToken: 'my-token'});
            const error = new Error('No organization ID found in the config.');
            expect(() => api.organizationId).toThrow(error);
        });

        it('should return call the organization id retriver function to get the organization id', () => {
            const api = new API({...testConfig, organizationId: () => 'another-org-id'});
            expect(api.organizationId).not.toBe(testConfig.organizationId);
            expect(api.organizationId).toBe('another-org-id');
        });
    });

    describe('checkToken', () => {
        const mockedFormData = {
            append: jest.fn(),
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
            expect(mockedFormData.append).toHaveBeenCalledTimes(1);
            expect(mockedFormData.append).toHaveBeenCalledWith('token', 'my-token');
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

    describe('fetch configuration', () => {
        it('should allow a fetch configuration to be included for all requests', async () => {
            const globalRequestSettings: RequestInit = {
                headers: {
                    override: 'value',
                },
            };

            const responseBody = {
                type: '🐟',
            };

            fetchMock.mockImplementation((_url: string, config: RequestInit): Promise<Response> => {
                if (config.headers && config.headers['override']) {
                    return Promise.resolve(new Response(JSON.stringify(responseBody)));
                }
                return Promise.resolve(new Response(JSON.stringify(testData.response)));
            });

            const api = new API({...testConfig, globalRequestSettings});

            const res = await api.get('/', {headers: new Headers({noOverride: 'value'})});
            expect(res).toEqual(responseBody);
        });

        it('should prefer the method calls passed request arguments over the default config', async () => {
            const globalRequestSettings: RequestInit = {
                headers: new Headers({
                    override: 'value',
                }),
            };

            const responseBody = {
                type: '🐟',
            };

            const overriddenValue = 'not-the-value';

            fetchMock.mockImplementation((_url: string, config: RequestInit): Promise<Response> => {
                if (config.headers && config.headers['override'] === overriddenValue) {
                    return Promise.resolve(new Response(JSON.stringify(responseBody)));
                }
                return Promise.resolve(new Response(JSON.stringify(testData.response)));
            });

            const api = new API({...testConfig, globalRequestSettings});

            const res = await api.get('/', {headers: new Headers({override: overriddenValue})});
            expect(res).toEqual(testData.response);
        });
    });
});
