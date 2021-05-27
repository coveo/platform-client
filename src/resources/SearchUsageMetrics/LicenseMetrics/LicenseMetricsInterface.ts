export interface RestListOfMetricsModel {
    metrics: RestMetricsModel[];
}

export interface RestMetricsModel {
    id: string;
    label: string;
}

export interface RestListOfMetricValues {
    values: RestMetricValueForDate[];
}

export interface RestMetricValueForDate {
    date: string;
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
