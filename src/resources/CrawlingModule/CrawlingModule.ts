import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    ComponentVersion,
    CrawlingModuleDeployment,
    CrawlingModuleEntity,
    CrawlingModuleLogRequestDownloadModel,
    CrawlingModuleLogRequestModel,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
    MaestroVersionOptions,
    UpdateStatus,
} from './CrawlingModuleInterfaces.js';

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
            }),
        );
    }

    createLogRequest(crawlingModuleId: string, requestModel: CreateCrawlingModuleLogRequestModel) {
        return this.api.post<CrawlingModuleLogRequestModel>(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests`,
            requestModel,
        );
    }

    getLogRequestDownload(crawlingModuleId: string, logRequestId: string) {
        return this.api.get<CrawlingModuleLogRequestDownloadModel>(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`,
        );
    }

    reportDeployment(crawlingModuleId: string, body: CrawlingModuleDeployment) {
        return this.api.put<CrawlingModuleEntity>(`${CrawlingModule.baseUrl}/${crawlingModuleId}`, body);
    }

    removeDeployment(crawlingModuleId: string) {
        return this.api.delete(`${CrawlingModule.baseUrl}/${crawlingModuleId}`);
    }

    /**
     * Create a new log request for the specified crawling module, requesting all logs. Warning: the resulting archive might be large. If the log archive is more than 5GB the request will fail.
     * @param crawlingModuleId The ID of the crawling module
     * @returns The crawling module log request
     */
    createAllAvailableLogsRequest(crawlingModuleId: string) {
        return this.api.post<CrawlingModuleLogRequestModel>(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/all`,
        );
    }

    /**
     * Create a new log request for the specified crawling module, requesting all logs associated with an instance id (source id or provider id). Warning: the resulting archive might be large. If the log archive is more than 5GB the request will fail.
     * @param crawlingModuleId The ID of the crawling module
     * @param instanceId The instance ID (source ID or provider ID) for which to retrieve logs.
     * @returns The crawling module log request
     */
    createAllAvailableLogsRequestForInstance(crawlingModuleId: string, instanceId: string) {
        return this.api.post<CrawlingModuleLogRequestModel>(
            this.buildPath(`${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/instance`, {
                instanceId,
            }),
        );
    }
}
