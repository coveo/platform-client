import API from '../../../../APICore.js';
import SemanticSearchConfiguration from '../SemanticSearchConfiguration.js';
import {SemanticSearchDocumentGroupPreviewParams} from '../SemanticSearchConfigurationInterfaces.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('RGAConfiguration', () => {
    let semConfig: SemanticSearchConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        semConfig = new SemanticSearchConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve RGA preview', () => {
            const params: SemanticSearchDocumentGroupPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticSearchConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve RGA preview', () => {
            const params: SemanticSearchDocumentGroupPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticSearchConfiguration.previewUrl, params);
        });
    });
});
