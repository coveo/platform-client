import {EnrichedRequestInit, RequestHandler} from './RequestHandlerInterfaces.js';

/**
 * @description Method to handle requests
 * @experimental
 *
 * @param {string} url The url of the request
 * @param {RequestInit} options The options for the initializing of the request
 * @returns {EnrichedRequestInit} The final request that has been handled
 */
export const handleRequest = (
    url: string,
    requestInit: RequestInit,
    requestHandlers?: RequestHandler[],
): EnrichedRequestInit => {
    if (!requestHandlers || !requestHandlers?.length) {
        return {...requestInit, url};
    }

    const handler = requestHandlers.find(
        (candidate) =>
            candidate.hasOwnProperty('canProcess') &&
            candidate.hasOwnProperty('process') &&
            candidate.canProcess({...requestInit, url}),
    );

    if (!handler) {
        throw new Error('No suitable request handler found');
    }

    return handler.process({...requestInit, url});
};
