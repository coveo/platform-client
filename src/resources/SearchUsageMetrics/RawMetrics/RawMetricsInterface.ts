import {SearchHubRawMetrics} from '../../Enums';

export interface DailyMetricParameters extends CommonMetricParameters {
    /**
     * The last day to report for
     * Format YYYY-MM-DD
     */
    to: string;

    /**
     * The first day to report for
     * Format YYYY-MM-DD
     */
    from: string;
}

export interface MonthlyMetricParameters extends CommonMetricParameters {
    /**
     * The last day to report for
     * Format YYYY-MM
     */
    to: string;

    /**
     * The first day to report for
     * Format YYYY-MM
     */
    from: string;
}

export interface MonthlyMetricsParameters {
    /**
     * The month to report for
     * Format YYYY-MM
     */
    month: string;

    /**
     * The minimum number of queries required for a search hub to be listed
     */
    minimumQueries?: string;
}

export interface RestListOfMetrics {
    /**
     * The list of metrics
     */
    metrics: RestMetric[];
}

export interface RestListOfMetricValues {
    /**
     * The list of daily metric values
     */
    values: RestMetricValueForDate[];
}

export interface RestListOfSearchHubMetrics {
    /**
     * The list of search hubs
     */
    searchHubs: RestSearchHubMetrics[];
}

interface RestMetric {
    /**
     * The ID of the metric
     */
    id: SearchHubRawMetrics;

    /**
     * The display name of the metric
     */
    label?: string;
}

interface RestMetricValueForDate {
    /**
     * The date for the usage metric value
     */
    date: string;

    /**
     * The numeric metric value (int64)
     */
    value: number;
}

interface RestSearchHubMetrics {
    /**
     * The name of the search hub
     */
    searchHub: string;

    /**
     * The usage buckets to which the search hub is assigned
     */
    assignement: SearchHubRawMetrics;

    /**
     * The number of normal queries (int64)
     */
    normalQueries: number;

    /**
     * The number of recommendation queries (int64)
     */
    recommendationQueries: number;

    /**
     * The number of distinct users (int64)
     */
    users: number;

    /**
     * The number of distinct persistent queries (int64)
     */
    staticQueries: number;

    /**
     * The number of product listing queries (int64)
     */
    productListingQueries: number;
}

interface CommonMetricParameters {
    /**
     * The raw metric to report on
     */
    metric: SearchHubRawMetrics;

    /**
     * The name of the search hub to report on
     */
    searchHub: string;
}
