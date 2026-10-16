import {Predicate} from '../../utils/types.js';

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

/**
 * A single error entry returned in the `details` array of a Coveo Platform API error response.
 */
export interface PlatformErrorDetail {
    /**
     * A code identifying the type of this error entry, for example `INVALID_PARAMETER`.
     */
    errorCode: string;
    /**
     * A human-readable explanation of this error entry.
     */
    message: string;
}

/**
 * The JSON body returned by the Coveo Platform API when a request fails.
 */
export interface PlatformErrorResponse {
    /**
     * A human-readable explanation of the error.
     */
    message: string;
    /**
     * A code identifying the type of error, for example `ORGANIZATION_ALREADY_EXISTS`.
     */
    errorCode: string;
    /**
     * The unique identifier of the request that failed, useful when contacting Coveo support.
     */
    requestID: string;
    /**
     * Error messages grouped by key, for example by resource type.
     */
    errorMessages?: Record<string, string[]>;
    /**
     * Additional errors that caused the request to fail, for example one per invalid parameter.
     */
    details?: PlatformErrorDetail[];
}
