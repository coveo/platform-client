import ReadServiceResource from '../ReadServiceResource.js';
import {
    DataHealthListEventsResponse,
    DataHealthGetEventPayloadParams,
    DataHealthListEventsParameters,
    DataHealthListFacetValueParams,
    DataHealthListFacetsResponse,
    DataHealthEventPayloadResponse,
} from './DataHealthInterfaces.js';

export default class DataHealth extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/datahealth';

    /**
     * Get health information about events.
     */
    listEvents(params: DataHealthListEventsParameters) {
        return this.api.get<DataHealthListEventsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events`, params)
        );
    }

    /**
     * Get health information about events.
     */
    getEventPayload(params: DataHealthGetEventPayloadParams) {
        return this.api.get<DataHealthEventPayloadResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/events/payload`, params)
        );
    }

    /**
     * List applicable facet values in the specified time range.
     */
    listFacetValues(params: DataHealthListFacetValueParams) {
        return this.api.get<DataHealthListFacetsResponse>(
            this.buildPathWithOrg(`${DataHealth.baseUrl}/facets`, params)
        );
    }
}
