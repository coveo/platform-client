import {ReadServiceHealthApi, ReadServiceHealthResponse, ReadServiceStatusResponse} from '../ReadServiceCommon.js';
import ReadServiceResource from '../ReadServiceResource.js';
import {
    CreateExportScheduleModel,
    EstimateExportParams,
    EstimateVisitExportParams,
    ExportDownloadLink,
    ExportEstimateModel,
    ExportModel,
    ExportScheduleModel,
    GenerateExportParams,
    GenerateExportWithBodyParams,
    GenerateVisitExportParams,
    GenerateVisitExportWithBodyParams,
    RowLimitModel,
} from './ExportsInterfaces.js';

export default class Exports extends ReadServiceResource implements ReadServiceHealthApi {
    static baseUrl = '/rest/ua/v15/exports';

    /**
     * Lists all exports.
     */
    list() {
        return this.api.get<ExportModel[]>(this.buildPathWithOrg(Exports.baseUrl));
    }

    /**
     * Generate an export.
     *
     * @param params The parameters to generate the export with.
     */
    generate(params: GenerateExportParams) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(Exports.baseUrl, params));
    }

    /**
     * Generate an export with the parameters in the request body.
     *
     * @param params The parameters to generate the export with, passed in the request body.
     */
    generateExportWithBody(params: GenerateExportWithBodyParams, args?: RequestInit) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(`${Exports.baseUrl}/create`), params, args);
    }

    /**
     * Get information on an export.
     *
     * @param exportId The export's unique identifier.
     * @param redirect Whether to return a HTTP redirect to the actual file.
     */
    get(exportId: string, redirect = false) {
        return this.api.get<ExportModel>(this.buildPathWithOrg(`${Exports.baseUrl}/${exportId}`, {redirect}));
    }

    /**
     * Get the download link of an export.
     *
     * @param exportId The export's unique identifier.
     */
    getExportDownloadLink(exportId: string) {
        return this.api.get<ExportDownloadLink>(this.buildPathWithOrg(`${Exports.baseUrl}/${exportId}/downloadlink`));
    }

    /**
     * Delete an export.
     *
     * @param exportId The export's unique identifier.
     */
    delete(exportId: string) {
        return this.api.delete<void>(this.buildPathWithOrg(`${Exports.baseUrl}/${exportId}`));
    }

    /**
     * Estimate the number of rows in an export.
     *
     * @param params The date range and other parameters for the export.
     */
    estimateRowsCount(params: EstimateExportParams) {
        return this.api.get<ExportEstimateModel>(this.buildPathWithOrg(`${Exports.baseUrl}/estimate`, params));
    }

    /**
     * Generate a visit export.
     *
     * @param params The parameters to generate the visit export with.
     */
    generateVisitExport(params: GenerateVisitExportParams) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(`${Exports.baseUrl}/visits`, params));
    }

    /**
     * Generate a visit export with the parameters in the request body.
     *
     * @param params The parameters to generate the visit export with, passed in the request body.
     */
    generateVisitExportWithBody(params: GenerateVisitExportWithBodyParams, args?: RequestInit) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(`${Exports.baseUrl}/visits/create`), params, args);
    }

    /**
     * Estimate the number of rows in a visit export.
     *
     * @param params The parameters of the visit export to estimate.
     */
    estimateVisitExportRowsCount(params: EstimateVisitExportParams) {
        return this.api.get<ExportEstimateModel>(this.buildPathWithOrg(`${Exports.baseUrl}/visits/estimate`, params));
    }

    /**
     * Get all the export schedules.
     */
    listSchedules() {
        return this.api.get<ExportScheduleModel[]>(this.buildPathWithOrg(`${Exports.baseUrl}/schedules`));
    }

    /**
     * Create an export schedule.
     *
     * @param model The export schedule to create.
     */
    createSchedule(model: CreateExportScheduleModel) {
        return this.api.post<ExportScheduleModel>(this.buildPathWithOrg(`${Exports.baseUrl}/schedules`), model);
    }

    /**
     * Get information on an export schedule.
     *
     * @param exportScheduleId The export schedule's unique identifier.
     */
    getSchedule(exportScheduleId: string) {
        return this.api.get<ExportScheduleModel>(
            this.buildPathWithOrg(`${Exports.baseUrl}/schedules/${exportScheduleId}`),
        );
    }

    /**
     * Update an existing export schedule.
     *
     * @param exportScheduleId The export schedule's unique identifier.
     */
    updateSchedule(exportScheduleId: string, model: CreateExportScheduleModel) {
        return this.api.put<ExportScheduleModel>(
            this.buildPathWithOrg(`${Exports.baseUrl}/schedules/${exportScheduleId}`),
            model,
        );
    }

    /**
     * Delete an export schedule.
     *
     * @param exportScheduleId The export schedule's unique identifier.
     */
    deleteSchedule(exportScheduleId: string) {
        return this.api.delete<void>(this.buildPathWithOrg(`${Exports.baseUrl}/schedules/${exportScheduleId}`));
    }

    /**
     * Get the export row limit for this org.
     */
    getRowLimit() {
        return this.api.get<RowLimitModel>(this.buildPathWithOrg(`${Exports.baseUrl}/rowLimit`));
    }

    checkHealth() {
        return this.api.get<ReadServiceHealthResponse>(`${Exports.baseUrl}/monitoring/health`);
    }

    checkStatus() {
        return this.api.get<ReadServiceStatusResponse>(`${Exports.baseUrl}/status`);
    }
}
