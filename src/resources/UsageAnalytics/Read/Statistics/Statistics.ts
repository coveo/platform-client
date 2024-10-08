import {ReadServiceHealthApi, ReadServiceHealthResponse, ReadServiceStatusResponse} from '../ReadServiceCommon.js';
import ReadServiceResource from '../ReadServiceResource.js';
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
    TrendsModel,
    TrendsOptions,
    VisitsGraphDataPointsOptions,
    VisitsMetricsOptions,
    VisitsStatisticsModel,
    VisitsStatisticsOptions,
    VisitViewOptions,
} from './StatisticsInterfaces.js';

export default class Statistics extends ReadServiceResource implements ReadServiceHealthApi {
    static baseUrl = '/rest/ua/v15/stats';

    /**
     * Get the incoherent events for a date range.
     * @param options
     */
    listIncoherentEvents(options: IncoherentEventsOptions) {
        return this.api.get<IncoherentEventsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/incoherentEvents`, options),
        );
    }

    /**
     * Get graph data points for the metrics for a date range.
     * @param options
     */
    listGraphDataPoints(options: GraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/graphDataPoints`, options),
        );
    }

    /**
     * Get global data for each metric for a date range.
     * @param options
     */
    listGlobalData(options: GlobalDataOptions) {
        return this.api.get<MetricsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/globalData`, options));
    }

    /**
     * Get trends of a metric combined with dimensions for a date range.
     * @param options
     */
    listTrends(options: TrendsOptions) {
        return this.api.get<TrendsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/trends`, options));
    }

    /**
     * Get the metrics based on the visits matching the specified criteria.
     * @param options
     */
    listVisitsMetrics(options: VisitsMetricsOptions) {
        return this.api.get<MetricsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/visitsMetrics`, options));
    }

    /**
     * Get graph data points for visit based metrics for a date range.
     * @param options
     */
    listVisitsGraphDataPoints(options: VisitsGraphDataPointsOptions) {
        return this.api.get<GraphDataPointsModel>(
            this.buildPathWithOrg(`${Statistics.baseUrl}/visitsGraphDataPoints`, options),
        );
    }

    /**
     * Cancel the execution of a query.
     * This is a best effort; there is no guarantee that the query will be cancelled.
     * If the query is cancelled, the sender of the now cancelled query will receive a 409 Conflict.
     * @param queryId The id of the query to cancel.
     * @param options
     */
    cancelQuery(queryId: string, options: CancelQueryOptions) {
        return this.api.delete(this.buildPathWithOrg(`${Statistics.baseUrl}/query/${queryId}`, options));
    }

    /**
     * Get metrics combined with dimensions for a date range.
     * @param options
     */
    listCombinedData(options: CombinedDataOptions) {
        return this.api.get<CombinedDataModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/combinedData`, options));
    }

    /**
     * Get the details of the visits matching the specified criteria.
     * @param options
     */
    listVisits(options: VisitsStatisticsOptions) {
        return this.api.get<VisitsStatisticsModel>(this.buildPathWithOrg(`${Statistics.baseUrl}/visits`, options));
    }

    /**
     * Force a visit view update.
     * @param options
     */
    updateVisitView(options: VisitViewOptions) {
        return this.api.post(this.buildPathWithOrg(`${Statistics.baseUrl}/visits`, options));
    }

    checkHealth() {
        return this.api.get<ReadServiceHealthResponse>(`${Statistics.baseUrl}/monitoring/health`);
    }

    checkStatus() {
        return this.api.get<ReadServiceStatusResponse>(`${Statistics.baseUrl}/status`);
    }
}
