import API from '../../../APICore.js';
import CrawlingModule from '../CrawlingModule.js';
import {
    CrawlingModuleDeployment,
    CrawlingModuleLogRequestLogType,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
} from '../CrawlingModuleInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Crawling Module Calls', () => {
    let crawlingModule: CrawlingModule;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const crawlingModuleId = 'https://youtu.be/UYpWYIET1uE';

    beforeEach(() => {
        jest.clearAllMocks();
        crawlingModule = new CrawlingModule(api, serverlessApi);
    });

    describe('list', () => {
        it('should list the crawling modules for an org', () => {
            crawlingModule.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}`);
        });
    });

    describe('getUpdateStatus', () => {
        it('should get the update status for a given crawling module', () => {
            crawlingModule.getUpdateStatus(crawlingModuleId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/${crawlingModuleId}/update`);
        });
    });

    describe('getMaestroVersions', () => {
        it('should get the component versions for the release version of maestro', () => {
            const options = {
                crawlingModuleVersion: 'v2',
            };
            crawlingModule.getMaestroVersions(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/latest?crawlingModuleVersion=v2`);
        });

        it('should get the component versions for maestro', () => {
            crawlingModule.getMaestroVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/latest`);
        });
    });

    describe('listDatabaseVersions', () => {
        it('should list the database version history', () => {
            crawlingModule.listDatabaseVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/database`);
        });
    });

    describe('listWorkerVersions', () => {
        it('should list worker version history', () => {
            crawlingModule.listWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/worker`);
        });
    });

    describe('listSecurityWorkerVersions', () => {
        it('should list security worker version', () => {
            crawlingModule.listSecurityWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/securityWorker`);
        });
    });

    it('should post a new new crawling module log request', () => {
        const createModel: CreateCrawlingModuleLogRequestModel = {
            instanceId: 'INSTANCE_ID',
            logType: CrawlingModuleLogRequestLogType.MAESTRO,
            operationId: 'OPERATION_ID',
        };
        crawlingModule.createLogRequest(crawlingModuleId, createModel);
        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests`,
            createModel
        );
    });

    it('should get the state of all log requests', () => {
        crawlingModule.getLogRequests(crawlingModuleId, CrawlingModuleLogRequestState.SUCCESSFUL);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests?state=SUCCESSFUL`
        );
    });

    it('should get the download url', () => {
        const logRequestId = 'LOGREQUEST_ID';
        crawlingModule.getLogRequestDownload(crawlingModuleId, logRequestId);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`
        );
    });

    it('should report the deployment', () => {
        const options: CrawlingModuleDeployment = {
            name: '',
            status: {
                usingProxy: false,
                autoUpdateEnable: false,
                logRequestsEnabled: false,
                autoUpdateFrequency: 0,
                numberOfCrawlerWorkers: 0,
                numberOfSecurityWorkers: 0,
            },
            versions: {
                maestroVersion: 'TO DO',
            },
        };
        crawlingModule.reportDeployment(crawlingModuleId, options);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}`);
        // TODO some more validation?
    });

    it('should remove the deployment', () => {
        crawlingModule.removeDeployment(crawlingModuleId);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}`);
        // TODO validate that something was removed?
    });
});
