import API from '../../../../APICore.js';
import SmartSnippetsConfiguration from '../SmartSnippetsConfiguration.js';
import {
    SmartSnippetsConfigurationModel,
    SmartSnippetsContentFieldsParams,
} from '../SmartSnippetsConfigurationInterfaces.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('SmartSnippetsConfiguration', () => {
    let smartSnippetsConfig: SmartSnippetsConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const modelConfigs: SmartSnippetsConfigurationModel[] = [
        {
            modelId: 'test-model-id',
            modelDisplayName: 'Model Name 1',
            sources: ['1st-source', '2nd-source'],
            filterConditions: [],
        },
        {
            modelId: 'test-model-id',
            modelDisplayName: 'Model Name 1',
            sources: ['1st-source', '2nd-source'],
            filterConditions: [],
            cssSelectorsToExclude: ['div.mock[id="this-is-a-test"]', '#wow'],
            documentTypes: [
                {
                    contentFields: ['field-1', 'field-2'],
                    documentType: 'HTMLFile',
                },
            ],
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        smartSnippetsConfig = new SmartSnippetsConfiguration(api, serverlessApi);
    });

    describe('create', () => {
        modelConfigs.forEach((modelConfig, index) => {
            it(`should make a POST call to the Smart Snippets Configuration base url with config ${index}`, () => {
                const {modelId: _, ...newConfig} = modelConfig;
                smartSnippetsConfig.create(newConfig);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.modelUrl, newConfig);
            });
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Smart Snippets Configuration url', () => {
            const configToDeleteId = 'config-to-be-deleted';
            smartSnippetsConfig.delete(configToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SmartSnippetsConfiguration.modelUrl}/${configToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Smart Snippets Configuration url', () => {
            const configToGetId = 'config-to-be-fetched';
            smartSnippetsConfig.get(configToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SmartSnippetsConfiguration.modelUrl}/${configToGetId}`);
        });
    });

    describe('update', () => {
        modelConfigs.forEach((modelConfig, index) => {
            it(`should make a PUT call to the specific Smart Snippets Configuration url for config ${index}`, () => {
                smartSnippetsConfig.update(modelConfig);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `${SmartSnippetsConfiguration.modelUrl}/${modelConfig.modelId}`,
                    modelConfig
                );
            });
        });
    });

    describe('contentFields', () => {
        it('should make a POST call to retrieve valid content fields from the Smart Snippets Configuration contentfields url', () => {
            const params: SmartSnippetsContentFieldsParams = {
                documentType: 'test-type',
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            smartSnippetsConfig.contentFields(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.contentFieldsUrl, params);
        });
    });

    describe('documentTypes', () => {
        it('should make a POST call to retrieve valid document types from the Smart Snippets Configuration documenttypes url', () => {
            const params: SmartSnippetsContentFieldsParams = {
                documentType: 'test-type',
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            smartSnippetsConfig.documentTypes(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.documentTypesUrl, params);
        });
    });

    describe('preview', () => {
        it('should make a POST call to retrieve document group preview info from the Smart Snippets Configuration preview url', () => {
            const params: SmartSnippetsContentFieldsParams = {
                documentType: 'test-type',
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            smartSnippetsConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.previewUrl, params);
        });
    });
});
