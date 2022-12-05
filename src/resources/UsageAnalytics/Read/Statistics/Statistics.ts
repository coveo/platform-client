import ReadServiceResource from '../ReadServiceResource';
import {
    CombinedDataModel,
    CombinedDataOptions,
    CancelQueryOptions,
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
    DeleteQueryOptions,
} from './StatisticsInterfaces';

export default class Statistics extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/stats';

    /**
     * Get the statistics service status.
     */
    status() {
        return this.api.get<ServiceStatus>(`${Statistics.baseUrl}/status`);
    }

    /**
     * Get the incoherent events for a date range.
     */
    listIncoherentEvents(options: IncoherentEventsOptions) {
        return this.api.get<IncoherentEventsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/incoherentEvents`, options)
        );
    }

    /**
     * Get graph data points for the metrics for a date range.
     */
    listGraphDataPoints(options: GraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/graphDataPoints`, options)
        );
    }

    /**
     * Get global data for each metric for a date range.
     */
    listGlobalData(options: GlobalDataOptions) {
        return this.api.get<MetricsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/globalData`, options));
    }

    /**
     * Get trends of a metric combined with dimensions for a date range.
     */
    listTrends(options: TrendsOptions) {
        return this.api.get<TrendsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/trends`, options));
    }

    /**
     * Get the metrics based on the visits matching the specified criteria.
     */
    listVisitsMetrics(options: VisitsMetricsOptions) {
        return this.api.get<MetricsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/visitsMetrics`, options));
    }

    /**
     * Get graph data points for visit based metrics for a date range.
     */
    listVisitsGraphDataPoints(options: VisitsGraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/visitsGraphDataPoints`, options)
        );
    }

    /**
     * Cancel the execution of a query.
     * This is a best effort; there is no guarantee that the query will be cancelled.
     * If the query is cancelled, the sender of the now cancelled query will receive a 409 Conflict.
     *
     * @param queryId The id of the query to cancel.
     */
    cancelQuery(queryId: string, options: CancelQueryOptions) {
        return this.api.delete(this.buildPathWithOrg(`${Statistics.baseUrl}/query/${queryId}`, options));
    }

    /**
     * Please use {@link cancelQuery} instead.
     *
     * @deprecated
     */
    delete(queryId: string, options: DeleteQueryOptions) {
        return this.cancelQuery(queryId, options);
    }

    /**
     * Get metrics combined with dimensions for a date range.
     */
    listCombinedData(options: CombinedDataOptions) {
        return this.api.get<CombinedDataModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/combinedData`, options));
    }

    /**
     * This call no longer exists on the API, it will be removed.
     *
     * @deprecated
     */
    listTopQueries() {
        return this.api.get<string[]>(`${Statistics.baseUrl}/topQueries`);
    }

    /**
     * Health check for the statistics service.
     */
    getMonitoringHealth() {
        return this.api.get<MonitoringHealthModel>(`${Statistics.baseUrl}/monitoring/health`);
    }

    /**
     * Get the details of the visits matching the specified criteria.
     */
    listVisits(options: VisitsStatisticsOptions) {
        return this.api.get<VisitsStatisticsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/visits`, options));
    }

    /**
     * Force a visit view update.
     */
    updateVisitView(options: VisitViewOptions) {
        return this.api.post(this.buildPathWithOrg(`${Statistics.baseUrl}/visits`, options));
    }
}
