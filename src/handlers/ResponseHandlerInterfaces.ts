import {Predicate} from '../utils/types.js';

export interface ResponseHandler {
    canProcess: Predicate<Response>;
    process<T>(response: Response): Promise<T>;
}
