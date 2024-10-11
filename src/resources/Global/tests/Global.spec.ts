import API from '../../../APICore.js';
import Global from '../Global.js';
import OrganizationConfiguration from '../OrganizationConfigurations/OrganizationConfiguration.js';
import RegionConfiguration from '../RegionConfigurations/RegionConfiguration.js';

jest.mock('../../../APICore.js');

describe('Global', () => {
    let global: Global;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        global = new Global(api, serverlessApi);
    });

    it('should register the region resource', () => {
        expect(global.region).toBeDefined();
        expect(global.region).toBeInstanceOf(RegionConfiguration);
    });

    it('should register the organizations resource', () => {
        expect(global.organization).toBeDefined();
        expect(global.organization).toBeInstanceOf(OrganizationConfiguration);
    });
});
