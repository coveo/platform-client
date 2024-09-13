export interface LimitModel {
    actualCount?: number;
    limit: number;
    lastUpdate?: string;
}

export interface LimitsModel {
    [name: string]: LimitModel;
}

export interface AllLimitsModel {
    [name: string]: LimitsModel;
}

export enum LimitType {
    USAGE = 'USAGE',
    TECHNICAL = 'TECHNICAL',
}

export interface LimitHistoryDataPointModel {
    /**
     * The date at which the limit value was set in number of milliseconds since UNIX epoch.
       Example: 1511049600000
     */
    date: number;
    /**
     * The limit value for the given date.
       Example: 49624
     */
    limitValue: number;
}

export interface LimitHistoryOptions {
    /**
     * The beginning of the date range for which to show limit history in ISO 8601 format.
     * Example:2022-05-08T01:30:00.000-05:00
     */
    from?: string;
    /**
     * The ending of the date range for which to show limit history in ISO 8601 format.
     * Example:2022-05-08T01:30:00.000-05:00
     */
    to?: string;
}
