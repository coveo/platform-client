import {Paginated, PaginationInformationModel} from '../../../BaseInterfaces.js';
import {OrganizationParamParts, TimeRangeParamParts} from '../CommonParamParts.js';

/**
 * Common parameters for Data Health calls that filter events.
 */
interface DataHealthFilterEventsParamParts {
    /**
     * Optional set of client ids to filter events on.
     * Entries are OR-ed together, if other filters are specified they are combined using AND.
     */
    clientId?: string[] | string;
    /**
     * Optional set of visit ids to filter events on.
     * Entries are OR-ed together, if other filters are specified they are combined using AND.
     */
    visitId?: string[] | string;
    /**
     * A set of event sources for which the events will be returned.
     * If not specified, events are not filtered on event sources.
     */
    eventSource?: string[] | string;
    /**
     * A set of event types for which the events will be returned.
     * If not specified, events are not filtered on event types.
     */
    eventType?: string[] | string;
    /**
     * A set of search hubs for which the events will be returned.
     * If not specified, events are not filtered on search hub.
     */
    searchHub?: string[] | string;
    /**
     * A health status for which the events will be returned.
     * If not specified, events are not filtered on event types.
     */
    healthStatus?: string;
}

export interface DataHealthListEventsParameters
    extends OrganizationParamParts,
        TimeRangeParamParts,
        DataHealthFilterEventsParamParts,
        Paginated {}

export interface DataHealthGetEventPayloadParams extends OrganizationParamParts {
    /**
     * The ID of the event to get the payload off.
     */
    eventId: string;
    /**
     * The ISO-8601 formatted timestamp of the event.
     */
    timestamp: string;
}

export interface DataHealthEventPayloadResponse {
    /**
     * The ID of the event.
     */
    eventId: string;
    /**
     * The timestamp of the event.
     */
    timestamp: string;
    /**
     * The raw payload of the event.
     */
    eventPayload: Record<string, unknown>;
}

export interface DataHealthValidationErrorModel {
    /**
     * The error code.
     */
    code: string;
    /**
     * The path of the parameter causing the error.
     */
    path: string;
    /**
     * A description of the error.
     */
    message: string;
}

export interface DataHealthEventsListItemModel {
    /**
     * The source of the event.
     */
    source: string;
    /**
     * The type of the event.
     */
    type: string;
    /**
     * The searchHub of the event.
     */
    searchHub: string;
    /**
     * The ISO-8601 formatted timestamp of the event.
     */
    timestamp: string;
    /**
     * The visitId of the event.
     */
    visitId: string;
    /**
     * The clientId of the event.
     */
    clientId: string;
    /**
     * The id of the event.
     */
    eventId: string;
    /**
     * The validation errors of the event.
     */
    validationErrors: DataHealthValidationErrorModel[];
}

export interface DataHealthListEventsResponse {
    /**
     * The listing of events in the current page.
     */
    events: DataHealthEventsListItemModel[];
    /**
     * Pagination information.
     */
    pagination: PaginationInformationModel;
}

export interface DataHealthEventPayloadModel {
    [key: string]: unknown;
}

export interface DataHealthListFacetValueParams
    extends OrganizationParamParts,
        TimeRangeParamParts,
        DataHealthFilterEventsParamParts {
    /**
     * The facet for which the values should be listed.
     */
    facet: string;
}

export interface DataHealthFacetValue<TValue = string> {
    /**
     * The value of the facet.
     */
    value: TValue;
    /**
     * The count of records that matched the facet in the current range.
     */
    count: number;
}

export interface DataHealthListFacetsResponse {
    /**
     * The values for this facet.
     */
    values: Array<DataHealthFacetValue<string>>;
}
