import Resource from '../Resource';
import API from '../../APICore';
import {LogRequest, LogRequestId, LogRequestResult} from './ConnectivityInterface';

export default class Connectivity extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/logrequests`;

    requestLog(body: LogRequest) {
        return this.api.post<LogRequestId>(Connectivity.baseUrl, body);
    }

    getLogRequestState(logRequestId: string) {
        return this.api.get<LogRequestResult>(`${Connectivity.baseUrl}/${logRequestId}`);
    }
}
