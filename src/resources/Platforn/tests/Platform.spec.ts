import API from '../../../APICore';
import Platform from '../Platform';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Platform', () => {
    let platform: Platform;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        platform = new Platform(api);
    });

    describe('getCrawlingModules', () => {
        it('should list the crawling modules for an org', () => {
            platform.getCrawlingModules();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}`);
        });
    });

    describe('getUpdateStatus', () => {
        it('should get the update status for a given crawling module', () => {
            const crawlingModuleId = 'someCrawlingModule-1d3e4r5t';
            platform.getUpdateStatus(crawlingModuleId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/${crawlingModuleId}/update`);
        });
    });

    describe('getMaestroVersions', () => {
        it('should get the component versions for the release version of maestro', () => {
            const options = {
                crawlingModuleVersion: 'v2',
            };
            platform.getMaestroVersions(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/versions/latest?crawlingModuleVersion=v2`);
        });

        it('should get the component versions for maestro', () => {
            platform.getMaestroVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/versions/latest`);
        });
    });

    describe('listDatabaseVersions', () => {
        it('should list the database version history', () => {
            platform.listDatabaseVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/versions/database`);
        });
    });

    describe('listWorkerVersions', () => {
        it('should list worker version history', () => {
            platform.listWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/versions/worker`);
        });
    });

    describe('listSecurityWorkerVersions', () => {
        it('should list security worker version', () => {
            platform.listSecurityWorkerVersions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Platform.baseUrl}/versions/securityWorker`);
        });
    });
});
