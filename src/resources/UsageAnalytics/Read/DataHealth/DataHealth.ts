import ReadServiceResource from '../ReadServiceResource.js';
import {
    DataHealthEventPayloadResponse,
    DataHealthGetEventPayloadParams,
    DataHealthGetFailedInstancesParams,
    DataHealthGetFailedInstancesResponse,
    DataHealthGetGroupDetailParams,
    DataHealthGetGroupDetailResponse,
    DataHealthGetGroupListingParams,
    DataHealthGetGroupListingResponse,
    DataHealthGetOverviewParams,
    DataHealthGetOverviewResponse,
    DataHealthGetTrackingIdsParams,
    DataHealthGetTrackingIdsResponse,
    DataHealthListEventsParameters,
    DataHealthListEventsResponse,
    DataHealthListFacetsResponse,
    DataHealthListFacetValueParams,
    EventProblemsResponse,
    DataHealthGetEventProblemsParams,
} from './DataHealthInterfaces.js';

export default class DataHealth extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/datahealth';

    /**
     * Get health information about events.
     * @param params
     */
    listEvents(params: DataHealthListEventsParameters) {
        return this.api.get<DataHealthListEventsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events`, params),
        );
    }

    /**
     * Get original event payload.
     * @param params
     */
    getEventPayload(params: DataHealthGetEventPayloadParams) {
        return this.api.get<DataHealthEventPayloadResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events/payload`, params),
        );
    }

    /**
     * List applicable facet values in the specified time range.
     * @param params
     */
    listFacetValues(params: DataHealthListFacetValueParams) {
        return this.api.get<DataHealthListFacetsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/facets`, params),
        );
    }

    /**
     * Get general data health information.
     * @param params
     */
    getOverview(params: DataHealthGetOverviewParams) {
        return this.api.get<DataHealthGetOverviewResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/overview`, params),
        );
    }

    /**
     * Get health information about groups of validation rules.
     * @param params
     */
    getGroupListing(params: DataHealthGetGroupListingParams) {
        return this.api.get<DataHealthGetGroupListingResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/groups`, params),
        );
    }

    /**
     * Get health information about validation rules of a specific group.
     * @param params
     */
    getGroupDetail(params: DataHealthGetGroupDetailParams) {
        return this.api.get<DataHealthGetGroupDetailResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/groups/detail`, params),
        );
    }

    /**
     * Get a list of unique tracking ids.
     * @param params
     */
    getTrackingIds(params: DataHealthGetTrackingIdsParams) {
        return this.api.get<DataHealthGetTrackingIdsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/facets`, {...params, facet: 'TRACKING_ID'}),
        );
    }

    /**
     * Get problems about events.
     * @param params
     */
    getEventsProblems(params: DataHealthGetEventProblemsParams) {
        return this.api.get<EventProblemsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events/problems`, params),
        );
    }

    /**
     * Get failed instances for a data health criterion
     * @param params Parameters to fetch data health failed instances.
     */
    getFailedInstances(params: DataHealthGetFailedInstancesParams) {
        return this.api.get<DataHealthGetFailedInstancesResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/criteria/failedInstances`, params),
        );
    }

    /**
     * Build the request path, handling the optional `org` query parameter.
     * @param route The path part of the request.
     * @param queryParams Optional query parameters object.
     * If this object contains an `org` property, it will override the value from the configuration.
     * @returns The request path including formatted query parameters.
     */
    protected buildPathWithOrg(route: string, queryParams?: object): string {
        return super.buildPath(route, {org: this.api.organizationId, ...queryParams});
    }
}
