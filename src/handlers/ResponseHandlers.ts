import {ResponseHandler} from './ResponseHandlerInterfaces.js';

const noContent: ResponseHandler = {
    canProcess: (response: Response): boolean => response.status === 204,
    process: async <T>(): Promise<T> => ({} as T),
};

const success: ResponseHandler = {
    canProcess: (response: Response): boolean => response.ok,
    process: async <T>(response: Response): Promise<T> => await response.json(),
};

const successBlob: ResponseHandler = {
    canProcess: (response: Response): boolean => response.ok,
    process: async <T>(response: Response): Promise<T> => await (response.blob() as any),
};

const error: ResponseHandler = {
    canProcess: () => true,
    process: async <T>(response: Response): Promise<T> => {
        const responseJson = await response.json();
        const platformError = new CoveoPlatformClientError();
        Object.assign(platformError, responseJson);
        platformError.xRequestId = response.headers.get('X-Request-ID') ?? 'unknown';
        throw platformError;
    },
};

export const defaultResponseHandlers = [noContent, success, error];
export const ResponseHandlers = {noContent, success, successBlob, error};

export default <T>(response: Response, handlers = defaultResponseHandlers) =>
    handlers.filter((handler) => handler.canProcess(response))[0].process<T>(response);

export class CoveoPlatformClientError extends Error {
    /**
     * The HTTP X-Request-ID request header is an optional and unofficial HTTP header, used to trace individual HTTP requests from the client to the server and back again.
     * It allows the client and server to correlate each HTTP request.
     */
    xRequestId: string;
}
