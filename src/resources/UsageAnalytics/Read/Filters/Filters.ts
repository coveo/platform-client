import Resource from '../../../Resource';
import {
    CreateReportingFilterModel,
    CreateReportingFilterResponse,
    FilterModel,
    ListFiltersResponse,
    UpdateReportingFilterModel,
    UpdateReportingFilterResponse,
} from './FiltersInterfaces';

export default class Filters extends Resource {
    static baseUrl = '/rest/ua/v15/filters';
    static reportingBaseUrl = `${Filters.baseUrl}/reporting`;

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
        return this.api.get<FilterModel>(
            this.buildPath(`${Filters.reportingBaseUrl}/${id}`, {org: this.api.organizationId})
        );
    }

    /**
     * Create a reporting filter
     */
    createReportFilter(filter: CreateReportingFilterModel) {
        return this.api.post<CreateReportingFilterResponse>(
            this.buildPath(`${Filters.reportingBaseUrl}`, {org: this.api.organizationId}),
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
}
