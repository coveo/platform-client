import API from '../../../APICore';
import CrawlingModule from '../CrawlingModule';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Crawling Module Calls', () => {
    let crawlingModule: CrawlingModule;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        crawlingModule = new CrawlingModule(api);
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
            const crawlingModuleId = 'someCrawlingModule-1d3e4r5t';
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
});
