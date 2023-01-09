import API from '../../../../APICore.js';
import RegionConfiguration from '../RegionConfiguration.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('RegionConfiguration', () => {
    let regionConfiguration: RegionConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        regionConfiguration = new RegionConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to "/global/regions"', () => {
            regionConfiguration.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/regions');
        });
    });

    describe('get', () => {
        it('should make a GET call to "/global/regions/:region"', () => {
            regionConfiguration.get('🥵');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/regions/🥵');
        });
    });
});
