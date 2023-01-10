import Resource from '../../Resource.js';
import {
    TableauDashboardParams,
    TableauDashboardResponse,
    TableauDashboardViewParams,
    TableauReportParams,
    TableauReportResponse,
} from './ContentQueryInterfaces.js';

export default class ContentQuery extends Resource {
    static baseUrl = '/rest/organizations';

    listTableauReports(params: TableauReportParams) {
        return this.api.get<TableauReportResponse[]>(
            this.buildPath(`${ContentQuery.baseUrl}/${params.organizationId}/tableau/${params.contentType}`, {})
        );
    }

    getTableauDashboard(params: TableauDashboardParams) {
        return this.api.get<TableauDashboardResponse>(
            this.buildPath(
                `${ContentQuery.baseUrl}/${params.organizationId}/tableau/${params.contentType}/${params.dashboardContentUrl}`,
                {}
            )
        );
    }

    getTableauDashboardView(params: TableauDashboardViewParams) {
        return this.api.get<TableauDashboardResponse>(
            this.buildPath(
                `${ContentQuery.baseUrl}/${params.organizationId}/tableau/${params.contentType}/${params.dashboardContentUrl}/${params.viewContentUrl}`,
                {}
            )
        );
    }
}
