import {IRestResponse} from './HandlerConstants';
import {IRestResponseHandler} from './Handlers';

export class UnauthorizedResponseError extends Error {
    constructor() {
        super(
            'The request was aborted because the current user does not have access to the service. You will be redirected soon.'
        );
    }
}

export class UnauthorizedResponseHandler implements IRestResponseHandler {
    canProcess = (response: Response): boolean => response.status === 403;
    process = async <T>(response: Response): Promise<IRestResponse<T>> => {
        throw new UnauthorizedResponseError();
    };
}
