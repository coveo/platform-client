import Resource from '../../../Resource';
import {
    CreateReportModel,
    CreateReportResponse,
    GetReportOptions,
    ListReportsOptions,
    ListReportsResponse,
    ReportModel,
    UpdateReportModel,
} from './ReportsInterfaces';

export default class Reports extends Resource {
    static baseUrl = '/rest/ua/v15/reports';

    /**
     * Get the persisted reports of one or all types
     */
    list(options: ListReportsOptions = {}) {
        return this.api.get<ListReportsResponse>(
            this.buildPath(Reports.baseUrl, {
                org: this.api.organizationId,
                type: options.type,
                includeConfig: options.includeConfig,
            })
        );
    }

    get(id: string, options: GetReportOptions = {}) {
        return this.api.get<ReportModel>(
            this.buildPath(`${Reports.baseUrl}/${id}`, {org: this.api.organizationId, tz: options.tz})
        );
    }

    /**
     * Create a report
     */
    create(report: CreateReportModel) {
        return this.api.post<CreateReportResponse>(
            this.buildPath(Reports.baseUrl, {org: this.api.organizationId}),
            report
        );
    }

    /**
     * Update a report
     */
    update(id: string, report: UpdateReportModel) {
        return this.api.put<UpdateReportModel>(
            this.buildPath(`${Reports.baseUrl}/${id}`, {org: this.api.organizationId}),
            report
        );
    }

    /**
     * Delete a report
     */
    delete(id: string) {
        return this.api.delete(this.buildPath(`${Reports.baseUrl}/${id}`, {org: this.api.organizationId}));
    }
}
