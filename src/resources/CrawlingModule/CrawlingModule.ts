import API from '../../APICore';
import Resource from '../Resource';
import {ComponentVersion, CrawlingModuleEntity, MaestroVersionOptions, UpdateStatus} from './CrawlingModuleInterfaces';

export default class CrawlingModule extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/crawlingmodule`;

    getCrawlingModules() {
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
}
