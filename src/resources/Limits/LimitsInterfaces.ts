export interface LimitModel {
    actualCount?: number;
    limit: number;
}

export interface LimitsModel {
    [name: string]: LimitModel;
}

export interface AllLimitsModel {
    [name: string]: LimitsModel;
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
