import API from '../../APICore';
import Resource from '../Resource';
import {ComponentVersion, CrawlingModule, MaestroVersionOptions, UpdateStatus} from './PlatformInterfaces';

export default class Platform extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/crawlingmodule`;

    getCrawlingModules() {
        return this.api.get<CrawlingModule[]>(Platform.baseUrl);
    }

    getUpdateStatus(crawlingModuleId: string) {
        return this.api.get<UpdateStatus>(`${Platform.baseUrl}/${crawlingModuleId}/update`);
    }

    getMaestroVersions(options?: MaestroVersionOptions) {
        return this.api.get<ComponentVersion>(this.buildPath(`${Platform.baseUrl}/versions/latest`, options));
    }

    listDatabaseVersions() {
        return this.api.get(`${Platform.baseUrl}/versions/database`);
    }

    listWorkerVersions() {
        return this.api.get(`${Platform.baseUrl}/versions/worker`);
    }

    listSecurityWorkerVersions() {
        return this.api.get(`${Platform.baseUrl}/versions/securityWorker`);
    }
}
