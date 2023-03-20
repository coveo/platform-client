import handleResponse, {CoveoPlatformClientError, ResponseHandlers} from '../ResponseHandlers.js';

describe('ResponseHandlers', () => {
    it('should return a promise resolved with an empty object when the response status code is 204', async () => {
        const noContentResponse = new Response(null, {status: 204});
        const ret = await handleResponse(noContentResponse);
        expect(ret).toEqual({});
    });

    it('should return a promise resolved with the response body when the response status is between 200 and 299', async () => {
        const data = {someData: 'thank you!'};

        const okResponse = new Response(JSON.stringify(data), {status: 200});
        const ret1 = await handleResponse(okResponse);
        expect(ret1).toEqual(data);

        const stillOkResponse = new Response(JSON.stringify(data), {status: 299});
        const ret2 = await handleResponse(stillOkResponse);
        expect(ret2).toEqual(data);
    });

    describe('when the status is not between 200 and 299', () => {
        const buildResponseAndError = (bodyExtension: object = {}, headers: HeadersInit = {}) => {
            const httpError = {
                code: 'WRONG_UTENSIL',
                message: 'Use a spoon to eat the soup.',
                ...bodyExtension,
            };
            const errorResponse = new Response(JSON.stringify(httpError), {
                status: 400,
                headers,
            });
            return {errorResponse, httpError};
        };

        const headersWithXRequestId = {
            'X-Request-ID': 'DidyoueverhearthetragedyofDarthPlagueisTheWise?',
        };

        it('should return a promise rejected with the response body', async () => {
            const {errorResponse, httpError} = buildResponseAndError({}, headersWithXRequestId);

            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError).toMatchObject(httpError);
            expect(rejectedError).toBeInstanceOf(CoveoPlatformClientError);
            expect(rejectedError?.xRequestId).toBe('DidyoueverhearthetragedyofDarthPlagueisTheWise?');
        });

        it('should fallback xRequestId to unknown as a string', async () => {
            const {errorResponse} = buildResponseAndError();
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.xRequestId).toBe('unknown');
        });

        it('should prefer `errorCode` over an alias', async () => {
            const {errorResponse} = buildResponseAndError(
                {errorCode: 'someErrorCode', type: 'someAliasedErrorCode'},
                headersWithXRequestId
            );
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.errorCode).toBe('someErrorCode');
        });

        it('should fallback to an errorCode alias', async () => {
            const {errorResponse} = buildResponseAndError({type: 'someAliasedErrorCode'}, headersWithXRequestId);
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.errorCode).toBe('someAliasedErrorCode');
        });

        it('should ultimately fallback errorCode to unknown as a string', async () => {
            const {errorResponse} = buildResponseAndError();
            let rejectedError: CoveoPlatformClientError | undefined;
            try {
                await handleResponse(errorResponse);
            } catch (error) {
                rejectedError = error;
            }

            expect(rejectedError?.errorCode).toBe('unknown');
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
