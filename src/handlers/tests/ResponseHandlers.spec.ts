import handleResponse, {CoveoPlatformClientError, ResponseHandlers} from '../ResponseHandlers.js';

describe('ResponseHandlers', () => {
    describe('no content', () => {
        it('returns a promise resolved with an empty object when the response status code is 204', async () => {
            const noContentResponse = new Response(null, {status: 204});
            const ret = await handleResponse(noContentResponse);
            expect(ret).toEqual({});
        });
    });

    describe.each([200, 299])('when the response status code is between 200 and 299 (success)', (status) => {
        it(`${status} returns a promise resolved with the response body in JSON format`, async () => {
            const data = {someData: 'thank you!'};
            const okResponse = new Response(JSON.stringify(data), {status});
            const result = await handleResponse(okResponse);
            expect(result).toEqual(data);
        });

        it(`${status} returns a promise resolved with the response body in text format if responseBodyFormat = "text"`, async () => {
            const data =
                '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>test</title></head><body>test</body></html>';
            const okResponse = new Response(data, {status});
            const result = await handleResponse(okResponse, null, 'text');
            expect(result).toEqual(data);
        });

        it(`${status} returns a promise resolved with the response body in blob format if responseBodyFormat = "blob"`, async () => {
            const okResponse = new Response('some content', {status});
            const expectedResult = await okResponse.clone().blob();
            const result = await handleResponse(okResponse, null, 'blob');
            expect(result).toEqual(expectedResult);
        });
    });

    describe('when the status is not between 200 and 299', () => {
        const buildResponseAndError = (httpError: object = {}, headers: HeadersInit = {}) => {
            const errorResponse = new Response(JSON.stringify(httpError), {
                status: 400,
                headers,
            });
            return {errorResponse, httpError};
        };

        it('should return a promise rejected with the response body', async () => {
            const {errorResponse, httpError} = buildResponseAndError();

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError).toMatchObject(httpError);
            expect(rejectedError).toBeInstanceOf(CoveoPlatformClientError);
        });

        it('should handle WAF error response with a 403 error response', async () => {
            const data =
                '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>test</title></head><body>test</body></html>';
            const errorResponse = new Response(data, {status: 403, headers: {'x-coveo-waf-action': 'block'}});

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse, null, 'text');
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.status).toBe(403);
            expect(rejectedError?.title).toBe('Request blocked for security reasons');
            expect(rejectedError?.detail).toBe(
                'The web application firewall has identified the request to be potentially malicious.',
            );
            expect(rejectedError).toBeInstanceOf(CoveoPlatformClientError);
        });

        it('should handle bad gateway error response with a 502 error response', async () => {
            const data =
                '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>test</title></head><body>test</body></html>';
            const errorResponse = new Response(data, {status: 502});

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse, null, 'text');
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.status).toBe(502);
            expect(rejectedError?.title).toBe('Endpoint unreachable');
            expect(rejectedError?.detail).toBe(
                'The service is currently unable to reach the necessary endpoint, likely due to a bad gateway. Please try your request again later.',
            );
            expect(rejectedError).toBeInstanceOf(CoveoPlatformClientError);
        });

        it('should handle HTML error response with a generic HTML error response', async () => {
            const data =
                '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>test</title></head><body>test</body></html>';
            const errorResponse = new Response(data, {status: 403, headers: {'content-type': 'text/html'}});

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse, null, 'text');
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.status).toBe(403);
            expect(rejectedError?.title).toBe('There is some issue with the endpoint and we cant parse the error');
            expect(rejectedError?.detail).toBe(data);
            expect(rejectedError).toBeInstanceOf(CoveoPlatformClientError);
        });

        it('should include the HTTP status code in the error', async () => {
            const {errorResponse} = buildResponseAndError();

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.status).toBe(400);
        });

        it('should include the `xRequestId` in the error', async () => {
            const {errorResponse} = buildResponseAndError(
                {},
                {
                    'X-Request-ID': 'DidyoueverhearthetragedyofDarthPlagueisTheWise?',
                },
            );
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.xRequestId).toBe('DidyoueverhearthetragedyofDarthPlagueisTheWise?');
        });

        it.each(['xRequestId', 'title', 'detail'])(
            'should ultimately fallback `%s` to unknown as a string',
            async (key) => {
                const {errorResponse} = buildResponseAndError();
                let rejectedError: CoveoPlatformClientError | undefined;
                try {
                    await handleResponse(errorResponse);
                } catch (error) {
                    rejectedError = error;
                }

                expect(rejectedError?.[key]).toBe('unknown');
            },
        );

        it.each([
            ['title', 'type'],
            ['detail', 'message'],
        ])('should prefer `%s` over an alias', async (key, altKey) => {
            const {errorResponse} = buildResponseAndError({[key]: 'shouldBeThis', [altKey]: 'shouldNotBeThat'});
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.[key]).toBe('shouldBeThis');
        });

        it.each([
            ['title', 'type'],
            ['detail', 'message'],
        ])('should fallback to a `%s` alias', async (key, altKey) => {
            const {errorResponse} = buildResponseAndError({[altKey]: 'shouldBeAlias'});
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.[key]).toBe('shouldBeAlias');
        });
    });

    it('should return a promise resolved with the response body as blob when using the successBlob handler and the status is between 200 and 299', async () => {
        const data = {someData: 'thank you!'};
        const expectedBlob = await new Response(JSON.stringify(data)).blob();

        const okResponse = new Response(JSON.stringify(data), {status: 200});
        const ret1 = await handleResponse(okResponse, [ResponseHandlers.successBlob]);
        expect(ret1).toEqual(expectedBlob);
    });
});
