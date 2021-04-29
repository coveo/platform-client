import API from '../../../../../APICore';
import {ReportType} from '../../../../Enums';
import Reports from '../Reports';
import {CreateReportModel, UpdateReportModel} from '../ReportsInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Reports', () => {
    let reports: Reports;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const testReportId = 'test-report-id';

    beforeEach(() => {
        jest.clearAllMocks();
        reports = new Reports(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Reports base url', () => {
            reports.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Reports.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call to the Reports base url for the specific ID', () => {
            reports.get(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Reports base url for the specific ID', () => {
            const report: CreateReportModel = {
                allAnalyticsViewer: false,
                configuration: {},
                displayName: 'test-report',
                filters: [],
                type: ReportType.Dashboard,
            };

            reports.create(report);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Reports.baseUrl, report);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the Reports base url for the specific ID', () => {
            const report: UpdateReportModel = {
                allAnalyticsViewer: false,
                configuration: {},
                displayName: 'test-report',
                filters: [],
                type: ReportType.Dashboard,
            };

            reports.update(testReportId, report);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`, report);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the Reports base url for the specific ID', () => {
            reports.delete(testReportId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`);
        });
    });
});
