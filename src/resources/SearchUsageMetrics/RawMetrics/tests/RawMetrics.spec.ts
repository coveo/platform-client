import {SearchHubRawMetrics} from '../../..';
import API from '../../../../APICore';
import RawMetrics from '../RawMetrics';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('RawMetrics', () => {
    let RawMetricsService: RawMetrics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        RawMetricsService = new RawMetrics(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to fetch all the available metrics for assignment', () => {
            RawMetricsService.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${RawMetrics.baseUrl}all`);
        });
    });

    describe('listMonthly', () => {
        const month = '2021-04';
        const minimumQueries = '12';

        it('makes a GET call to fetch a list raw metric value for a specific month', () => {
            RawMetricsService.listMonthly({month});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${RawMetrics.baseUrl}monthly?month=${month}`);
        });

        it('makes a GET call to fetch a list raw metric value with a number of queries equal or above for a specific month if the minimumQueries parameter is set', () => {
            RawMetricsService.listMonthly({month, minimumQueries});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}monthly?month=${month}&minimumQueries=${minimumQueries}`
            );
        });
    });

    describe('getDaily', () => {
        const metric = SearchHubRawMetrics.normalQueries;
        const searchHub = 'hello';
        const to = '2021-01-13';
        const from = '2021-01-06';

        it('makes a GET call to fetch all daily raw values from a metric and search hub that are included in the range specified', () => {
            RawMetricsService.getDaily({metric, searchHub, to, from});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}searchhubs/${searchHub}/daily/${metric}?to=${to}&from=${from}`
            );
        });
    });

    describe('getMonthly', () => {
        const metric = SearchHubRawMetrics.normalQueries;
        const searchHub = 'hello';
        const to = '2021-04';
        const from = '2021-01';

        it('makes a GET call to fetch all monthly raw values from a metric and search hub that are included in the range specified', () => {
            RawMetricsService.getMonthly({metric, searchHub, to, from});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}searchhubs/${searchHub}/monthly/${metric}?to=${to}&from=${from}`
            );
        });
    });
});
