import {IRestResponse} from './HandlerConstants';
import {IRestResponseHandler} from './Handlers';

export class NoContentResponseHandler implements IRestResponseHandler {
    canProcess = (response: Response): boolean => response.status === 204;
    process = async <T>(): Promise<IRestResponse<T>> => ({});
}
