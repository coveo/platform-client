import {SecurityCacheMemberModel} from '..';
import API from '../../../APICore';
import {PermissionIdentityType} from '../../Enums';
import SecurityCache from '../SecurityCache';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('securityCache', () => {
    let securityCache: SecurityCache;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        securityCache = new SecurityCache(api, serverlessApi);
    });

    describe('list', () => {
        const providerId = 'PROVIDER_ID';

        it('should make a GET call to the securityCache correct url with listMembers', () => {
            securityCache.listMembers(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/${providerId}/members`);
        });

        it('should make a GET call to the securityCache correct url with listEntities', () => {
            securityCache.listEntities(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/${providerId}`);
        });

        it('should make a GET call to the securityProvider url with listProvider', () => {
            securityCache.listProviders();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(SecurityCache.providersUrl);
        });
    });

    describe('listChildren', () => {
        it('makes a POST call to the security cache member children endpoint', () => {
            const memberModel: SecurityCacheMemberModel = {
                name: '🚣🏻‍♀️',
                type: PermissionIdentityType.User,
                provider: '🎲',
                infos: [],
            };
            securityCache.listChildren('🌶', memberModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/children`,
                memberModel
            );
        });

        it('specifies the right query parameters in the url if any', () => {
            securityCache.listChildren('🌶', {} as SecurityCacheMemberModel, {page: 1, perPage: 20, recursive: true});

            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/children?page=1&perPage=20&recursive=true`,
                expect.anything()
            );
        });
    });

    describe('listParents', () => {
        it('makes a POST call to the security cache member parents endpoint', () => {
            const memberModel: SecurityCacheMemberModel = {
                name: '🚣🏻‍♀️',
                type: PermissionIdentityType.User,
                provider: '🎲',
                infos: [],
            };
            securityCache.listParents('🌶', memberModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/parents`,
                memberModel
            );
        });

        it('specifies the right query parameters in the url if any', () => {
            securityCache.listParents('🌶', {} as SecurityCacheMemberModel, {page: 1, perPage: 20, recursive: true});

            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/parents?page=1&perPage=20&recursive=true`,
                expect.anything()
            );
        });
    });

    describe('schedules', () => {
        it('should make a GET call to the specific securityCache url to fetch the schedules', () => {
            securityCache.listSchedules();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/schedules`);
        });

        it('should make a GET call to the specific securityProvider url to fetch the schedules', () => {
            securityCache.providerSchedules();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/schedules`);
        });
    });

    describe('refresh', () => {
        it('should make a POST call to the securityCache refreshCache url', () => {
            securityCache.refreshCache();
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/refresh`);
        });

        it('should make a POST call to the security Provider refresh url', () => {
            securityCache.refreshProvider('PROVIDER_ID');
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/PROVIDER_ID/refresh`);
        });

        it('should make a POST call to the security Identity refresh url', () => {
            const identityModel: SecurityCacheMemberModel = {
                infos: [
                    {
                        key: '🗝',
                        value: '💰',
                    },
                ],
                name: '📜',
                provider: '📥',
                type: PermissionIdentityType.Group,
            };
            securityCache.refreshIdentity(identityModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/refresh/entity`, identityModel);
        });
    });

    describe('status', () => {
        it('should make a get call to the specific securityCache url to fetch the global status', () => {
            securityCache.getStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/status`);
        });
    });
});
