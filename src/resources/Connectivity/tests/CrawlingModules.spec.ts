import API from '../../../APICore';
import {
    CrawlingModuleLogRequestLogType,
    CrawlingModuleLogRequestState,
    CreateCrawlingModuleLogRequestModel,
} from '../ConnectivityInterface';
import CrawlingModules from '../CrawlingModules';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Connectivity Service', () => {
    let crawlingModules: CrawlingModules;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        crawlingModules = new CrawlingModules(api, serverlessApi);
    });

    describe('diagnostic', () => {
        const crawlingModuleId = 'CRAWLING_MODULE_ID';

        it('should post a new new crawling module log request', () => {
            const createModel: CreateCrawlingModuleLogRequestModel = {
                instanceId: 'INSTANCE_ID',
                logType: CrawlingModuleLogRequestLogType.MAESTRO,
                operationId: 'OPERATION_ID',
            };
            crawlingModules.createLogRequest(crawlingModuleId, createModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests`,
                createModel
            );
        });

        it('should get the state of all log requests', () => {
            crawlingModules.getLogRequests(crawlingModuleId, CrawlingModuleLogRequestState.SUCCESSFUL);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests?state=SUCCESSFUL`
            );
        });

        it('should get the download url', () => {
            const logRequestId = 'LOGREQUEST_ID';
            crawlingModules.getLogRequestDownload(crawlingModuleId, logRequestId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${CrawlingModules.baseUrl}/${crawlingModuleId}/logrequests/${logRequestId}/download`
            );
        });
    });
});
