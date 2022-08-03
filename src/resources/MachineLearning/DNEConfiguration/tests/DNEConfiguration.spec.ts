import API from '../../../../APICore';
import DNEConfiguration from '../DNEConfiguration';
import {
    DNEConfigurationModel,
    DNENewConfigurationModel,
    DocumentExtractionQueryModel,
} from '../DNEConfigurationInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('DNEConfiguration', () => {
    let dneConfig: DNEConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        dneConfig = new DNEConfiguration(api, serverlessApi);
    });

    describe('listFields', () => {
        it('should make a GET call to the specific DNEConfiguration url', () => {
            dneConfig.listFields();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/autoselectionfieldcandidates`);
        });
    });

    describe('getDocumentExtractionPreview', () => {
        it('should make a GET call to the specific DNEConfiguration url', () => {
            dneConfig.getDocumentExtractionPreview();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/documentextractionpreview`);
        });
    });

    describe('getDocumentExtractionQuery', () => {
        it('should make a POST call to the specific DNEConfiguration url', () => {
            const model: DocumentExtractionQueryModel = {};
            dneConfig.getDocumentExtractionQuery(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/documentextractionquery`, model);
        });
    });

    describe('parseDocumentExtractionQuery', () => {
        it('should make a GET call to the specific DNEConfiguration url', () => {
            const query = 'lala';
            dneConfig.parseDocumentExtractionQuery(query);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/documentextractionquerymodel?query=lala`);
        });
    });

    describe('createWithoutQuery', () => {
        it('should make a POST call to get documentExtractionQueryModel, then use this param to create a new DNE model', async () => {
            const newModel: DNENewConfigurationModel = {modelDisplayName: '🐩'};
            const documentExtractionQueryModel = await dneConfig.createWithoutQuery(newModel, {});

            expect(api.post).toHaveBeenCalledTimes(2);
            expect(api.post).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/documentextractionquery`, {});
            expect(api.post).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/model`, {
                ...newModel,
                documentExtractionQueryModel,
            });
        });
    });

    describe('createWithQuery', () => {
        it('should make a POST call to the specific DNEConfiguration url', () => {
            const model: DNENewConfigurationModel = {modelDisplayName: '🐩'};
            dneConfig.createWithQuery(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/model`, model);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific DNEConfiguration url', () => {
            const modelId = '🦆';
            dneConfig.delete(modelId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/model/${modelId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific DNEConfiguration url', () => {
            const modelId = '🦆';
            dneConfig.get(modelId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/model/${modelId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific DNEConfiguration url', () => {
            const modelId = '🦆';
            const modelConfig: DNEConfigurationModel = {modelDisplayName: '🐺'};
            dneConfig.update(modelId, modelConfig);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${DNEConfiguration.baseUrl}/model/${modelId}`, modelConfig);
        });
    });
});
