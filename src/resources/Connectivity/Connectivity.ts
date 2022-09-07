import Resource from '../Resource';
import API from '../../APICore';
import {LogRequest, LogRequestId, LogRequestResourceType, LogRequestResult} from './ConnectivityInterface';

export default class Connectivity extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/logrequests`;

    requestLog(body: LogRequest, type?: LogRequestResourceType) {
        const url = type ? this.buildPath(Connectivity.baseUrl, type) : Connectivity.baseUrl;
        return this.api.post<LogRequestId>(url, body);
    }

    getLogRequestState(logRequestId: string) {
        return this.api.get<LogRequestResult>(`${Connectivity.baseUrl}/${logRequestId}`);
    }
}
