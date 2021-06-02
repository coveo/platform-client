import API from '../../../../../APICore';
import Filters from '../Filters';
import {CreateReportingFilterModel, UpdateReportingFilterModel} from '../FiltersInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Filters', () => {
    let filters: Filters;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const testFilterId = 'reporting-filter-id';

    beforeEach(() => {
        jest.clearAllMocks();
        filters = new Filters(api, serverlessApi);
    });

    describe('Reporting filters', () => {
        describe('list', () => {
            it('should make a GET call to the reporting filters base url', () => {
                filters.listReportFilters();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(Filters.reportingBaseUrl);
            });
        });

        describe('get', () => {
            it('should make a GET call to the reporting filters base url for the specific ID', () => {
                filters.getReportFilter(testFilterId);

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`);
            });
        });

        describe('create', () => {
            it('should make a POST call to the reporting filters base url for the specific ID', () => {
                const filter: CreateReportingFilterModel = {displayName: 'test', value: 'filter'};

                filters.createReportFilter(filter);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}`, filter);
            });
        });

        describe('update', () => {
            it('should make a PUT call to the reporting filters base url for the specific ID', () => {
                const filter: UpdateReportingFilterModel = {displayName: 'test', value: 'filter'};

                filters.updateReportFilter(testFilterId, filter);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`, filter);
            });
        });

        describe('delete', () => {
            it('should make a DELETE call to the reporting filters base url for the specific ID', () => {
                filters.deleteReportFilter(testFilterId);

                expect(api.delete).toHaveBeenCalledTimes(1);
                expect(api.delete).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`);
            });
        });
    });
});
