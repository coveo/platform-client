import Resource from '../../../Resource';
import {
    EstimateExportParams,
    EstimateVisitExportParams,
    ExportEstimateModel,
    ExportModel,
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
}
