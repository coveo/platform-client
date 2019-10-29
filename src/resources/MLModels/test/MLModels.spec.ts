import API from '../../../APICore';
import MLModels from '../MLModels';
import {CreateMLModelOptions} from '../MLModelsInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('MLModels', () => {
    let mlModel: MLModels;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        mlModel = new MLModels(api);
    });

    describe('list', () => {
        it('should make a GET call to the MLModels base url', () => {
            mlModel.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(MLModels.baseUrl);
        });
    });

    describe('listDetails', () => {
        it('should make a GET call to the specific MLModels url', () => {
            mlModel.listDetails();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${MLModels.baseUrl}/details`);
        });
    });

    describe('getWithId', () => {
        it('should make a GET call to the specific MLModels url', () => {
            const modelId = 'O. O';

            mlModel.getWithId(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${MLModels.baseUrl}/${modelId}/details`);
        });
    });

    describe('deleteWithId', () => {
        it('should make a DELETE call to the specific MLModels url', () => {
            const modelId = 'O .O';

            mlModel.deleteWithId(modelId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${MLModels.baseUrl}/${modelId}`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the MLModels create url', () => {
            const options: CreateMLModelOptions = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: 'DAY',
            };

            mlModel.create(options);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(MLModels.createUrl, options);
        });
    });

    describe('getWithInfo', () => {
        it('should make a GET call to the specific MLModels info url', () => {
            const engineId = 'O. O';
            const modelName = 'O .O';

            mlModel.getWithInfo(engineId, modelName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${MLModels.infoUrl}/${engineId}/models/${modelName}/details`);
        });
    });

    describe('deleteWithInfo', () => {
        it('should make a DELETE call to the specific MLModels info url', () => {
            const engineId = 'OAO';
            const modelName = 'QAQ';

            mlModel.deleteWithInfo(engineId, modelName);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${MLModels.infoUrl}/${engineId}/models/${modelName}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific MLModels info url', () => {
            const engineId = '-_-';
            const modelName = '@_@';
            const modelInformation: CreateMLModelOptions = {
                engineId: 'O_O',
                modelName: 'mini model',
                exportPeriod: 'XYZ',
                intervalTime: 999,
                intervalUnit: 'WEEK',
            };

            mlModel.update(engineId, modelName, modelInformation);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${MLModels.infoUrl}/${engineId}/models/${modelName}`,
                modelInformation
            );
        });
    });
});
