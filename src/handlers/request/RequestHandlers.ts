import {EnrichedRequestInit, RequestHandler} from './RequestHandlerInterfaces.js';

export const handleRequest = (
    url: string,
    requestInit: RequestInit,
    requestHandlers?: RequestHandler[],
): EnrichedRequestInit => {
    if (!requestHandlers || !requestHandlers?.length) {
        return {...requestInit, url};
    }

    return requestHandlers.reduce(
        (enrichedOptions: EnrichedRequestInit, currentHandler: RequestHandler) => {
            if (!currentHandler.hasOwnProperty('canProcess') || !currentHandler.hasOwnProperty('process')) {
                return enrichedOptions;
            }

            return currentHandler.canProcess(enrichedOptions)
                ? {...enrichedOptions, ...currentHandler.process(enrichedOptions)}
                : enrichedOptions;
        },
        {...requestInit, url},
    );
};
