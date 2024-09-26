import {Paginated, PaginatedResponse} from '../../../BaseInterfaces.js';
import {OrganizationParamParts, TimeRangeParamParts} from '../CommonParamParts.js';

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export const SeverityConstant = Object.freeze<Severity[]>(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);

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

export interface DataHealthFacetValue {
    /**
     * The value of the facet.
     */
    value: string;
    /**
     * The count of records that matched the facet in the current range.
     */
    count: number;
}

export interface DataHealthListFacetsResponse {
    /**
     * The values for this facet.
     */
    values: DataHealthFacetValue[];
}

export interface DataHealthGetOverviewParams extends OrganizationParamParts, TimeRangeParamParts {
    /**
     * The category to filter by when getting the overview.
     */
    category?: string;
    /**
     * The tracking id to filter by when getting groups listing.
     */
    trackingId?: string[];
    /**
     * Whether to include beta rules when getting details.
     */
    showBetaRules?: boolean;
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
    /**
     * Whether to show groups with only beta rules.
     */
    showBetaRules?: boolean;
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
     * The tracking id to filter by when getting groups listing.
     */
    trackingId?: string[];
    /**
     * Whether to include beta rules when getting details.
     */
    showBetaRules?: boolean;
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

export interface DataHealthGetEventProblemsParams extends OrganizationParamParts, TimeRangeParamParts, Paginated {
    /**
     * A set of event types for which the events will be returned.
     * If not specified, events are not filtered on event types.
     */
    eventType?: string[];
    /**
     * A set of search hubs for which the events will be returned.
     * If not specified, events are not filtered on search hub.
     */
    searchHub?: string[];
    /**
     * The tracking id to filter by when getting groups listing.
     */
    trackingId?: string[];
}
export interface EventProblemsResponse extends PaginatedResponse {
    /**
     * List of the event problems.
     */
    problems: EventProblemsResponseItem[];
}

export interface EventProblemsResponseItem {
    /**
     * A set of event types for which the events will be returned.
     * If not specified, events are not filtered on event types.
     */
    eventType: string;
    /**
     * The tracking id to filter by when getting groups listing.
     */
    trackingId: string;
    /**
     * A set of search hubs for which the events will be returned.
     * If not specified, events are not filtered on search hub.
     */
    searchHub: string;
    /**
     * Number of failed events.
     */
    failedEvents: number;
    /**
     * Number of total events.
     */
    totalEvents: number;
    /**
     * List of the validation errors.
     */
    validationErrors: ValidationErrors[];
    /**
     * Events sampled from the problematic events.
     */
    sampleEvents: string[];
    /**
     * Timestamps from the sample events.
     */
    sampleEventsTimestamps: string[];
}

interface ValidationErrors {
    /**
     * Validation error code.
     */
    code: string;
    /**
     * Validation error path.
     */
    path: string;
    /**
     * Validation error message.
     */
    message: string;
}
