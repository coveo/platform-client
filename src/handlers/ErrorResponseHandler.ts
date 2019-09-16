import {IRestResponse} from './HandlerConstants';
import {IRestResponseHandler} from './Handlers';

export class ErrorResponseHandler implements IRestResponseHandler {
    canProcess = () => true;
    process = async <T>(response: Response): Promise<IRestResponse<T>> => {
        const errorResponse = {
            error: await response.json(),
        };
        console.error(errorResponse);
        return errorResponse;
    };
}
