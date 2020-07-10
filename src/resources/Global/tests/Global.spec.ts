import API from '../../../APICore';
import Global from '../Global';
import OrganizationConfiguration from '../OrganizationConfigurations/OrganizationConfiguration';
import RegionConfiguration from '../RegionConfigurations/RegionConfiguration';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Global', () => {
    let global: Global;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        global = new Global(api);
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
