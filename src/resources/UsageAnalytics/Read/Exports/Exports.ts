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
    GenerateVisitExportParams,
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
     */
    generate(params: GenerateExportParams) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(Exports.baseUrl, params));
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
     */
    estimateRowsCount(params: EstimateExportParams) {
        return this.api.get<ExportEstimateModel>(this.buildPathWithOrg(`${Exports.baseUrl}/estimate`, params));
    }

    /**
     * Generate a visit export.
     */
    generateVisitExport(params: GenerateVisitExportParams) {
        return this.api.post<ExportModel>(this.buildPathWithOrg(`${Exports.baseUrl}/visits`, params));
    }

    /**
     * Estimate the number of rows in a visit export.
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
            this.buildPathWithOrg(`${Exports.baseUrl}/schedules/${exportScheduleId}`)
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
            model
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

    checkHealth() {
        return this.api.get<ReadServiceHealthResponse>(`${Exports.baseUrl}/monitoring/health`);
    }

    checkStatus() {
        return this.api.get<ReadServiceStatusResponse>(`${Exports.baseUrl}/status`);
    }
}
