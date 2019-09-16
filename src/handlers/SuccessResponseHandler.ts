import {IRestResponse} from './HandlerConstants';
import {IRestResponseHandler} from './Handlers';

export class SuccessResponseHandler implements IRestResponseHandler {
    canProcess = (response: Response): boolean => response.status >= 200 && response.status < 300;
    process = async <T>(response: Response): Promise<IRestResponse<T>> => await response.json();
}
