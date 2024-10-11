import API from '../../../APICore.js';
import CrawlingModule from '../CrawlingModule.js';
import {
    CrawlingModuleDeployment,
    CrawlingModuleLogRequestLogType,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
} from '../CrawlingModuleInterfaces.js';

jest.mock('../../../APICore.js');

describe('Crawling Module Calls', () => {
    let crawlingModule: CrawlingModule;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const crawlingModuleId = 'https://youtu.be/UYpWYIET1uE';

    beforeEach(() => {
        jest.clearAllMocks();
        crawlingModule = new CrawlingModule(api, serverlessApi);
    });

    describe('list', () => {
        it('should list the crawling modules for an org', async () => {
            await crawlingModule.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}`);
        });
    });

    describe('getUpdateStatus', () => {
        it('should get the update status for a given crawling module', async () => {
            await crawlingModule.getUpdateStatus(crawlingModuleId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/${crawlingModuleId}/update`);
        });
    });

    describe('getMaestroVersions', () => {
        it('should get the component versions for the release version of maestro', async () => {
            const options = {
                crawlingModuleVersion: 'v2',
            };
            await crawlingModule.getMaestroVersions(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/latest?crawlingModuleVersion=v2`);
        });

        it('should get the component versions for maestro', async () => {
            await crawlingModule.getMaestroVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/latest`);
        });
    });

    describe('listDatabaseVersions', () => {
        it('should list the database version history', async () => {
            await crawlingModule.listDatabaseVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/database`);
        });
    });

    describe('listWorkerVersions', () => {
        it('should list worker version history', async () => {
            await crawlingModule.listWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/worker`);
        });
    });

    describe('listSecurityWorkerVersions', () => {
        it('should list security worker version', async () => {
            await crawlingModule.listSecurityWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/versions/securityWorker`);
        });
    });

    it('should post a new new crawling module log request', async () => {
        const createModel: CreateCrawlingModuleLogRequestModel = {
            instanceId: 'INSTANCE_ID',
            logType: CrawlingModuleLogRequestLogType.MAESTRO,
            operationId: 'OPERATION_ID',
        };
        await crawlingModule.createLogRequest(crawlingModuleId, createModel);
        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests`,
            createModel,
        );
    });

    it('should get the state of all log requests', async () => {
        await crawlingModule.getLogRequests(crawlingModuleId, CrawlingModuleLogRequestState.SUCCESSFUL);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests?state=SUCCESSFUL`,
        );
    });

    it('should get the download url', async () => {
        const logRequestId = 'LOGREQUEST_ID';
        await crawlingModule.getLogRequestDownload(crawlingModuleId, logRequestId);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `${CrawlingModule.connectivityBaseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`,
        );
    });

    describe('reportDeployment', () => {
        it('should add the deployment', async () => {
            const body: CrawlingModuleDeployment = {
                name: 'test',
                versions: {
                    maestroVersion: '1.1.1',
                },
            };
            await crawlingModule.reportDeployment(crawlingModuleId, body);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/${crawlingModuleId}`, body);
        });
    });

    describe('removeDeployment', () => {
        it('should delete the deployment', async () => {
            await crawlingModule.removeDeployment(crawlingModuleId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CrawlingModule.baseUrl}/${crawlingModuleId}`);
        });
    });
});
