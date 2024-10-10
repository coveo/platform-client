import API from '../../../../APICore.js';
import {DocumentGroupPreviewParams} from '../../DocumentInterfaces.js';
import SemanticEncoderConfiguration from '../SemanticEncoderConfiguration.js';

jest.mock('../../../../APICore.js');

describe('SemanticEncoderConfiguration', () => {
    let semConfig: SemanticEncoderConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        semConfig = new SemanticEncoderConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve SE preview', async () => {
            const params: DocumentGroupPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            await semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticEncoderConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve SE preview', async () => {
            const params: DocumentGroupPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            await semConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SemanticEncoderConfiguration.previewUrl, params);
        });
    });
});
