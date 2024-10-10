import API from '../../../../../APICore.js';
import {ReportType} from '../../../../Enums.js';
import Reports from '../Reports.js';
import {CreateReportModel, ReportAccessRequest, ReportAccessType, UpdateReportModel} from '../ReportsInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Reports', () => {
    let reports: Reports;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const testReportId = 'test-report-id';
    const testTemplateId = 'test-template-id';

    beforeEach(() => {
        jest.clearAllMocks();
        reports = new Reports(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Reports base url', async () => {
            await reports.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Reports.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call to the Reports base url for the specific ID', async () => {
            await reports.get(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Reports base url for the specific ID', async () => {
            const report: CreateReportModel = {
                allAnalyticsViewer: false,
                configuration: {},
                displayName: 'test-report',
                filters: [],
                type: ReportType.Dashboard,
            };

            await reports.create(report);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Reports.baseUrl, report);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the Reports base url for the specific ID', async () => {
            const report: UpdateReportModel = {
                allAnalyticsViewer: false,
                configuration: {},
                displayName: 'test-report',
                filters: [],
                type: ReportType.Dashboard,
            };

            await reports.update(testReportId, report);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`, report);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the Reports base url for the specific ID', async () => {
            await reports.delete(testReportId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}`);
        });
    });

    describe('getAccess', () => {
        it('should make a GET call to the specific report ID url for access', async () => {
            await reports.getAccess(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/access`);
        });
    });

    describe('setAccess', () => {
        it('should make a PUT call to the specific report ID url for access', async () => {
            const access: ReportAccessRequest = {
                accessType: ReportAccessType.Public,
                allowedGroups: [],
                allowedUsers: [],
            };

            await reports.setAccess(testReportId, access);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/access`, access);
        });
    });

    describe('getUsers', () => {
        it('should make a GET call to the specific report ID url for users', async () => {
            await reports.getUsers(testReportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/users`);
        });
    });

    describe('setUsers', () => {
        it('should make a PUT call to the specific report ID url for users', async () => {
            const users: string[] = [];

            await reports.setUsers(testReportId, users);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Reports.baseUrl}/${testReportId}/users`, users);
        });
    });

    describe('getReportTemplate', () => {
        it('should make a GET call to the Reports base url for the specific template ID', async () => {
            await reports.getReportTemplate(testTemplateId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/templates/${testTemplateId}`);
        });
    });

    describe('listReportTemplates', () => {
        it('should make a GET call to the Reports base url for templates', async () => {
            await reports.listReportTemplates(ReportType.Dashboard);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/templates?type=${ReportType.Dashboard}`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the specific report endpoint for healthchecks', async () => {
            await reports.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the specific report endpoint for service status', async () => {
            await reports.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Reports.baseUrl}/status`);
        });
    });
});
