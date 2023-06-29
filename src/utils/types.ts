import {ResponseBodyFormat} from '../handlers/ResponseHandlerInterfaces.js';

export interface AsyncSupplier<T> {
    (): Promise<T>;
}

export interface Supplier<T> {
    (): T;
}

export interface Predicate<T> {
    (value: T): boolean;
}

export interface CoveoPlatformClientRequestInit extends Omit<RequestInit, 'method'> {
    responseBodyFormat?: ResponseBodyFormat;
}
