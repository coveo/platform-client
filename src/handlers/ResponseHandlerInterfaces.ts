import {Predicate} from '../utils/types.js';

/**
 * Each format represents one of the [Response object instance methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods).
 */
export type ResponseBodyFormat = 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer';

export interface ResponseHandler {
    /**
     * Whether this handler can process the request.
     */
    canProcess: Predicate<Response>;
    /**
     *
     * @param response The [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) to the request.
     * @param responseBodyFormat The format of the response body that is to be returned from the request.
     */
    process<T>(response: Response, responseBodyFormat?: ResponseBodyFormat): Promise<T>;
}
