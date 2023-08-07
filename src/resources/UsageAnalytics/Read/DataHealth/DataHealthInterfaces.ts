import {Paginated} from '../../../BaseInterfaces.js';

/**
 * Pagination information about which page is included in the response,
 * and what the full range of data is.
 */
export interface PaginationInformationModel {
    /**
     * Zero-based page index of the current page.
     */
    page: number;
    /**
     * The number of items for each page.
     * Note that the actual number of items may be lower for the last page.
     */
    perPage: number;
    /**
     * Total number of items available (across all pages).
     */
    totalItems: number;
    /**
     * The number of pages available, based on `totalItems` and `perPage`.
     */
    totalPages: number;
}

/**
 * Almost all calls of the Read service have an optional `org` query parameter.
 * (Notable exceptions are service status monitoring calls).
 */
interface OrganizationParamParts {
    /**
     * The name of the organization (Coveo Cloud V2 only)
     */
    org?: string;
}

/**
 * Required `from` and `to` parameters, encoding a time range.
 */
interface TimeRangeParamParts {
    /**
     * The beginning date of the date range for the request, as an ISO-8601 encoded string.
     * The date/time should include an offset, or `Z` for UTC.
     * Format: `YYYY-MM-DDThh:mm:ss.sssZ`.
     */
    from: string;

    /**
     * The end date of the date range for the request, as an ISO-8601 encoded string.
     * The date/time should include an offset, or `Z` for UTC.
     * Format: `YYYY-MM-DDThh:mm:ss.sssZ`.
     */
    to: string;
}

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
    trackingId?: string[];
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

interface PaginatedResponse {
    /**
     * Pagination information.
     */
    pagination: PaginationInformationModel;
}

export interface DataHealthListEventsResponse extends PaginatedResponse {
    /**
     * The listing of events in the current page.
     */
    events: DataHealthEventsListItemModel[];
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
    values: any[];
}

export interface DataHealthGetOverviewParams extends OrganizationParamParts, TimeRangeParamParts {
    /**
     * The category to filter by when getting the overview.
     */
    category?: string;
}

export interface DataHealthGetOverviewResponse {
    /**
     * The overall health score for the specified category(ies)
     */
    score: number;
    /**
     * The breakdown of overall validation failures by severity.
     */
    severityBreakdown: Record<Severity, number>;
    /**
     * The total number of entity validated.
     */
    totalValidations: number;
    /**
     * The total number of entity that failed validation.
     */
    failedValidations: number;
}

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
Object.freeze<Severity[]>(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
export interface DataHealthGetGroupListingParams extends OrganizationParamParts, TimeRangeParamParts, Paginated {
    /**
     * The category to filter by when getting groups listing.
     */
    category: string;
    /**
     * The tracking id to filter by when getting groups listing.
     */
    trackingId?: string[];
    /**
     * Whether to show groups with no validated entity or not.
     */
    showEmptyGroups?: boolean;
}

export interface DataHealthGetGroupListingResponse extends PaginatedResponse {
    /**
     * A collection of groups.
     */
    groups: DataHealthGroupListingEntry[];
}

export interface DataHealthGroupListingEntry {
    /**
     * The id of the group.
     */
    group: string;
    /**
     * The health score for a group.
     */
    score: number;
    /**
     * The breakdown of validation failures by severity for a group.
     */
    severityBreakdown: Record<Severity, number>;
    /**
     * The total number of validated entity for a group.
     */
    totalValidations: number;
    /**
     * The total number of entity that failed validation for a group.
     */
    failedValidations: number;
}

export interface DataHealthGetGroupDetailParams extends OrganizationParamParts, TimeRangeParamParts, Paginated {
    /**
     * The category to filter by when getting details on a group.
     */
    category: string;
    /**
     * The group to filter by when getting details.
     */
    group: string;
}

export interface DataHealthGetGroupDetailResponse {
    /**
     * A collection of criterion or rule for a group.
     */
    criteria: DataHealthGroupDetailEntry[];
}

export interface DataHealthGroupDetailEntry {
    /**
     * The rule id.
     */
    id: string;
    /**
     * The category the rule is associated to.
     */
    category: string;
    /**
     * The severity for a rule.
     */
    severity: string;
    /**
     * The total number of validated entity for a rule.
     */
    totalValidations: number;
    /**
     * The number of entity that failed validation for a rule.
     */
    failedValidations: number;
    /**
     * The score for a rule.
     */
    score: number;
    /**
     * The type of entity for a rule (event or visit).
     */
    scope: string;
    /**
     * The scope type (event type or visit).
     */
    scopeValue: string;
}

export interface DataHealthGetTrackingIdsParams extends OrganizationParamParts, TimeRangeParamParts {}

export interface DataHealthGetTrackingIdsResponse {
    /**
     * A collection of tracking ids as facet values (id and count).
     */
    values: DataHealthFacetValue[];
}
