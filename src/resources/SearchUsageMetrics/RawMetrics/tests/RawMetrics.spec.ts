import {SearchHubRawMetrics} from '../../../index.js';
import API from '../../../../APICore.js';
import RawMetrics from '../RawMetrics.js';

jest.mock('../../../../APICore.js');

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
        const month = {year: 2021, month: 4};
        const minimumQueries = 12;

        it('makes a GET call to fetch a list raw metric value for a specific month', () => {
            const expectedMonthFormat = '2021-04';

            RawMetricsService.listMonthly({month});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${RawMetrics.baseUrl}monthly?month=${expectedMonthFormat}`);
        });

        it('makes a GET call to fetch a list raw metric value with a number of queries equal or above for a specific month if the minimumQueries parameter is set', () => {
            const expectedMonthFormat = '2021-04';

            RawMetricsService.listMonthly({month, minimumQueries});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}monthly?month=${expectedMonthFormat}&minimumQueries=${minimumQueries}`,
            );
        });
    });

    describe('getDaily', () => {
        const metric = SearchHubRawMetrics.normalQueries;
        const searchHub = 'hello';
        const to = {year: 2021, month: 2, day: 12};
        const from = {year: 2020, month: 3, day: 26};

        it('makes a GET call to fetch all daily raw values from a metric and search hub that are included in the range specified', () => {
            const expectedFromDate = '2020-03-26';
            const expectedToDate = '2021-02-12';

            RawMetricsService.getDaily({metric, searchHub, to, from});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}searchhubs/${searchHub}/daily/${metric}?to=${expectedToDate}&from=${expectedFromDate}`,
            );
        });
    });

    describe('getMonthly', () => {
        const metric = SearchHubRawMetrics.normalQueries;
        const searchHub = 'hello';
        const to = {year: 2021, month: 2};
        const from = {year: 2020, month: 3};

        it('makes a GET call to fetch all monthly raw values from a metric and search hub that are included in the range specified', () => {
            const expectedFromDate = '2020-03';
            const expectedToDate = '2021-02';

            RawMetricsService.getMonthly({metric, searchHub, to, from});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${RawMetrics.baseUrl}searchhubs/${searchHub}/monthly/${metric}?to=${expectedToDate}&from=${expectedFromDate}`,
            );
        });
    });
});
