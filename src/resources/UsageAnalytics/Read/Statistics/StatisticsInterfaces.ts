export interface ServiceStatus {
    status: string;
}

export interface MetricValue {
    value: number;
}

export interface MetricStats {
    average: number;
    total: number;
    peak: number;
}

export interface IncoherentEventsOptions {
    from: string;
    to: string;
    errorCodes?: string[];
    p?: number;
    n?: number;
    asc?: boolean;
    includeMetadata?: boolean;
    seen?: boolean;
    org: string;
}

export interface IncoherentEventModel {
    errorCode: string;
    datetime: string;
    event: any;
}

export interface IncoherentEventsModel {
    events: IncoherentEventModel[];
    uniqueCounts: any;
    totalNumberOfResults: number;
}

export interface MetricsModel {
    globalDatas: Record<string, MetricValue | MetricStats>;
    lastUpdated: number;
    cached: boolean;
}

export interface GlobalDataOptions {
    m: string[];
    from: string;
    to: string;
    tz?: string;
    d?: string[];
    f?: string[];
    i?: string;
    bindOnLastSearch?: boolean;
    org: string;
}

export interface TrendsModel {
    combinations: Array<Record<string, any>>;
    uniqueCounts: Record<string, number>;
    totalNumberOfResults: number;
    lastUpdated: number;
    cached: boolean;
}

export interface TrendsOptions {
    m: string[];
    from: string;
    to: string;
    previousFrom?: string;
    previousTo?: string;
    tz?: string;
    d: string[];
    f?: string[];
    fm?: string[];
    s?: string;
    p?: number;
    n?: number;
    asc?: boolean;
    includeMetadata?: boolean;
    format?: string;
    bindOnLastSearch?: boolean;
    t: string[];
    org: string;
}

export interface VisitsMetricsOptions {
    m: string[];
    from: string;
    to: string;
    tz?: string;
    f?: string[];
    hideEventFilters?: string[];
    fn?: string[];
    org: string;
}

export interface VisitMetricStats {
    sum: number;
    average: number;
    min: number;
    max: number;
}

export interface VisitsGraphDataPointsOptions {
    m: string[];
    from: string;
    to: string;
    tz?: string;
    f?: string[];
    hideEventFilters?: string[];
    fn?: string[];
    i?: string;
    org: string;
}

export interface DeleteQueryOptions {
    org: string;
}

export interface DataPointModel {
    dateTime: number;
    datas: Record<string, number>;
}

export interface GraphDataPointsOptions {
    m: string[];
    from: string;
    to: string;
    tz?: string;
    f?: string[];
    i?: string[];
    bindOnLastSearch?: boolean;
    org: string;
}

export interface GraphDataPointsModel {
    dataPoints: DataPointModel[];
    totals: Record<string, number>;
    stats: Record<string, VisitMetricStats>;
    lastUpdated: string;
    cached: boolean;
}

export interface CombinedDataOptions {
    m: string[];
    from: string;
    to: string;
    tz?: string;
    d: string[];
    f?: string[];
    fm?: string[];
    s?: string;
    p?: number;
    n?: number;
    asc?: boolean;
    includeMetadata?: boolean;
    format?: boolean;
    bindOnLastSearch?: boolean;
    org: string;
}

export interface CombinedDataModel {
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

export interface MonitoringHealthModel {
    status: string;
}

export interface VisitsStatisticsOptions {
    from: string;
    to: string;
    tz?: string;
    d?: string[];
    f?: string[];
    hideEventFilters?: string[];
    fn?: string[];
    s?: string;
    p?: number;
    n?: number;
    asc?: boolean;
    includeMetadata?: boolean;
    org: string;
}

export interface VisitStatisticsModel {
    visitId: string;
    events: any[];
    numberOfEvents: number;
}

export interface VisitsStatisticsModel {
    visits: VisitStatisticsModel[];
    totalNumberOfVisits: number;
}

export interface VisitViewOptions {
    org: string;
}
