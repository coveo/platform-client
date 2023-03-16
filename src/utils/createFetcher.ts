import {AsyncSupplier, Predicate} from './types.js';

/**
 * Creates a method to perform a fetch request. Can be retried by calling the method again.
 *
 * @param url The URL to use for the request.
 * @param init The parameters to provide to the request.
 * @param shouldReject Predicate to see if the response should be (Promise) rejected.
 * @returns A method, taking no arguments, that may be called multiple times to repeat the request.
 */
export const createFetcher =
    (url: string, init: RequestInit, shouldReject?: Predicate<Response>): AsyncSupplier<Response> =>
    async () => {
        const response = await fetch(url, init);
        if (shouldReject?.(response)) {
            throw response;
        }
        return response;
    };
