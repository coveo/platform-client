import API from '../../../../APICore.js';
import {IntervalUnit} from '../../../Enums.js';
import {RegistrationModel} from '../../MachineLearningInterfaces.js';
import Models from '../Models.js';

jest.mock('../../../../APICore.js');

describe('Models', () => {
    let models: Models;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        models = new Models(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Models base url', async () => {
            await models.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Models.baseUrl);
        });

        it('should make a GET call to the Models base url if empty array is passed', async () => {
            await models.list([]);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Models.baseUrl);
        });

        it('should make a GET call to the Models base url with provided engineIds', async () => {
            const engines = ['first', 'second'];
            const expectedUrl = `${Models.baseUrl}?engines=${engines[0]}&engines=${engines[1]}`;
            await models.list(engines);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('listDetails', () => {
        it('should make a GET call to the specific Models url', async () => {
            await models.listDetails();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/details`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Model', async () => {
            const modelId = 'O. O';

            await models.get(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`);
        });
    });

    describe('getDetails', () => {
        it("should make a GET call to the specific Model's Details", async () => {
            const modelId = 'O. O';

            await models.getDetails(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}/details`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Models url', async () => {
            const modelId = 'O .O';

            await models.delete(modelId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Models url', async () => {
            const modelId = 'O .O';
            const registrationUpdate: RegistrationModel = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: IntervalUnit.DAY,
            };

            await models.update(modelId, registrationUpdate);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`, registrationUpdate);
        });
    });
});
