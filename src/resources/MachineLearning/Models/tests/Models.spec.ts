import API from '../../../../APICore.js';
import {IntervalUnit} from '../../../Enums.js';
import {RegistrationModel} from '../../MachineLearningInterfaces.js';
import Models from '../Models.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Models', () => {
    let models: Models;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        models = new Models(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Models base url', () => {
            models.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Models.baseUrl);
        });

        it('should make a GET call to the Models base url if empty array is passed', () => {
            models.list([]);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Models.baseUrl);
        });

        it('should make a GET call to the Models base url with provided engineIds', () => {
            const engines = ['first', 'second'];
            const expectedUrl = `${Models.baseUrl}?engines=${engines[0]}&engines=${engines[1]}`;
            models.list(engines);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('listDetails', () => {
        it('should make a GET call to the specific Models url', () => {
            models.listDetails();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/details`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Model', () => {
            const modelId = 'O. O';

            models.get(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`);
        });
    });

    describe('getDetails', () => {
        it("should make a GET call to the specific Model's Details", () => {
            const modelId = 'O. O';

            models.getDetails(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}/details`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Models url', () => {
            const modelId = 'O .O';

            models.delete(modelId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Models url', () => {
            const modelId = 'O .O';
            const registrationUpdate: RegistrationModel = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: IntervalUnit.DAY,
            };

            models.update(modelId, registrationUpdate);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`, registrationUpdate);
        });
    });
});
