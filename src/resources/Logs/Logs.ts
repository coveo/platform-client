import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    FacetsModel,
    FacetsWithCountsModel,
    GetFacetsParams,
    GetLogsOrFacetsRequestBodyModel,
    GetLogsParams,
    LogsModel,
} from './LogsInterfaces.js';

export default class Logs extends Resource {
    static baseUrl = `/logs/v1/organizations/${API.orgPlaceholder}`;

    get(params: GetLogsParams, options: GetLogsOrFacetsRequestBodyModel) {
        return this.serverlessApi.post<LogsModel>(this.buildPath(Logs.baseUrl, params), options);
    }

    getFacets(params: GetFacetsParams, options: GetLogsOrFacetsRequestBodyModel) {
        return this.serverlessApi.post<FacetsModel>(this.buildPath(`${Logs.baseUrl}/facets`, params), options);
    }

    getFacetsStats(params: GetFacetsParams, options: GetLogsOrFacetsRequestBodyModel) {
        return this.serverlessApi.post<FacetsWithCountsModel>(
            this.buildPath(`${Logs.baseUrl}/facetsStats`, params),
            options
        );
    }
}
