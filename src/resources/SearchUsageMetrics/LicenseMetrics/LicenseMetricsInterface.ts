export interface RestListOfMetricsModel {
    /**
     * The list of metrics
     */
    metrics: RestMetricsModel[];
}

export interface RestMetricsModel {
    /**
     * The id of the metric
     */
    id: string;
    /**
     * The display name of the metric
     */
    label?: string;
}

export interface RestListOfMetricValues {
    /**
     * The list of daily metric values
     */
    values: RestMetricValueForDate[];
}

export interface RestMetricValueForDate {
    /**
     * The date for the usage metric value
     */
    date: string;
    /**
     * The numeric metric value
     */
    value: number;
}

export interface ListLicenseMonthlyParams {
    /**
     * When appropriate, the size of the sliding window to use, in months.
     * If this parameter is not specified the default sliding window for the metric will be used
     */
    slidingWindow?: number;
    /**
     * the last month to report for.
     * format YYYY-MM
     */
    to: string;
    /**
     * the first month to report for.
     * format YYYY-MM
     */
    from: string;
}
