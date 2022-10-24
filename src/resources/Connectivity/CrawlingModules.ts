import Resource from '../Resource';
import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import {
    CrawlingModuleLogRequestDownloadModel,
    CrawlingModuleLogRequestModel,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
} from './ConnectivityInterface';

export default class CrawlingModules extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/crawlingmodules`;

    getLogRequests(crawlingModuleId: string, requestState: CrawlingModuleLogRequestState) {
        return this.api.get<PageModel<CrawlingModuleLogRequestModel>>(
            this.buildPath(`${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests`, {state: requestState})
        );
    }

    createLogRequest(crawlingModuleId: string, requestModel: CreateCrawlingModuleLogRequestModel) {
        return this.api.post<CreateCrawlingModuleLogRequestModel>(
            `${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests`,
            requestModel
        );
    }

    getLogRequestDownload(crawlingModuleId: string, logRequestId: string) {
        return this.api.get<CrawlingModuleLogRequestDownloadModel>(
            `${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`
        );
    }
}
