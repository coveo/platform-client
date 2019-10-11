import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Ressource from '../Resource';
import {
    DetailedSecurityCacheMemberModel,
    ScheduleModel,
    SecurityCacheIdentityModel,
    SecurityCacheListOptions,
    SecurityCacheStatus,
    SecurityProviderModelWithStatus,
} from './SecurityCacheInterfaces';

export default class SecurityCache extends Ressource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}`;
    static cacheUrl = `/${SecurityCache.baseUrl}/securitycache`;
    static providersUrl = `/${SecurityCache.baseUrl}/securityproviders`;

    listMembers(providerId: string, options?: SecurityCacheListOptions) {
        return this.api.get<PageModel<DetailedSecurityCacheMemberModel[]>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}/members`, options)
        );
    }

    listEntities(providerId: string, options?: SecurityCacheListOptions) {
        return this.api.get<PageModel<SecurityCacheIdentityModel[]>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}`, options)
        );
    }

    listSchedules() {
        return this.api.get<ScheduleModel[]>(`${SecurityCache.cacheUrl}/schedules`);
    }

    getStatus() {
        return this.api.get<SecurityCacheStatus>(`${SecurityCache.cacheUrl}/status`);
    }

    refreshCache() {
        return this.api.post(`${SecurityCache.cacheUrl}/refresh`, {});
    }

    listProviders() {
        return this.api.get<SecurityProviderModelWithStatus>(SecurityCache.providersUrl);
    }

    providerSchedules() {
        return this.api.get<ScheduleModel>(`${SecurityCache.providersUrl}/schedules`);
    }
}
