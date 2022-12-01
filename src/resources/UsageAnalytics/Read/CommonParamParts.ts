import { MetricsInterval } from "./ReadServiceCommon";

/**
 * Almost all calls of the Read service have an optional `org` query parameter.
 * (Notable exceptions are service status monitoring calls).
 */
export interface OrganizationParamParts {
    /**
     * The name of the organization (Coveo Cloud V2 only)
     */
    org?: string;
}

/**
 * Required `d` parameter, encoding dimensions.
 */
export interface EventDimensionsParamParts {
    /**
     * The dimensions to fetch.
     */
    d: string[];
}

/**
 * Optional `f` parameter, encoding dimension filters.
 */
export interface EventDimensionsFilterParamParts {
    /**
     * The filter that will be applied to the event dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    f?: string[];
}

/**
 * Optional `fn` parameter, encoding dimension based exclusion filters.
 */
export interface EventDimensionsExcludeFilterParamParts {
    /**
     * The filter that will be applied to dimensions to exclude events from the results.
     * Multiple filter parameters are joined with the AND operator.
     */
    fn?: string[];
}

/**
 * Optional `fn` parameter, encoding dimension based event exclusion filters.
 */
export interface EventDimensionsHideEventsFilterParamParts {
    /**
     * Each specified filter is inverted in order to hide events.
     * Multiple filter parameters are joined with the AND operator.
     */
    hideEventFilters?: string[];
}

/**
 * Required `m` parameter, encoding metrics.
 */
export interface EventMetricsParamParts {
    /**
     * The metrics to fetch.
     */
    m: string[];
}

/**
 * Optional `i` parameter, encoding the interval to use when calculating metrics.
 */
export interface EventMetricsIntervalParamParts {
    /**
     * The interval on which data will be grouped. Default value is 'DAY'.
     */
    i?: MetricsInterval;
}

/**
 * Optional `fm` parameter, encoding metric based filters.
 */
export interface EventMetricsFilterParamParts {
    /**
     * The filter that will be applied to the metrics.
     * Multiple filter parameters are joined with the AND operator.
     */
    fm?: string[];
}

/**
 * Required `from` and `to` parameters, encoding a time range.
 */
export interface TimeRangeParamParts {
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
 * Optional `tz` parameters, encoding a time zone.
 */
export interface TimeZoneParamParts {
    /**
     * Timezone/offset used for calculations.
     * Defaults to `Z` (UTC).
     */
    tz?: string;
}

/**
 * Paginated `p` and `n` query parameters used by some Read service calls.
 * (Deprecated because it doesn't align with Coveo's standard `page` (0-based) and `perPage` query parameters).
 */
export interface DeprecatedShortPaginatedParamParts {
    /**
     * The response's page to access, starting at 1.
     */
    p?: number;

    /**
     * The number of result to include in a page.
     */
    n?: number;
}
