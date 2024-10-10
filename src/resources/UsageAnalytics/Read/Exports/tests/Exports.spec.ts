import API from '../../../../../APICore.js';
import {ExportScheduleFrequency} from '../../../../Enums.js';
import Exports from '../Exports.js';
import {
    CreateExportScheduleModel,
    EstimateExportParams,
    EstimateVisitExportParams,
    GenerateExportParams,
    GenerateExportWithBodyParams,
    GenerateVisitExportParams,
    GenerateVisitExportWithBodyParams,
} from '../ExportsInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Exports', () => {
    let exports: Exports;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        exports = new Exports(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the Exports base url', async () => {
            await exports.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Exports.baseUrl);
        });
    });

    describe('generate', () => {
        it('makes a POST call to the Exports base url', async () => {
            const params: GenerateExportParams = {
                from: '123',
                to: '456',
            };
            await exports.generate(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}?from=123&to=456`);
        });
    });

    describe('generateExportWithBody', () => {
        it('makes a POST call to the Exports base url with a request body', async () => {
            const params: GenerateExportWithBodyParams = {
                from: '123',
                to: '456',
            };
            await exports.generateExportWithBody(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/create`, params, undefined);
        });
    });

    describe('get', () => {
        it('makes a GET call to the specific Exports url', async () => {
            const exportId = '🌞';
            await exports.get(exportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}?redirect=false`);
        });
    });

    describe('getExportDownloadLink', () => {
        it('makes a GET call to the specific Exports url', async () => {
            const exportId = 'Soubame';
            await exports.getExportDownloadLink(exportId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}/downloadlink`);
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to the specific Exports url', async () => {
            const exportId = '🌞';
            await exports.delete(exportId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Exports.baseUrl}/${exportId}`);
        });
    });

    describe('estimateRowsCount', () => {
        it('makes a GET call to the specific Exports url', async () => {
            const params: EstimateExportParams = {
                from: '246',
                to: '135',
            };
            await exports.estimateRowsCount(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/estimate?from=246&to=135`);
        });
    });

    describe('generateVisitExport', () => {
        it('makes a POST call to the specific Exports url', async () => {
            const params: GenerateVisitExportParams = {
                from: '987',
                to: '654',
            };
            await exports.generateVisitExport(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/visits?from=987&to=654`);
        });
    });

    describe('generateVisitExportWithBody', () => {
        it('makes a POST call to the specific Exports url with a request body', async () => {
            const params: GenerateVisitExportWithBodyParams = {
                from: '987',
                to: '654',
            };
            await exports.generateVisitExportWithBody(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/visits/create`, params, undefined);
        });
    });

    describe('estimateVisitExportRowsCount', () => {
        it('makes a GET call to the specific Exports url', async () => {
            const params: EstimateVisitExportParams = {
                from: '741',
                to: '369',
            };
            await exports.estimateVisitExportRowsCount(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/visits/estimate?from=741&to=369`);
        });
    });

    describe('listSchedules', () => {
        it('makes a GET call to the specific Exports url', async () => {
            await exports.listSchedules();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules`);
        });
    });

    describe('createSchedule', () => {
        it('makes a POST call to the specific Exports url', async () => {
            const model: CreateExportScheduleModel = {
                frequency: ExportScheduleFrequency.monthly,
                timezone: 'Area51',
            };
            await exports.createSchedule(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules`, model);
        });
    });

    describe('getSchedule', () => {
        it('makes a GET call to the specific Exports url', async () => {
            const exportScheduleId = '🌞';
            await exports.getSchedule(exportScheduleId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`);
        });
    });

    describe('updateSchedule', () => {
        it('makes a PUT call to the specific Exports url', async () => {
            const exportScheduleId = '🌞';
            const model: CreateExportScheduleModel = {
                frequency: ExportScheduleFrequency.monthly,
                timezone: 'Area51',
            };
            await exports.updateSchedule(exportScheduleId, model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`, model);
        });
    });

    describe('deleteSchedule', () => {
        it('makes a DELETE call to the specific Exports url', async () => {
            const exportScheduleId = '🌞';
            await exports.deleteSchedule(exportScheduleId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Exports.baseUrl}/schedules/${exportScheduleId}`);
        });
    });

    describe('getRowLimit', () => {
        it('makes a GET call to the specific Exports url', async () => {
            await exports.getRowLimit();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/rowLimit`);
        });
    });

    describe('checkHealth', () => {
        it('makes a GET call to the specific Exports url', async () => {
            await exports.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('makes a GET call to the specific Exports url', async () => {
            await exports.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Exports.baseUrl}/status`);
        });
    });
});
