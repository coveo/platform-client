import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    ComponentVersion,
    CrawlingModuleEntity,
    CrawlingModuleLogRequestDownloadModel,
    CrawlingModuleLogRequestModel,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
    MaestroVersionOptions,
    UpdateStatus,
} from './CrawlingModuleInterfaces.js';
import {PageModel} from '../BaseInterfaces.js';

export default class CrawlingModule extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/crawlingmodule`;
    static connectivityBaseUrl = `/rest/organizations/${API.orgPlaceholder}/crawlingmodules`;

    list() {
        return this.api.get<CrawlingModuleEntity[]>(CrawlingModule.baseUrl);
    }

    getUpdateStatus(crawlingModuleId: string) {
        return this.api.get<UpdateStatus>(`${CrawlingModule.baseUrl}/${crawlingModuleId}/update`);
    }

    getMaestroVersions(options?: MaestroVersionOptions) {
        return this.api.get<ComponentVersion>(this.buildPath(`${CrawlingModule.baseUrl}/versions/latest`, options));
    }

    listDatabaseVersions() {
        return this.api.get<string[]>(`${CrawlingModule.baseUrl}/versions/database`);
    }

    listWorkerVersions() {
        return this.api.get<string[]>(`${CrawlingModule.baseUrl}/versions/worker`);
    }

    listSecurityWorkerVersions() {
        return this.api.get<string[]>(`${CrawlingModule.baseUrl}/versions/securityWorker`);
    }

    getLogRequests(crawlingModuleId: string, requestState: CrawlingModuleLogRequestState) {
        return this.api.get<PageModel<CrawlingModuleLogRequestModel>>(
            this.buildPath(`${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests`, {
                state: requestState,
            })
        );
    }

    createLogRequest(crawlingModuleId: string, requestModel: CreateCrawlingModuleLogRequestModel) {
        return this.api.post<CrawlingModuleLogRequestModel>(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests`,
            requestModel
        );
    }

    getLogRequestDownload(crawlingModuleId: string, logRequestId: string) {
        return this.api.get<CrawlingModuleLogRequestDownloadModel>(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`
        );
    }
}
