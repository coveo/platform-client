import API from '../../../APICore';
import Access from '../Access';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('OrganizationAccess', () => {
    let organizationAccess: Access;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        organizationAccess = new Access(api, serverlessApi);
    });

    describe('getApiKeys', () => {
        const params = {
            accessLevel: ['CUSTOM'],
            privilegeOwner: 'PLATFORM',
            privilegeTargetDomain: 'SOURCE',
        };

        it('should make a GET call to the specific organization access url for API keys', () => {
            organizationAccess.getApiKeys(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Access.baseUrl}/apikeys?accessLevel=CUSTOM&privilegeOwner=PLATFORM&privilegeTargetDomain=SOURCE`
            );
        });

        it('should make a GET call to the specific organization access url for groups data', () => {
            organizationAccess.getGroups(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Access.baseUrl}/groups?accessLevel=CUSTOM&privilegeOwner=PLATFORM&privilegeTargetDomain=SOURCE`
            );
        });
    });
});
