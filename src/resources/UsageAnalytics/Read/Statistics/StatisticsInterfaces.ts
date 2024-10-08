import {
    DeprecatedShortPaginatedParamParts,
    EventDimensionsExcludeFilterParamParts,
    EventDimensionsFilterParamParts,
    EventDimensionsHideEventsFilterParamParts,
    EventDimensionsParamParts,
    EventMetricsFilterParamParts,
    EventMetricsIntervalParamParts,
    EventMetricsParamParts,
    OrganizationParamParts,
    TimeRangeParamParts,
    TimeZoneParamParts,
} from '../CommonParamParts.js';

export type MetricsResponseFormat = 'JSON' | 'CSV';

export interface MetricsSortParamParts {
    /**
     * The field to order the results by.
     * It must be a dimension, metric or custom dimension that was specified in the 'm' or the 'd' parameter.
     */
    s?: string;
    /**
     * Whether to sort by ascending order.
     */
    asc?: boolean;
}

export interface MetadataParamParts {
    /**
     * Whether to include metadata regarding the results (total count and unique counts, if applicable).
     */
    includeMetadata?: boolean;
}

export interface BindOnLastSearchParamPart {
    bindOnLastSearch?: boolean;
}

export interface MetricValue {
    value: number;
}

export interface MetricStats {
    average: number;
    total: number;
    peak: number;
}

export interface IncoherentEventsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        DeprecatedShortPaginatedParamParts,
        Pick<MetricsSortParamParts, 'asc'>,
        MetadataParamParts {
    /**
     * The error codes to fetch.
     * Example values are:
     * 'DUPLICATE_SEARCH_ID',
     * 'DUPLICATE_CLICK_ID',
     * 'DUPLICATE_CUSTOM_EVENT_ID',
     * 'DUPLICATE_VIEW_EVENT_ID',
     * 'CLICK_WITHOUT_ASSOCIATED_SEARCH',
     * 'STRICT_VALIDATION_FAILURE'.
     */
    errorCodes?: string[];
    /**
     * Whether to include the incoherent events that have already been seen.
     */
    seen?: boolean;
}

export interface IncoherentEventModel {
    errorCode: string;
    datetime: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any;
}

export interface IncoherentEventsModel {
    events: IncoherentEventModel[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueCounts: any;
    totalNumberOfResults: number;
}

export interface MetricsModel {
    globalDatas: Record<string, MetricValue | MetricStats>;
    lastUpdated: number;
    cached: boolean;
}

export interface GlobalDataOptions
    extends OrganizationParamParts,
        EventMetricsParamParts,
        EventMetricsIntervalParamParts,
        // Partial<EventDimensionsParamParts> omitted to document the special case.
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventDimensionsFilterParamParts,
        BindOnLastSearchParamPart {
    /**
     * The dimensions to fetch.
     * Required when the Activity metric is requested, as it has to be based on a dimension.
     */
    d?: string[];
    bindOnLastSearch?: boolean;
}

export interface TrendsModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    combinations: Array<Record<string, any>>;
    uniqueCounts: Record<string, number>;
    totalNumberOfResults: number;
    lastUpdated: number;
    cached: boolean;
}

export interface TrendsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventMetricsParamParts,
        EventMetricsFilterParamParts,
        EventDimensionsParamParts,
        EventDimensionsFilterParamParts,
        DeprecatedShortPaginatedParamParts,
        MetricsSortParamParts,
        MetadataParamParts,
        BindOnLastSearchParamPart {
    /**
     * The trends to caculate.
     */
    t: string[];
    /**
     * The beginning date of the previous date range, when reporting trends.
     * If not specified, it will be the 'from' date minus the duration of the 'from'-'to' date range.
     * The date/time should include an offset, or `Z` for UTC.
     * Format: `YYYY-MM-DDThh:mm:ss.sssZ`.
     */
    previousFrom?: string;
    /**
     * The end date of the previous date range, when reporting trends.
     * If not specified, it will be the 'to' date minus the duration of the 'from'-'to' date range.
     * The date/time should include an offset, or `Z` for UTC.
     * Format: `YYYY-MM-DDThh:mm:ss.sssZ`.
     */
    previousTo?: string;
    /**
     * The format of the response. Default is JSON.
     */
    format?: MetricsResponseFormat;
}

export interface VisitsMetricsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventMetricsParamParts,
        EventDimensionsFilterParamParts,
        EventDimensionsHideEventsFilterParamParts,
        EventMetricsFilterParamParts {}

export interface VisitMetricStats {
    sum: number;
    average: number;
    min: number;
    max: number;
}

export interface VisitsGraphDataPointsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventMetricsParamParts,
        EventMetricsIntervalParamParts,
        EventDimensionsFilterParamParts,
        EventDimensionsExcludeFilterParamParts,
        EventDimensionsHideEventsFilterParamParts {}

export type CancelQueryOptions = OrganizationParamParts;

export interface DataPointModel {
    dateTime: number;
    datas: Record<string, number>;
}

export interface GraphDataPointsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventMetricsParamParts,
        EventMetricsIntervalParamParts,
        EventDimensionsFilterParamParts,
        BindOnLastSearchParamPart {}

export interface GraphDataPointsModel {
    dataPoints: DataPointModel[];
    totals: Record<string, number>;
    stats: Record<string, VisitMetricStats>;
    lastUpdated: string;
    cached: boolean;
}

export interface CombinedDataOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        EventMetricsParamParts,
        EventMetricsFilterParamParts,
        EventDimensionsParamParts,
        EventDimensionsFilterParamParts,
        DeprecatedShortPaginatedParamParts,
        MetricsSortParamParts,
        MetadataParamParts,
        BindOnLastSearchParamPart {
    /**
     * The format of the response. Default is 'JSON'.
     */
    format?: MetricsResponseFormat;
}

export interface CombinedDataModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    combinations: Array<Record<string, any>>;
    uniqueCounts: Record<string, number>;
    totalNumberOfResults: number;
    lastUpdated: number;
    cached: boolean;
}

export interface TopQueries {
    queryText?: string;
    pageSize?: number;
    pageNumber?: number;
    org: string;
}

export interface VisitsStatisticsOptions
    extends OrganizationParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        Partial<EventDimensionsParamParts>,
        EventDimensionsFilterParamParts,
        EventDimensionsExcludeFilterParamParts,
        EventDimensionsHideEventsFilterParamParts,
        DeprecatedShortPaginatedParamParts,
        MetricsSortParamParts,
        MetadataParamParts {}

export interface VisitStatisticsModel {
    visitId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: any[];
    numberOfEvents: number;
}

export interface VisitsStatisticsModel {
    visits: VisitStatisticsModel[];
    totalNumberOfVisits: number;
}

export type VisitViewOptions = OrganizationParamParts;
