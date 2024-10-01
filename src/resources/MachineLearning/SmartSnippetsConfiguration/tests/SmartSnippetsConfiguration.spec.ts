import API from '../../../../APICore.js';
import {DocumentGroupPreviewParams} from '../../DocumentInterfaces.js';
import SmartSnippetsConfiguration from '../SmartSnippetsConfiguration.js';
import {SmartSnippetsContentFieldsParams} from '../SmartSnippetsConfigurationInterfaces.js';

jest.mock('../../../../APICore.js');

describe('SmartSnippetsConfiguration', () => {
    let smartSnippetsConfig: SmartSnippetsConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        smartSnippetsConfig = new SmartSnippetsConfiguration(api, serverlessApi);
    });

    describe('contentFields', () => {
        it('should make a POST call to retrieve valid content fields from the Smart Snippets Configuration contentfields url', async () => {
            const params: SmartSnippetsContentFieldsParams = {
                documentType: 'test-type',
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            await smartSnippetsConfig.contentFields(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.contentFieldsUrl, params);
        });
    });

    describe('documentTypes', () => {
        it('should make a POST call to retrieve valid document types from the Smart Snippets Configuration documenttypes url', async () => {
            const params: SmartSnippetsContentFieldsParams = {
                documentType: 'test-type',
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            await smartSnippetsConfig.documentTypes(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.documentTypesUrl, params);
        });
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve Smart Snippets Configuration preview', async () => {
            const params: DocumentGroupPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            await smartSnippetsConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve Smart Snippets Configuration preview', async () => {
            const params: DocumentGroupPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            await smartSnippetsConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SmartSnippetsConfiguration.previewUrl, params);
        });
    });
});
