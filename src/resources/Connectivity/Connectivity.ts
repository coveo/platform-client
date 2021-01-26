import Resource from '../Resource';
import API from '../../APICore';
import {LogRequestState} from './ConnectivityInterface';

export default class Connectivity extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    requestLog(sourceId: string, activityId: string) {
        return this.api.post(`${Connectivity.baseUrl}/${sourceId}/diagnostics/${activityId}/logs`);
    }

    getLogRequestState(sourceId: string, activityId) {
        return this.api.get<LogRequestState>(`${Connectivity.baseUrl}/${sourceId}/diagnostics/${activityId}/state`);
    }
}
