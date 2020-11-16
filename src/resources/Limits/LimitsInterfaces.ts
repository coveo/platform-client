export interface LimitModel {
    actualCount?: number;
    limit: number;
}

export interface LimitsModel {
    [name: string]: LimitModel;
}
