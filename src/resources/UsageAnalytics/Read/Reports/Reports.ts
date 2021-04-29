import {ReportType} from '../../../Enums';
import Resource from '../../../Resource';
import {
    CreateReportModel,
    CreateReportResponse,
    GetReportOptions,
    GetReportTemplateOptions,
    ListReportsOptions,
    ListReportsResponse,
    ReportAccessRequest,
    ReportAccessResponse,
    ReportModel,
    TemplateResponse,
    ReportUsersResponse,
    StatusResponse,
    TemplateMetadataResponse,
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

    /**
     * Get a report
     */
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

    /**
     * Get the users and groups who can view a report
     */
    getAccess(reportId: string) {
        return this.api.get<ReportAccessResponse>(
            this.buildPath(`${Reports.baseUrl}/${reportId}/access`, {org: this.api.organizationId})
        );
    }

    /**
     * Set the users and groups who are allowed to view a report
     */
    setAccess(reportId: string, reportAccess: ReportAccessRequest) {
        return this.api.put(
            this.buildPath(`${Reports.baseUrl}/${reportId}/access`, {org: this.api.organizationId}),
            reportAccess
        );
    }

    /**
     * Get the users who can view a report
     */
    getUsers(reportId: string) {
        return this.api.get<ReportUsersResponse>(
            this.buildPath(`${Reports.baseUrl}/${reportId}/users`, {org: this.api.organizationId})
        );
    }

    /**
     * Set the users who are allowed to view a report
     */
    setUsers(reportId: string, userIds: string[]) {
        return this.api.put(
            this.buildPath(`${Reports.baseUrl}/${reportId}/users`, {org: this.api.organizationId}),
            userIds
        );
    }

    /**
     * Health check for the reports service
     */
    healthcheck() {
        return this.api.get<StatusResponse>(
            this.buildPath(`${Reports.baseUrl}/monitoring/health`, {org: this.api.organizationId})
        );
    }

    /**
     * Get a report template
     */
    getReportTemplate(templateId: string, options: GetReportTemplateOptions = {}) {
        return this.api.get<TemplateResponse[]>(this.buildPath(`${Reports.baseUrl}/templates/${templateId}`, options));
    }

    /**
     * Get metadata about available report templates
     */
    listReportTemplates(type: ReportType, options: GetReportTemplateOptions = {}) {
        return this.api.get<TemplateMetadataResponse[]>(
            this.buildPath(`${Reports.baseUrl}/templates`, {...options, type})
        );
    }

    /**
     * Get the reports service status
     */
    getServiceStatus() {
        return this.api.get<StatusResponse>(
            this.buildPath(`${Reports.baseUrl}/status`, {org: this.api.organizationId})
        );
    }
}
