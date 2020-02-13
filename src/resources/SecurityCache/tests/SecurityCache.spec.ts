import API from '../../../APICore';
import SecurityCache from '../SecurityCache';
import {DetailedSecurityCacheMemberModel} from '../SecurityCacheInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('securityCache', () => {
    let securityCache: SecurityCache;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        securityCache = new SecurityCache(api);
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
            const identityModel: DetailedSecurityCacheMemberModel = {
                infos: [
                    {
                        key: '🗝',
                        value: '💰',
                    },
                ],
                name: '📜',
                provider: '📥',
                type: '⚥',
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
