import API from '../../../../APICore';
import {RegistrationModel} from '../../MachineLearningInterfaces';
import ModelInformation from '../ModelInformation';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ModelInformation', () => {
    let modelInfo: ModelInformation;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        modelInfo = new ModelInformation(api);
    });

    describe('get', () => {
        it('should make a GET call to the specific ModelInformation url', () => {
            const engineId = 'O. O';
            const modelName = 'O .O';

            modelInfo.get(engineId, modelName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ModelInformation.getBaseUrl(engineId, modelName)}/details`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific ModelInformation url', () => {
            const engineId = 'OAO';
            const modelName = 'QAQ';

            modelInfo.delete(engineId, modelName);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(ModelInformation.getBaseUrl(engineId, modelName));
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific ModelInformation url', () => {
            const engineId = '-_-';
            const modelName = '@_@';
            const modelInformation: RegistrationModel = {
                engineId: 'O_O',
                modelName: 'mini model',
                exportPeriod: 'XYZ',
                intervalTime: 999,
                intervalUnit: 'WEEK',
            };

            modelInfo.update(engineId, modelName, modelInformation);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(ModelInformation.getBaseUrl(engineId, modelName), modelInformation);
        });
    });
});
