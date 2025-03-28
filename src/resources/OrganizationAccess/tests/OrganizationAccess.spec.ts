import API from '../../../APICore.js';
import {AccessLevel} from '../../Enums.js';
import Access from '../Access.js';
import {AccessParams} from '../AccessInterfaces.js';

jest.mock('../../../APICore.js');

describe('OrganizationAccess', () => {
    let organizationAccess: Access;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        organizationAccess = new Access(api, serverlessApi);
    });

    describe('getApiKeys', () => {
        const params: AccessParams = {
            accessLevel: [AccessLevel.CUSTOM],
            privilegeOwner: 'PLATFORM',
            privilegeTargetDomain: 'SOURCE',
        };

        it('should make a GET call to the specific organization access url for API keys', async () => {
            await organizationAccess.getApiKeys(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Access.baseUrl}/apikeys?accessLevel=CUSTOM&privilegeOwner=PLATFORM&privilegeTargetDomain=SOURCE`,
            );
        });

        it('should make a GET call to the specific organization access url for groups data', async () => {
            await organizationAccess.getGroups(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Access.baseUrl}/groups?accessLevel=CUSTOM&privilegeOwner=PLATFORM&privilegeTargetDomain=SOURCE`,
            );
        });
    });

    describe('list', () => {
        it('makes a GET call to the specific organization access url for temporary access', async () => {
            await organizationAccess.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/access/temporary`);
        });
    });

    describe('get', () => {
        it('makes a GET call to the specific organization access url for temporary access with id', async () => {
            const temporaryAccessId = '12345';
            await organizationAccess.get(temporaryAccessId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/access/temporary/${temporaryAccessId}`,
            );
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to the specific organization access url for temporary access with id', async () => {
            const temporaryAccessId = '12345';
            await organizationAccess.delete(temporaryAccessId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/access/temporary/${temporaryAccessId}`,
            );
        });
    });
});
