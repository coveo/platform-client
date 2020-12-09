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
