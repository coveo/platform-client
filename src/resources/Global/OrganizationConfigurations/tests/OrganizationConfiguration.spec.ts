import API from '../../../../APICore';
import OrganizationConfiguration from '../OrganizationConfiguration';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('OrganizationConfiguration', () => {
    let organizationConfiguration: OrganizationConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        organizationConfiguration = new OrganizationConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to "/global/organizations"', () => {
            organizationConfiguration.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/organizations');
        });
    });

    describe('get', () => {
        it('should make a GET call to "/global/organizations/:organizationId"', () => {
            organizationConfiguration.get('🥵');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/organizations/🥵');
        });
    });
});
