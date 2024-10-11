import API from '../../../../APICore.js';
import OrganizationConfiguration from '../OrganizationConfiguration.js';

jest.mock('../../../../APICore.js');

describe('OrganizationConfiguration', () => {
    let organizationConfiguration: OrganizationConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        organizationConfiguration = new OrganizationConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to "/global/organizations"', async () => {
            await organizationConfiguration.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/organizations');
        });
    });

    describe('get', () => {
        it('should make a GET call to "/global/organizations/:organizationId"', async () => {
            await organizationConfiguration.get('🥵');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/global/organizations/🥵');
        });
    });
});
