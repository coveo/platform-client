import {
    ScheduleModel,
    SecurityProviderIdentitiesFilters,
    SecurityCacheMemberModel,
    SecurityProviderModel,
} from '../index.js';
import API from '../../../APICore.js';
import {PermissionIdentityType, SecurityCacheFilteringMode} from '../../Enums.js';
import SecurityCache from '../SecurityCache.js';

jest.mock('../../../APICore.js');

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
            expect(api.get).toHaveBeenCalledWith(
                `${SecurityCache.cacheUrl}/entities/${providerId}/members?usePageModel=true`
            );
        });

        it('should make a GET call to the securityCache correct url with listEntities', () => {
            securityCache.listEntities(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/${providerId}`);
        });

        it('should make a GET call to the securityCache correct url with isListSecurityIdentitiesSupported', () => {
            securityCache.isListSecurityIdentitiesSupported();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/list/is_supported`);
        });

        it('should make a POST call to the securityCache correct url with listSecurityIdentities without filters', () => {
            securityCache.listSecurityProviderIdentities(providerId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/list`,
                {providerIds: [providerId]}
            );
        });

        it('should make a POST call to the securityCache correct url with listSecurityIdentities with filters', () => {
            securityCache.listSecurityProviderIdentities(providerId, {
                filteringMode: SecurityCacheFilteringMode.PREFIX,
                filterTerm: 'test',
                identityTypes: [PermissionIdentityType.User],
            } as SecurityProviderIdentitiesFilters);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/list`,
                {
                    filteringMode: 'PREFIX',
                    filterTerm: 'test',
                    identityTypes: ['User'],
                    providerIds: ['PROVIDER_ID'],
                }
            );
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
        const securityProviderId = 'SECURITY_ID';
        it('should make a GET call to the specific securityCache url to fetch the schedules', () => {
            securityCache.listSchedules();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/schedules`);
        });

        it('should make a GET call to the specific securityProvider url to fetch the schedules', () => {
            securityCache.getSchedules(securityProviderId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${securityProviderId}/schedules`);
        });

        it('should make a PUT call to the specific securityProvider url to update a schedule', () => {
            const scheduleId = 'SCHEDULE_ID';
            const scheduleConfig: ScheduleModel = {id: scheduleId, enabled: true};
            securityCache.updateSchedule(securityProviderId, scheduleConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SecurityCache.providersUrl}/${securityProviderId}/schedules/${scheduleId}`,
                scheduleConfig
            );
        });
    });

    describe('providers', () => {
        const providerId = 'PROVIDER_ID';
        it('should make a GET call to the specific securityCache url to fetch a provider', () => {
            securityCache.getProvider(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`);
        });

        it('should make a PUT call to the specific securityCache url to create or update a provider', () => {
            const providerUpdate: SecurityProviderModel = {id: providerId, name: 'Test Security Provider'};
            securityCache.createOrUpdateProvider(providerUpdate);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`, providerUpdate);
        });

        it('should make a DELETE call to the specific securityCache url to delete a provider', () => {
            securityCache.deleteProvider(providerId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`);
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

        it('should make a POST when canceling a refresh operation', () => {
            const PROVIDER_ID = 'OhnoOhNoNONo';
            securityCache.cancelRefresh(PROVIDER_ID);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${PROVIDER_ID}/refresh/cancel`);
        });
    });

    describe('status', () => {
        it('should make a get call to the specific securityCache url to fetch the global status', () => {
            securityCache.getStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/status`);
        });
    });

    describe('getProviderEntity', () => {
        it('should make a POST call to the specified security provider member', () => {
            const member: SecurityCacheMemberModel = {
                infos: [
                    {
                        key: '🥔',
                        value: '👑',
                    },
                ],
                name: '👌',
                provider: '💰',
                type: PermissionIdentityType.Group,
            };

            securityCache.getProviderEntity('🏀', member);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/🏀/entity`, member);
        });
    });
});
