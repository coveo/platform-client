import API from '../../../../APICore.js';
import RGAConfiguration from '../RGAConfiguration.js';
import {RGAPreviewParams} from '../RGAConfigurationInterface.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('RGAConfiguration', () => {
    let rgaConfig: RGAConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        rgaConfig = new RGAConfiguration(api, serverlessApi);
    });

    describe('preview', () => {
        it('should make a POST call to retrieve RGA preview', () => {
            const params: RGAPreviewParams = {
                sources: ['source1', 'source2'],
                filterConditions: [],
                advancedQuery: '',
            };
            rgaConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(RGAConfiguration.previewUrl, params);
        });
    });
});
