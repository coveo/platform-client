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
        throw await response.json();
    },
};

export const defaultResponseHandlers = [noContent, success, error];
export const ResponseHandlers = {noContent, success, successBlob, error};

export default <T>(response: Response, handlers = defaultResponseHandlers) =>
    handlers.filter((handler) => handler.canProcess(response))[0].process<T>(response);
