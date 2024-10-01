// TODO CDX-1574: remove this polyfill when we bump the minimal supported Node.js version to 22
import 'core-js/actual/json/parse.js';
import {Predicate} from '../../utils/types.js';
import {ResponseBodyFormat, ResponseHandler} from './ResponseHandlerInterfaces.js';

/**
 * Check whether the response status is `204 No Content`.
 * @param response
 */
export const isNoContent: Predicate<Response> = (response) => response.status === 204;

/**
 * Check whether the response is considered to have any "ok" status code (not just 200).
 * @param response
 */
export const isAnyOkStatus: Predicate<Response> = (response) => response.ok;

const noContent: ResponseHandler = {
    canProcess: isNoContent,
    process: <T>(): Promise<T> => Promise.resolve({} as T),
};

const success: ResponseHandler = {
    canProcess: isAnyOkStatus,
    process: async <T>(response: Response, responseBodyFormat: ResponseBodyFormat = 'json'): Promise<T> => {
        if (responseBodyFormat !== 'json') {
            return response[responseBodyFormat]() as T;
        }
        const content = await response.text();
        return (
            JSON.parse as (
                text: string,
                reviver?: <K>(key: string, value: K, context: {source: K}) => K | undefined,
            ) => T
        )(content, (_key, value, context) => {
            if (typeof value === 'number' && !Number.isSafeInteger(Math.floor(value))) {
                return context.source;
            }
            return value;
        });
    },
};

/**
 * @deprecated Use `success` handler with `responseBodyFormat` `'blob'` instead. Will be removed in version 45
 */
const successBlob: ResponseHandler = {
    canProcess: isAnyOkStatus,
    process: async <T>(response: Response): Promise<T> => (await response.blob()) as T,
};

const error: ResponseHandler = {
    canProcess: () => true,
    process: async (response: Response) => {
        const responseJson = (await response.json()) as Record<string, unknown>;
        const platformError = new CoveoPlatformClientError();
        Object.assign(platformError, responseJson);
        platformError.xRequestId = response.headers.get('X-Request-ID') ?? 'unknown';
        platformError.title = (responseJson.title as string) ?? getErrorTypeFromAliases(responseJson) ?? 'unknown';
        platformError.detail = (responseJson.detail as string) ?? getErrorDetailFromAliases(responseJson) ?? 'unknown';
        platformError.status = response.status;
        throw platformError;
    },
};

const blockedByWAF: ResponseHandler = {
    canProcess: (response) => response.headers.get('x-coveo-waf-action') === 'block',
    process: (response) => {
        const platformError = new CoveoPlatformClientError();
        platformError.xRequestId = response.headers.get('X-Request-ID') ?? 'unknown';
        platformError.title = 'Request blocked for security reasons';
        platformError.detail = 'The web application firewall has identified the request to be potentially malicious.';
        platformError.status = response.status;
        throw platformError;
    },
};

const badGateway: ResponseHandler = {
    canProcess: (response) => response.status === 502,
    process: (response) => {
        const platformError = new CoveoPlatformClientError();
        platformError.xRequestId = response.headers.get('X-Request-ID') ?? 'unknown';
        platformError.title = 'Endpoint unreachable';
        platformError.detail =
            'The service is currently unable to reach the necessary endpoint, likely due to a bad gateway. Please try your request again later.';
        platformError.status = response.status;
        throw platformError;
    },
};

const htmlError: ResponseHandler = {
    canProcess: (response) => response.headers.get('content-type') === 'text/html',
    process: async (response) => {
        const platformError = new CoveoPlatformClientError();
        platformError.xRequestId = response.headers.get('X-Request-ID') ?? 'unknown';
        platformError.title =
            'Unable to process the request. An issue has occurred with the endpoint, and the system is unable to parse the error.';
        platformError.detail = await response.text();
        platformError.status = response.status;
        throw platformError;
    },
};

const errorTypeAliases = ['type', 'errorCode', 'code'];
const getErrorTypeFromAliases = (responseJson: object) => getErrorPropsFromAliases(responseJson, errorTypeAliases);
const errorDetailAliases = ['message'];
const getErrorDetailFromAliases = (responseJson: object) => getErrorPropsFromAliases(responseJson, errorDetailAliases);

const getErrorPropsFromAliases = (responseJson: object, aliasList: string[]): string | null => {
    for (const alias of aliasList) {
        if (alias in responseJson && typeof responseJson[alias] === 'string') {
            return responseJson[alias];
        }
    }
    return null;
};

const defaultResponseHandlers = Object.freeze([noContent, success, blockedByWAF, badGateway, htmlError, error]);

export const ResponseHandlers = Object.freeze({
    noContent,
    success,
    successBlob,
    blockedByWAF,
    badGateway,
    htmlError,
    error,
});

export default async <T>(
    response: Response,
    customHandlers?: readonly ResponseHandler[] | null,
    responseBodyFormat?: ResponseBodyFormat,
): Promise<T> => {
    const handlers = customHandlers?.length ? customHandlers : defaultResponseHandlers;
    const handler = handlers.find(
        (candidate) =>
            Object.prototype.hasOwnProperty.call(candidate, 'canProcess') &&
            Object.prototype.hasOwnProperty.call(candidate, 'process') &&
            candidate.canProcess(response),
    );
    if (!handler) {
        throw new Error('No suitable response handler found');
    }
    return await handler.process<T>(response, responseBodyFormat);
};

/**
 * Represent errors coming from Coveo's API.
 * Follow loosely [RFC-7807](https://www.ietf.org/rfc/rfc7807.html)
 */
export class CoveoPlatformClientError extends Error {
    /**
     * The HTTP X-Request-ID request header is an optional and unofficial HTTP header, used to trace individual HTTP requests from the client to the server and back again.
     * It allows the client and server to correlate each HTTP request.
     */
    xRequestId: string;
    /**
     * A short, human-readable summary of the problem type.
     * It SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization
     */
    title: string;
    /**
     * The HTTP status code ([RFC7231], Section 6) generated by the origin server for this occurrence of the problem.
     */
    status: number;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    detail: string;
}
