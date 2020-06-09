import Resource from '../../../Resource';
import {
    CombinedDataModel,
    CombinedDataOptions,
    DeleteQueryOptions,
    GlobalDataOptions,
    GraphDataPointsModel,
    GraphDataPointsOptions,
    IncoherentEventsModel,
    IncoherentEventsOptions,
    MetricsModel,
    MonitoringHealthModel,
    ServiceStatus,
    TrendsModel,
    TrendsOptions,
    VisitsGraphDataPointsOptions,
    VisitsMetricsOptions,
    VisitsStatisticsModel,
    VisitsStatisticsOptions,
    VisitViewOptions,
} from './StatisticsInterfaces';

export default class Statistics extends Resource {
    static baseUrl = '/rest/ua/v15/stats';

    status() {
        return this.api.get<ServiceStatus>(`${Statistics.baseUrl}/status`);
    }

    listIncoherentEvents(options: IncoherentEventsOptions) {
        return this.api.get<IncoherentEventsModel>(this.buildPath(`${Statistics.baseUrl}/incoherentEvents`, options));
    }

    listGraphDataPoints(options: GraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(this.buildPath(`${Statistics.baseUrl}/graphDataPoints`, options));
    }

    listGlobalData(options: GlobalDataOptions) {
        return this.api.get<MetricsModel>(this.buildPath(`${Statistics.baseUrl}/globalData`, options));
    }

    listTrends(options: TrendsOptions) {
        return this.api.get<TrendsModel>(this.buildPath(`${Statistics.baseUrl}/trends`, options));
    }

    listVisitsMetrics(options: VisitsMetricsOptions) {
        return this.api.get<MetricsModel>(this.buildPath(`${Statistics.baseUrl}/visitsMetrics`, options));
    }

    listVisitsGraphDataPoints(options: VisitsGraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(
            this.buildPath(`${Statistics.baseUrl}/visitsGraphDataPoints`, options)
        );
    }

    delete(queryId: string, options: DeleteQueryOptions) {
        return this.api.delete(this.buildPath(`${Statistics.baseUrl}/query/${queryId}`, options));
    }

    listCombinedData(options: CombinedDataOptions) {
        return this.api.get<CombinedDataModel>(this.buildPath(`${Statistics.baseUrl}/combinedData`, options));
    }

    listTopQueries() {
        return this.api.get<string[]>(`${Statistics.baseUrl}/topQueries`);
    }

    getMonitoringHealth() {
        return this.api.get<MonitoringHealthModel>(`${Statistics.baseUrl}/monitoring/health`);
    }

    listVisits(options: VisitsStatisticsOptions) {
        return this.api.get<VisitsStatisticsModel>(this.buildPath(`${Statistics.baseUrl}/visits`, options));
    }

    updateVisitView(orgId: VisitViewOptions) {
        return this.api.post(this.buildPath(`${Statistics.baseUrl}/visits`, orgId));
    }
}
