import API from '../../../../APICore';
import ModelConfiguration from '../ModelConfiguration';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ModelConfiguration', () => {
    let modelConfig: ModelConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        modelConfig = new ModelConfiguration(api, serverlessApi);
    });

    describe('getAdvancedConfig', () => {
        it('should make a GET call to the advanced configuration url', () => {
            const modelId = '💀Papyrus';

            modelConfig.getAdvancedConfig(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ModelConfiguration.getBaseUrl(modelId)}/advanced`);
        });
    });

    describe('updateAdvancedConfig', () => {
        it('should make a PUT call to the advanced configuration url', () => {
            const modelId = '💀Sans';
            const modelConfigFileContents = JSON.stringify('{"💀": "🦴🦴🦴"}');

            modelConfig.updateAdvancedConfig(modelId, modelConfigFileContents);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ModelConfiguration.getBaseUrl(modelId)}/advanced`,
                modelConfigFileContents,
                {method: 'put', body: modelConfigFileContents, headers: {'Content-Type': 'application/json'}}
            );
        });
    });
});
