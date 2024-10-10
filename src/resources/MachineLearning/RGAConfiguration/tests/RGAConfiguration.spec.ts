import API from '../../../../APICore.js';
import {DocumentGroupPreviewParams} from '../../DocumentInterfaces.js';
import RelevanceGenerativeAnsweringConfiguration from '../RelevanceGenerativeAnsweringConfiguration.js';

jest.mock('../../../../APICore.js');

describe('RGAConfiguration', () => {
    let rgaConfig: RelevanceGenerativeAnsweringConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        rgaConfig = new RelevanceGenerativeAnsweringConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve RGA preview', async () => {
            const params: DocumentGroupPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            await rgaConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(RelevanceGenerativeAnsweringConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve RGA preview', async () => {
            const params: DocumentGroupPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            await rgaConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(RelevanceGenerativeAnsweringConfiguration.previewUrl, params);
        });
    });
});
