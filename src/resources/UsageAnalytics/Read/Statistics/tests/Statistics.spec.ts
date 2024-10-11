import API from '../../../../../APICore.js';
import Statistics from '../Statistics.js';
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
} from '../StatisticsInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Statistics', () => {
    let statistics: Statistics;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        statistics = new Statistics(api, serverlessApi);
    });

    describe('cancelQuery', () => {
        it('should make a DELETE call to the specific Statistics url', async () => {
            const queryId = 'Jida';
            const options: CancelQueryOptions = {
                org: 'tuna-durgod',
            };
            await statistics.cancelQuery(queryId, options);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Statistics.baseUrl}/query/${queryId}?org=tuna-durgod`);
        });
    });

    describe('update', () => {
        it('should make a POST call to the specific Statistics url', async () => {
            const options: VisitViewOptions = {
                org: 'CouliliZazou',
            };

            await statistics.updateVisitView(options);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Statistics.baseUrl}/visits?org=CouliliZazou`);
        });
    });

    describe('listIncoherentEvents', () => {
        it('should make a GET call to /v15/stats/incoherentEvents with specific options', async () => {
            const options: IncoherentEventsOptions = {
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listIncoherentEvents(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/incoherentEvents?org=yes&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listGraphDataPoints', () => {
        it('should make a GET call to /v15/stats/graphDataPoints with specific options', async () => {
            const options: GraphDataPointsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'no-thanks',
            };
            await statistics.listGraphDataPoints(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/graphDataPoints?org=no-thanks&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listGlobalData', () => {
        it('should make a GET call to /v15/stats/globalData with specific options', async () => {
            const options: GlobalDataOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'no-thanks',
            };
            await statistics.listGlobalData(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/globalData?org=no-thanks&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listTrends', () => {
        it('should make a GET call to /v15/stats/trends with specific options', async () => {
            const options: TrendsOptions = {
                m: ['UniqueVisit'],
                d: ['HASCLICK'],
                t: ['percent(UniqueVisit)'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listTrends(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/trends?org=yes&m=UniqueVisit&d=HASCLICK&t=percent%28UniqueVisit%29&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listVisitsMetrics', () => {
        it('should make a GET call to /v15/stats/visitsMetrics with specific options', async () => {
            const options: VisitsMetricsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listVisitsMetrics(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visitsMetrics?org=yes&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listVisitsGraphDataPoints', () => {
        it('should make a GET call to /v15/stats/visitsGraphDataPoints with specific options', async () => {
            const options: VisitsGraphDataPointsOptions = {
                m: ['UniqueVisit'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listVisitsGraphDataPoints(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visitsGraphDataPoints?org=yes&m=UniqueVisit&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listCombinedData', () => {
        it('should make a GET call to /v15/stats/combinedData with specific options', async () => {
            const options: CombinedDataOptions = {
                m: ['UniqueVisit'],
                d: ['HASCLICK'],
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listCombinedData(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/combinedData?org=yes&m=UniqueVisit&d=HASCLICK&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('listVisits', () => {
        it('should make a GET call to /v15/stats/visits with specific options', async () => {
            const options: VisitsStatisticsOptions = {
                from: '2020-05-12T00:00:00.000Z',
                to: '2020-05-14T00:00:00.000Z',
                org: 'yes',
            };
            await statistics.listVisits(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statistics.baseUrl}/visits?org=yes&from=2020-05-12T00%3A00%3A00.000Z&to=2020-05-14T00%3A00%3A00.000Z`,
            );
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the specific Statistics url', async () => {
            await statistics.checkHealth();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Statistics.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the Statistics status url', async () => {
            await statistics.checkStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Statistics.baseUrl}/status`);
        });
    });
});
