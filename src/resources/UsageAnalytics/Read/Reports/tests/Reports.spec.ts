import API from '../../../../../APICore.js';
import {ReportType} from '../../../../Enums.js';
import Reports from '../Reports.js';
import {CreateReportModel, ReportAccessRequest, ReportAccessType, UpdateReportModel} from '../ReportsInterfaces.js';

jest.mock('../../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Reports', () => {
    let reports: Reports;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const testReportId = 'test-report-id';
    const testTemplateId = 'test-template-id';

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

    describe('getAccess', () => {
        it('should make a GET call to the specific report ID url for access', () => {
            reports.getAccess(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/access`);
        });
    });

    describe('setAccess', () => {
        it('should make a PUT call to the specific report ID url for access', () => {
            const access: ReportAccessRequest = {
                accessType: ReportAccessType.Public,
                allowedGroups: [],
                allowedUsers: [],
            };

            reports.setAccess(testReportId, access);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/access`, access);
        });
    });

    describe('getUsers', () => {
        it('should make a GET call to the specific report ID url for users', () => {
            reports.getUsers(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/users`);
        });
    });

    describe('setUsers', () => {
        it('should make a PUT call to the specific report ID url for users', () => {
            const users: string[] = [];

            reports.setUsers(testReportId, users);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/users`, users);
        });
    });

    describe('getReportTemplate', () => {
        it('should make a GET call to the Reports base url for the specific template ID', () => {
            reports.getReportTemplate(testTemplateId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/templates/${testTemplateId}`);
        });
    });

    describe('listReportTemplates', () => {
        it('should make a GET call to the Reports base url for templates', () => {
            reports.listReportTemplates(ReportType.Dashboard);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/templates?type=${ReportType.Dashboard}`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the specific report endpoint for healthchecks', () => {
            reports.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the specific report endpoint for service status', () => {
            reports.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/status`);
        });
    });
});
