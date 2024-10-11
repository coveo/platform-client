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

describe('securityCache', () => {
    let securityCache: SecurityCache;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        securityCache = new SecurityCache(api, serverlessApi);
    });

    describe('list', () => {
        const providerId = 'PROVIDER_ID';

        it('should make a GET call to the securityCache correct url with listMembers', async () => {
            await securityCache.listMembers(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${SecurityCache.cacheUrl}/entities/${providerId}/members?usePageModel=true`,
            );
        });

        it('should make a GET call to the securityCache correct url with listEntities', async () => {
            await securityCache.listEntities(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/${providerId}`);
        });

        it('should make a GET call to the securityCache correct url with isListingSecurityIdentitiesSupported', async () => {
            await securityCache.isListingSecurityIdentitiesSupported();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/list/is_supported`);
        });

        it('should make a POST call to the securityCache correct url with listSecurityIdentities without filters', async () => {
            await securityCache.listSecurityProviderIdentities(providerId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/list`,
                {providerIds: [providerId]},
            );
        });

        it('should make a POST call to the securityCache correct url with listSecurityIdentities with filters', async () => {
            await securityCache.listSecurityProviderIdentities(providerId, {
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
                },
            );
        });

        it('should make a GET call to the securityProvider url with listProvider', async () => {
            await securityCache.listProviders();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(SecurityCache.providersUrl);
        });
    });

    describe('listChildren', () => {
        it('makes a POST call to the security cache member children endpoint', async () => {
            const memberModel: SecurityCacheMemberModel = {
                name: '🚣🏻‍♀️',
                type: PermissionIdentityType.User,
                provider: '🎲',
                infos: [],
            };
            await securityCache.listChildren('🌶', memberModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/children`,
                memberModel,
            );
        });

        it('specifies the right query parameters in the url if any', async () => {
            await securityCache.listChildren('🌶', {} as SecurityCacheMemberModel, {
                page: 1,
                perPage: 20,
                recursive: true,
            });

            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/children?page=1&perPage=20&recursive=true`,
                expect.anything(),
            );
        });
    });

    describe('listParents', () => {
        it('makes a POST call to the security cache member parents endpoint', async () => {
            const memberModel: SecurityCacheMemberModel = {
                name: '🚣🏻‍♀️',
                type: PermissionIdentityType.User,
                provider: '🎲',
                infos: [],
            };
            await securityCache.listParents('🌶', memberModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/parents`,
                memberModel,
            );
        });

        it('specifies the right query parameters in the url if any', async () => {
            await securityCache.listParents('🌶', {} as SecurityCacheMemberModel, {
                page: 1,
                perPage: 20,
                recursive: true,
            });

            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/securitycache/entities/🌶/members/parents?page=1&perPage=20&recursive=true`,
                expect.anything(),
            );
        });
    });

    describe('schedules', () => {
        const securityProviderId = 'SECURITY_ID';
        it('should make a GET call to the specific securityCache url to fetch the schedules', async () => {
            await securityCache.listSchedules();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/schedules`);
        });

        it('should make a GET call to the specific securityProvider url to fetch the schedules', async () => {
            await securityCache.getSchedules(securityProviderId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${securityProviderId}/schedules`);
        });

        it('should make a PUT call to the specific securityProvider url to update a schedule', async () => {
            const scheduleId = 'SCHEDULE_ID';
            const scheduleConfig: ScheduleModel = {id: scheduleId, enabled: true};
            await securityCache.updateSchedule(securityProviderId, scheduleConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SecurityCache.providersUrl}/${securityProviderId}/schedules/${scheduleId}`,
                scheduleConfig,
            );
        });
    });

    describe('providers', () => {
        const providerId = 'PROVIDER_ID';
        it('should make a GET call to the specific securityCache url to fetch a provider', async () => {
            await securityCache.getProvider(providerId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`);
        });

        it('should make a PUT call to the specific securityCache url to create or update a provider', async () => {
            const providerUpdate: SecurityProviderModel = {id: providerId, name: 'Test Security Provider'};
            await securityCache.createOrUpdateProvider(providerUpdate);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`, providerUpdate);
        });

        it('should make a DELETE call to the specific securityCache url to delete a provider', async () => {
            await securityCache.deleteProvider(providerId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${providerId}`);
        });
    });

    describe('refresh', () => {
        it('should make a POST call to the securityCache refreshCache url', async () => {
            await securityCache.refreshCache();
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/refresh`);
        });

        it('should make a POST call to the security Provider refresh url', async () => {
            await securityCache.refreshProvider('PROVIDER_ID');
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/PROVIDER_ID/refresh`);
        });

        it('should make a POST call to the security Identity refresh url', async () => {
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
            await securityCache.refreshIdentity(identityModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/refresh/entity`, identityModel);
        });

        it('should make a POST when canceling a refresh operation', async () => {
            const PROVIDER_ID = 'OhnoOhNoNONo';
            await securityCache.cancelRefresh(PROVIDER_ID);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.providersUrl}/${PROVIDER_ID}/refresh/cancel`);
        });
    });

    describe('status', () => {
        it('should make a get call to the specific securityCache url to fetch the global status', async () => {
            await securityCache.getStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/status`);
        });
    });

    describe('getProviderEntity', () => {
        it('should make a POST call to the specified security provider member', async () => {
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

            await securityCache.getProviderEntity('🏀', member);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SecurityCache.cacheUrl}/entities/🏀/entity`, member);
        });
    });
});
