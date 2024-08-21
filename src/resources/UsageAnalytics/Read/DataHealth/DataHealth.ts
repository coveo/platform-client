import ReadServiceResource from '../ReadServiceResource.js';
import {
    DataHealthEventPayloadResponse,
    DataHealthGetEventPayloadParams,
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
} from './DataHealthInterfaces.js';

export default class DataHealth extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/datahealth';

    /**
     * Get health information about events.
     */
    listEvents(params: DataHealthListEventsParameters, args?: RequestInit) {
        return this.api.get<DataHealthListEventsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events`, params),
            args,
        );
    }

    /**
     * Get original event payload.
     */
    getEventPayload(params: DataHealthGetEventPayloadParams, args?: RequestInit) {
        return this.api.get<DataHealthEventPayloadResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events/payload`, params),
            args,
        );
    }

    /**
     * List applicable facet values in the specified time range.
     */
    listFacetValues(params: DataHealthListFacetValueParams, args?: RequestInit) {
        return this.api.get<DataHealthListFacetsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/facets`, params),
            args,
        );
    }

    /**
     * Get general data health information.
     */
    getOverview(params: DataHealthGetOverviewParams, args?: RequestInit) {
        return this.api.get<DataHealthGetOverviewResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/overview`, params),
            args,
        );
    }

    /**
     * Get health information about groups of validation rules.
     */
    getGroupListing(params: DataHealthGetGroupListingParams, args?: RequestInit) {
        return this.api.get<DataHealthGetGroupListingResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/groups`, params),
            args,
        );
    }

    /**
     * Get health information about validation rules of a specific group.
     */
    getGroupDetail(params: DataHealthGetGroupDetailParams, args?: RequestInit) {
        return this.api.get<DataHealthGetGroupDetailResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/groups/detail`, params),
            args,
        );
    }

    /**
     * Get a list of unique tracking ids.
     */
    getTrackingIds(params: DataHealthGetTrackingIdsParams, args?: RequestInit) {
        return this.api.get<DataHealthGetTrackingIdsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/facets`, {...params, facet: 'TRACKING_ID'}),
            args,
        );
    }

    /**
     * Build the request path, handling the optional `org` query parameter.
     *
     * @param route The path part of the request.
     * @param queryParams Optional query parameters object.
     * If this object contains an `org` property, it will override the value from the configuration.
     * @returns The request path including formatted query parameters.
     */
    protected buildPathWithOrg(route: string, queryParams?: any): string {
        return super.buildPath(route, {org: this.api.organizationId, ...queryParams});
    }
}
