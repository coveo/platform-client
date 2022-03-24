import {SearchHubRawMetrics} from '../../Enums';

export interface DailyRawMetricParameters extends CommonMetricParameters {
    /**
     * The first day to report for
     */
    from: DateWithoutTime;

    /**
     * The last day to report for
     */
    to: DateWithoutTime;
}

export interface MonthlyRawMetricParameters extends CommonMetricParameters {
    /**
     * The first month to report for
     */
    from: DateWithoutTimeAndDay;

    /**
     * The last month to report for
     */
    to: DateWithoutTimeAndDay;
}

export interface MonthlyRawMetricsParameters {
    /**
     * The month to report for
     */
    month: DateWithoutTimeAndDay;

    /**
     * The minimum number of queries required for a search hub to be listed
     */
    minimumQueries?: number;
}

export interface RestListOfRawMetrics {
    /**
     * The list of metrics
     */
    metrics: RestMetric[];
}

export interface RestListOfRawMetricValues {
    /**
     * The list of daily metric values
     */
    values: RestMetricValueForDate[];
}

export interface RestListOfSearchHubRawMetrics {
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
     * The numeric metric value
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
    assignment: SearchHubRawMetrics;

    /**
     * The number of normal queries
     */
    normalQueries: number;

    /**
     * The number of recommendation queries
     */
    recommendationQueries: number;

    /**
     * The number of distinct users
     */
    users: number;

    /**
     * The number of distinct persistent queries
     */
    staticQueries: number;

    /**
     * The number of product listing queries
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

interface DateWithoutTime {
    /**
     * Year of the selected date
     */
    year: number;

    /**
     * Month of the selected date
     * Between 1 to 12
     */
    month: number;

    /**
     * Day of the selected date
     * Between 1 to 31
     */
    day: number;
}

type DateWithoutTimeAndDay = Omit<DateWithoutTime, 'day'>;
