import API from '../../../../APICore';
import SmartSnippetsConfiguration from '../SmartSnippetsConfiguration';
import {SmartSnippetsConfigurationModel} from '../SmartSnippetsConfigurationInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SmartSnippetsConfiguration', () => {
    let smartSnippetsConfig: SmartSnippetsConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const modelConfig: SmartSnippetsConfigurationModel = {
        modelId: 'test-model-id',
        modelDisplayName: 'Model Name 1',
        sources: ['1st-source', '2nd-source'],
        cssSelectorsToExclude: ['div.mock[id="this-is-a-test"]', '#wow'],
        documentTypes: [
            {
                contentFields: ['field-1', 'field-2'],
                documentType: 'HTMLFile',
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        smartSnippetsConfig = new SmartSnippetsConfiguration(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the Smart Snippets Configuration base url', () => {
            const {modelId, ...newConfig} = modelConfig;
            smartSnippetsConfig.create(newConfig);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.baseUrl, newConfig);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Smart Snippets Configuration url', () => {
            const configToDeleteId = 'config-to-be-deleted';
            smartSnippetsConfig.delete(configToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SmartSnippetsConfiguration.baseUrl}/${configToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Smart Snippets Configuration url', () => {
            const configToGetId = 'config-to-be-fetched';
            smartSnippetsConfig.get(configToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SmartSnippetsConfiguration.baseUrl}/${configToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Smart Snippets Configuration url', () => {
            smartSnippetsConfig.update(modelConfig);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SmartSnippetsConfiguration.baseUrl}/${modelConfig.modelId}`,
                modelConfig
            );
        });
    });
});
