import API from '../../../../APICore.js';
import OrganizationEndpointsUsage from '../OrganizationMonitoring.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('OrganizationEndpointUsage', () => {
    let organizationEndpointUsage: OrganizationEndpointsUsage;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        organizationEndpointUsage = new OrganizationEndpointsUsage(api, serverlessApi);
    });

    describe('getEndpointsUage', () => {
        it('should make a GET call to "/rest/monitoring/global/organizations/:organizationId/endpoints/usage"', () => {
            organizationEndpointUsage.get('🥵');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/monitoring/global/organizations/🥵/endpoints/usage');
        });
    });
});
