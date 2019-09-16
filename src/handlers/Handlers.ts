import {ErrorResponseHandler} from './ErrorResponseHandler';
import {IRestResponse} from './HandlerConstants';
import {NoContentResponseHandler} from './NoContentResponseHandler';
import {SuccessResponseHandler} from './SuccessResponseHandler';
import {UnauthorizedResponseHandler} from './UnauthorizedResponseHandler';

export interface IRestResponseHandler {
    canProcess(response: Response): boolean;
    process<T>(response: Response): Promise<IRestResponse<T>>;
}

export const Handlers: IRestResponseHandler[] = [
    new UnauthorizedResponseHandler(),
    new NoContentResponseHandler(),
    new SuccessResponseHandler(),
    new ErrorResponseHandler(),
];
