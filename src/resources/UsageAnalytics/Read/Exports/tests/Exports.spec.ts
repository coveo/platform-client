import API from '../../../../../APICore';
import {ExportScheduleFrequency} from '../../../../Enums';
import Exports from '../Exports';
import {
    CreateExportScheduleModel,
    EstimateExportParams,
    EstimateVisitExportParams,
    GenerateExportParams,
    GenerateVisitExportParams,
} from '../ExportsInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Exports', () => {
    let exports: Exports;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        exports = new Exports(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the Exports base url', () => {
            exports.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Exports.baseUrl);
        });
    });

    describe('generate', () => {
        it('makes a POST call to the Exports base url', () => {
            const params: GenerateExportParams = {
                from: '123',
                to: '456',
            };
            exports.generate(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}?from=123&to=456`);
        });
    });

    describe('get', () => {
        it('makes a GET call to the specific Exports url', () => {
            const exportId = '🌞';
            exports.get(exportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}?redirect=false`);
        });
    });

    describe('getExportDownloadLink', () => {
        it('makes a GET call to the specific Exports url', () => {
            const exportId = 'Soubame';
            exports.getExportDownloadLink(exportId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}/downloadlink`);
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to the specific Exports url', () => {
            const exportId = '🌞';
            exports.delete(exportId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}`);
        });
    });

    describe('estimateRowsCount', () => {
        it('makes a GET call to the specific Exports url', () => {
            const params: EstimateExportParams = {
                from: '246',
                to: '135',
            };
            exports.estimateRowsCount(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/estimate?from=246&to=135`);
        });
    });

    describe('getStatus', () => {
        it('makes a GET call to the specific Exports url', () => {
            exports.getStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/status`);
        });
    });

    describe('checkHealth', () => {
        it('makes a GET call to the specific Exports url', () => {
            exports.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/monitoring/health`);
        });
    });

    describe('generateVisitExport', () => {
        it('makes a POST call to the specific Exports url', () => {
            const params: GenerateVisitExportParams = {
                from: '987',
                to: '654',
            };
            exports.generateVisitExport(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/visits?from=987&to=654`);
        });
    });

    describe('estimateVisitExportRowsCount', () => {
        it('makes a GET call to the specific Exports url', () => {
            const params: EstimateVisitExportParams = {
                from: '741',
                to: '369',
            };
            exports.estimateVisitExportRowsCount(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/visits/estimate?from=741&to=369`);
        });
    });

    describe('listSchedules', () => {
        it('makes a GET call to the specific Exports url', () => {
            exports.listSchedules();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules`);
        });
    });

    describe('createSchedule', () => {
        it('makes a POST call to the specific Exports url', () => {
            const model: CreateExportScheduleModel = {
                frequency: ExportScheduleFrequency.monthly,
                timezone: 'Area51',
            };
            exports.createSchedule(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules`, model);
        });
    });

    describe('getSchedule', () => {
        it('makes a GET call to the specific Exports url', () => {
            const exportScheduleId = '🌞';
            exports.getSchedule(exportScheduleId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`);
        });
    });

    describe('updateSchedule', () => {
        it('makes a PUT call to the specific Exports url', () => {
            const exportScheduleId = '🌞';
            const model: CreateExportScheduleModel = {
                frequency: ExportScheduleFrequency.monthly,
                timezone: 'Area51',
            };
            exports.updateSchedule(exportScheduleId, model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`, model);
        });
    });

    describe('deleteSchedule', () => {
        it('makes a DELETE call to the specific Exports url', () => {
            const exportScheduleId = '🌞';
            exports.deleteSchedule(exportScheduleId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`);
        });
    });
});
