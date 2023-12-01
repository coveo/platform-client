import API from '../../../../APICore.js';
import {DocumentGroupPreviewParams} from '../../DocumentInterfaces.js';
import SemanticEncoderConfiguration from '../SemanticEncoderConfiguration.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('SemanticEncoderConfiguration', () => {
    let semConfig: SemanticEncoderConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        semConfig = new SemanticEncoderConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve SE preview', () => {
            const params: DocumentGroupPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticEncoderConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve SE preview', () => {
            const params: DocumentGroupPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticEncoderConfiguration.previewUrl, params);
        });
    });
});
