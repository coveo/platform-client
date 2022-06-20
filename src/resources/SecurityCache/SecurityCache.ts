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
    SecurityProviderModel,
    SecurityCacheIdentitiesFilters,
} from './SecurityCacheInterfaces';

export default class SecurityCache extends Ressource {
    static baseUrl = `rest/organizations/${API.orgPlaceholder}`;
    static cacheUrl = `/${SecurityCache.baseUrl}/securitycache`;
    static providersUrl = `/${SecurityCache.baseUrl}/securityproviders`;

    listMembers(
        providerId: string,
        options: SecurityCacheListOptions = {}
    ): Promise<PageModel<DetailedSecurityCacheMemberModel>> {
        // TODO: SECCACHE-710 remove `usePageModel` once API has removed this parameter
        return this.api.get<PageModel<DetailedSecurityCacheMemberModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}/members`, {...options, usePageModel: true})
        );
    }

    listEntities(providerId: string, options?: SecurityCacheListOptions) {
        return this.api.get<PageModel<SecurityCacheIdentityModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/${providerId}`, options)
        );
    }

    listSecurityProviderIdentities(providerId: string, {page, perPage, ...rest}: SecurityCacheIdentitiesFilters = {}) {
        const filteringModel = {
            filteringTerm: rest.filteringTerm,
            identityTypes: rest.identityTypes,
            providerIds: [providerId],
        };
        return this.api.post<PageModel<SecurityCacheIdentityModel>>(
            this.buildPath(`${SecurityCache.cacheUrl}/entities/list`, {page, perPage}),
            filteringModel
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

    getProvider(securityProviderId: string) {
        return this.api.get<SecurityProviderModelWithStatus>(`${SecurityCache.providersUrl}/${securityProviderId}`);
    }

    createOrUpdateProvider(securityProvider: SecurityProviderModel) {
        return this.api.put<SecurityProviderModelWithStatus>(
            `${SecurityCache.providersUrl}/${securityProvider.id}`,
            securityProvider
        );
    }

    deleteProvider(securityProviderId: string) {
        return this.api.delete(`${SecurityCache.providersUrl}/${securityProviderId}`);
    }

    getSchedules(securityProviderId: string) {
        return this.api.get<ScheduleModel[]>(`${SecurityCache.providersUrl}/${securityProviderId}/schedules`);
    }

    updateSchedule(securityProviderId: string, schedule: ScheduleModel) {
        return this.api.put<ScheduleModel>(
            `${SecurityCache.providersUrl}/${securityProviderId}/schedules/${schedule.id}`,
            schedule
        );
    }

    getProviderEntity(providerId: string, member: SecurityCacheMemberModel) {
        return this.api.post<DetailedSecurityCacheMemberModel>(
            `${SecurityCache.cacheUrl}/entities/${providerId}/entity`,
            member
        );
    }

    cancelRefresh(providerId: string) {
        return this.api.post(`${SecurityCache.providersUrl}/${providerId}/refresh/cancel`);
    }
}
