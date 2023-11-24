import API from '../../../../APICore.js';
import RelevanceGenerativeAnsweringConfiguration from '../RelevanceGenerativeAnsweringConfiguration.js';
import {RelevanceGenerativeAnsweringPreviewParams} from '../RelevanceGenerativeAnsweringConfigurationInterface.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('RGAConfiguration', () => {
    let rgaConfig: RelevanceGenerativeAnsweringConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        rgaConfig = new RelevanceGenerativeAnsweringConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call with sources to retrieve RGA preview', () => {
            const params: RelevanceGenerativeAnsweringPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
            };
            rgaConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(RelevanceGenerativeAnsweringConfiguration.previewUrl, params);
        });

        it('should make a POST call with advanced query to retrieve RGA preview', () => {
            const params: RelevanceGenerativeAnsweringPreviewParams = {
                advancedQuery: 'some advanced query @ test',
            };
            rgaConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(RelevanceGenerativeAnsweringConfiguration.previewUrl, params);
        });
    });
});
