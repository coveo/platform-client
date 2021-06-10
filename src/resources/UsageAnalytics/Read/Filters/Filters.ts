import Resource from '../../../Resource';
import {
    CreatePermissionsFilterModel,
    CreatePermissionsFilterResponse,
    CreateReportingFilterModel,
    CreateReportingFilterResponse,
    FilterModel,
    FilterResponse,
    FilterServiceHealthResponse,
    FilterServiceStatusResponse,
    FilterTargetsModel,
    FilterTargetsResponse,
    ListFiltersResponse,
    PermissionsFilterUser,
    UpdatePermissionsFilterModel,
    UpdatePermissionsFilterResponse,
    UpdateReportingFilterModel,
    UpdateReportingFilterResponse,
} from './FiltersInterfaces';

export default class Filters extends Resource {
    static baseUrl = '/rest/ua/v15/filters';
    static reportingBaseUrl = `${Filters.baseUrl}/reporting`;
    static permissionsBaseUrl = `${Filters.baseUrl}/permissions`;

    /**
     * Get all reporting filters
     */
    listReportFilters() {
        return this.api.get<ListFiltersResponse>(
            this.buildPath(Filters.reportingBaseUrl, {org: this.api.organizationId})
        );
    }

    /**
     * Get a reporting filter
     */
    getReportFilter(id: string) {
        return this.api.get<FilterResponse>(
            this.buildPath(`${Filters.reportingBaseUrl}/${id}`, {org: this.api.organizationId})
        );
    }

    /**
     * Create a reporting filter
     */
    createReportFilter(filter: CreateReportingFilterModel) {
        return this.api.post<CreateReportingFilterResponse>(
            this.buildPath(Filters.reportingBaseUrl, {org: this.api.organizationId}),
            filter
        );
    }

    /**
     * Update a reporting filter
     */
    updateReportFilter(id: string, filter: UpdateReportingFilterModel) {
        return this.api.put<UpdateReportingFilterResponse>(
            this.buildPath(`${Filters.reportingBaseUrl}/${id}`, {org: this.api.organizationId}),
            filter
        );
    }

    /**
     * Delete a reporting filter
     */
    deleteReportFilter(id: string) {
        return this.api.delete(this.buildPath(`${Filters.reportingBaseUrl}/${id}`, {org: this.api.organizationId}));
    }

    /**
     * Get all permission filters
     */
    listPermissionFilters() {
        return this.api.get<ListFiltersResponse>(
            this.buildPath(Filters.permissionsBaseUrl, {org: this.api.organizationId})
        );
    }

    /**
     * Get a permission filter
     */
    getPermissionFilter(id: string) {
        return this.api.get<FilterResponse>(
            this.buildPath(`${Filters.permissionsBaseUrl}/${id}`, {org: this.api.organizationId})
        );
    }

    /**
     * Create a permission filter
     */
    createPermissionFilter(filter: CreatePermissionsFilterModel) {
        return this.api.post<CreatePermissionsFilterResponse>(
            this.buildPath(Filters.permissionsBaseUrl, {org: this.api.organizationId}),
            filter
        );
    }

    /**
     * Update a permission filter
     */
    updatePermissionFilter(id: string, filter: UpdatePermissionsFilterModel) {
        return this.api.put<UpdatePermissionsFilterResponse>(
            this.buildPath(`${Filters.permissionsBaseUrl}/${id}`, {org: this.api.organizationId}),
            filter
        );
    }

    /**
     * Delete a permission filter
     */
    deletePermissionFilter(id: string) {
        return this.api.delete(this.buildPath(`${Filters.permissionsBaseUrl}/${id}`, {org: this.api.organizationId}));
    }

    /**
     * Get the users of a permission filters
     */
    getPermissionFilterUsers(id: string) {
        return this.api.get<PermissionsFilterUser[]>(`${Filters.permissionsBaseUrl}/${id}/users`);
    }

    /**
     * Set the users of a permission filter
     */
    updatePermissionFilterUsers(id: string, users: string[]) {
        return this.api.put(
            this.buildPath(`${Filters.permissionsBaseUrl}/${id}/users`, {org: this.api.organizationId}),
            users
        );
    }

    /**
     * Get the targets of a permission filters
     */
    getPermissionFilterTargets(id: string) {
        return this.api.get<FilterTargetsResponse[]>(`${Filters.permissionsBaseUrl}/${id}/targets`);
    }

    /**
     * Set the targets of a permission filter
     */
    updatePermissionFilterTargets(id: string, targets: FilterTargetsModel) {
        return this.api.put(
            this.buildPath(`${Filters.permissionsBaseUrl}/${id}/targets`, {org: this.api.organizationId}),
            targets
        );
    }

    /**
     * Health check for the filter service
     */
    healthcheck() {
        return this.api.get<FilterServiceHealthResponse>(`${Filters.baseUrl}/monitoring/health`);
    }

    /**
     * Get the filter service status
     */
    status() {
        return this.api.get<FilterServiceStatusResponse>(`${Filters.baseUrl}/status`);
    }
}
