import API from '../../../../../APICore';
import Statistics from '../Statistics';
import {
    CombinedDataOptions,
    CancelQueryOptions,
    GlobalDataOptions,
    GraphDataPointsOptions,
    IncoherentEventsOptions,
    TrendsOptions,
    VisitsGraphDataPointsOptions,
    VisitsMetricsOptions,
    VisitsStatisticsOptions,
    VisitViewOptions,
} from '../StatisticsInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Statistics', () => {
    let statistics: Statistics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        statistics = new Statistics(api, serverlessApi);
    });

    describe('status', () => {
        it('should make a GET call to the Statistics status url', () => {
            statistics.status();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Statistics.baseUrl}/status`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Statistics url', () => {
            const queryId = 'Jida';
            const options: CancelQueryOptions = {
                org: 'tuna-durgod',
            };
            statistics.cancelQuery(queryId, options);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Statistics.baseUrl}/query/${queryId}?org=tuna-durgod`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Statistics url', () => {
            statistics.getMonitoringHealth();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Statistics.baseUrl}/monitoring/health`);
        });
    });

    describe('update', () => {
        it('should make a POST call to the specific Statistics url', () => {
            const options: VisitViewOptions = {
                org: 'CouliliZazou',
            };

            statistics.updateVisitView(options);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Statistics.baseUrl}/visits?org=CouliliZazou`);
        });
    });

    describe('listIncoherentEvents', () => {
        it('should make a GET call to /v15/stats/incoherentEvents with specific options', () => {
            const options: IncoherentEventsOptions = {
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listIncoherentEvents(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/incoherentEvents?org=yes&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listGraphDataPoints', () => {
        it('should make a GET call to /v15/stats/graphDataPoints with specific options', () => {
            const options: GraphDataPointsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'no-thanks',
            };
            statistics.listGraphDataPoints(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/graphDataPoints?org=no-thanks&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listGlobalData', () => {
        it('should make a GET call to /v15/stats/globalData with specific options', () => {
            const options: GlobalDataOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'no-thanks',
            };
            statistics.listGlobalData(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/globalData?org=no-thanks&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listTrends', () => {
        it('should make a GET call to /v15/stats/trends with specific options', () => {
            const options: TrendsOptions = {
                m: ['UniqueVisit'],
                d: ['HASCLICK'],
                t: ['percent(UniqueVisit)'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listTrends(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/trends?org=yes&m=UniqueVisit&d=HASCLICK&t=percent%28UniqueVisit%29&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listVisitsMetrics', () => {
        it('should make a GET call to /v15/stats/visitsMetrics with specific options', () => {
            const options: VisitsMetricsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listVisitsMetrics(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visitsMetrics?org=yes&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listVisitsGraphDataPoints', () => {
        it('should make a GET call to /v15/stats/visitsGraphDataPoints with specific options', () => {
            const options: VisitsGraphDataPointsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listVisitsGraphDataPoints(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visitsGraphDataPoints?org=yes&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listCombinedData', () => {
        it('should make a GET call to /v15/stats/combinedData with specific options', () => {
            const options: CombinedDataOptions = {
                m: ['UniqueVisit'],
                d: ['HASCLICK'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listCombinedData(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/combinedData?org=yes&m=UniqueVisit&d=HASCLICK&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listTopQueries', () => {
        it('should make a GET call to /v15/stats/topQueries with specific options', () => {
            statistics.listTopQueries();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Statistics.baseUrl}/topQueries`);
        });
    });

    describe('listVisits', () => {
        it('should make a GET call to /v15/stats/visits with specific options', () => {
            const options: VisitsStatisticsOptions = {
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            statistics.listVisits(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visits?org=yes&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`
            );
        });
    });
});
