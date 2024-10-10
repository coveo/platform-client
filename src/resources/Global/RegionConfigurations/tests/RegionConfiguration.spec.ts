import API from '../../../../APICore.js';
import RegionConfiguration from '../RegionConfiguration.js';

jest.mock('../../../../APICore.js');

describe('RegionConfiguration', () => {
    let regionConfiguration: RegionConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        regionConfiguration = new RegionConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to "/global/regions"', async () => {
            await regionConfiguration.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/regions');
        });
    });

    describe('get', () => {
        it('should make a GET call to "/global/regions/:region"', async () => {
            await regionConfiguration.get('🥵');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/regions/🥵');
        });
    });
});
