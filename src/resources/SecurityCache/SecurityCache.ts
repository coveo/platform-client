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
    SecurityCacheListRelationshipsOptions,
    SecurityCacheMemberModel,
} from './SecurityCacheInterfaces';

export default class SecurityCache extends Ressource {
    static baseUrl = `rest/organizations/${API.orgPlaceholder}`;
    static cacheUrl = `/${SecurityCache.baseUrl}/securitycache`;
    static providersUrl = `/${SecurityCache.baseUrl}/securityproviders`;

    listMembers(providerId: string, options?: SecurityCacheListOptions) {
        return this.api.get<PageModel<DetailedSecurityCacheMemberModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}/members`, options)
        );
    }

    listEntities(providerId: string, options?: SecurityCacheListOptions) {
        return this.api.get<PageModel<SecurityCacheIdentityModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}`, options)
        );
    }

    listChildren(
        providerId: string,
        member: SecurityCacheMemberModel,
        options?: SecurityCacheListRelationshipsOptions
    ) {
        return this.api.post<PageModel<DetailedSecurityCacheMemberModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}/members/children`, options),
            member
        );
    }

    listParents(providerId: string, member: SecurityCacheMemberModel, options?: SecurityCacheListRelationshipsOptions) {
        return this.api.post<PageModel<DetailedSecurityCacheMemberModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}/members/parents`, options),
            member
        );
    }

    listSchedules() {
        return this.api.get<ScheduleModel[]>(`${SecurityCache.cacheUrl}/schedules`);
    }

    getStatus() {
        return this.api.get<SecurityCacheStatus>(`${SecurityCache.cacheUrl}/status`);
    }

    refreshCache() {
        return this.api.post(`${SecurityCache.cacheUrl}/refresh`);
    }

    refreshProvider(providerId: string) {
        return this.api.post(`${SecurityCache.cacheUrl}/${providerId}/refresh`);
    }

    refreshIdentity(identityModel: SecurityCacheMemberModel) {
        return this.api.post(`${SecurityCache.cacheUrl}/refresh/entity`, identityModel);
    }

    listProviders() {
        return this.api.get<SecurityProviderModelWithStatus[]>(SecurityCache.providersUrl);
    }

    providerSchedules() {
        return this.api.get<ScheduleModel[]>(`${SecurityCache.providersUrl}/schedules`);
    }

    getProvider(providerId: string) {
        return this.api.get<SecurityProviderModelWithStatus>(`${SecurityCache.providersUrl}/${providerId}`);
    }

    getProviderEntity(providerId: string, member: SecurityCacheMemberModel) {
        return this.api.post<DetailedSecurityCacheMemberModel>(
            `${SecurityCache.cacheUrl}/entities/${providerId}/entity`,
            member
        );
    }
}
