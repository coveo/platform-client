import Resource from '../../../Resource';
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
} from './ExportsInterfaces';

export default class Exports extends Resource {
    static baseUrl = '/rest/ua/v15/exports';

    list() {
        return this.api.get<ExportModel[]>(this.buildPath(Exports.baseUrl, {org: this.api.organizationId}));
    }

    generate(params: GenerateExportParams) {
        return this.api.post<ExportModel>(this.buildPath(Exports.baseUrl, {...params, org: this.api.organizationId}));
    }

    get(exportId: string, redirect = false) {
        return this.api.get<ExportModel>(
            this.buildPath(`${Exports.baseUrl}/${exportId}`, {redirect, org: this.api.organizationId})
        );
    }

    getExportDownloadLink(exportId: string) {
        return this.api.get<ExportDownloadLink>(
            this.buildPath(`${Exports.baseUrl}/${exportId}/downloadlink`, {org: this.api.organizationId})
        );
    }

    delete(exportId: string) {
        return this.api.delete<void>(this.buildPath(`${Exports.baseUrl}/${exportId}`, {org: this.api.organizationId}));
    }

    estimateRowsCount(params: EstimateExportParams) {
        return this.api.get<ExportEstimateModel>(
            this.buildPath(`${Exports.baseUrl}/estimate`, {...params, org: this.api.organizationId})
        );
    }

    getStatus() {
        return this.api.get<Record<string, string>>(`${Exports.baseUrl}/status`);
    }

    checkHealth() {
        return this.api.get<Record<string, string>>(`${Exports.baseUrl}/monitoring/health`);
    }

    generateVisitExport(params: GenerateVisitExportParams) {
        return this.api.post<ExportModel>(
            this.buildPath(`${Exports.baseUrl}/visits`, {...params, org: this.api.organizationId})
        );
    }

    estimateVisitExportRowsCount(params: EstimateVisitExportParams) {
        return this.api.get<ExportEstimateModel>(
            this.buildPath(`${Exports.baseUrl}/visits/estimate`, {...params, org: this.api.organizationId})
        );
    }

    listSchedules() {
        return this.api.get<ExportScheduleModel[]>(
            this.buildPath(`${Exports.baseUrl}/schedules`, {org: this.api.organizationId})
        );
    }

    createSchedule(model: CreateExportScheduleModel) {
        return this.api.post<ExportScheduleModel>(
            this.buildPath(`${Exports.baseUrl}/schedules`, {org: this.api.organizationId}),
            model
        );
    }

    getSchedule(exportScheduleId: string) {
        return this.api.get<ExportScheduleModel>(
            this.buildPath(`${Exports.baseUrl}/schedules/${exportScheduleId}`, {org: this.api.organizationId})
        );
    }

    updateSchedule(exportScheduleId: string, model: CreateExportScheduleModel) {
        return this.api.put<ExportScheduleModel>(
            this.buildPath(`${Exports.baseUrl}/schedules/${exportScheduleId}`, {org: this.api.organizationId}),
            model
        );
    }

    deleteSchedule(exportScheduleId: string) {
        return this.api.delete<void>(
            this.buildPath(`${Exports.baseUrl}/schedules/${exportScheduleId}`, {org: this.api.organizationId})
        );
    }
}
