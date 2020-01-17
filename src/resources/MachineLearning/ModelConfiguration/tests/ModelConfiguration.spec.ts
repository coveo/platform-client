import API from '../../../../APICore';
import {ModelConfigFileType} from '../../../Enums';
import ModelConfiguration from '../ModelConfiguration';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ModelConfiguration', () => {
    let modelConfig: ModelConfiguration;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        modelConfig = new ModelConfiguration(api);
    });

    describe('get', () => {
        it('should make a GET call to the specific ModelConfiguration url', () => {
            const modelId = '💀Papyrus';
            const modelConfigFileType = ModelConfigFileType.ADVANCED_CONFIGURATION;

            modelConfig.get(modelId, modelConfigFileType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModelConfiguration.getBaseUrl(modelId, modelConfigFileType));
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific ModelConfiguration url', () => {
            const modelId = '💀Sans';
            const modelConfigFileType = ModelConfigFileType.FACET_ID_MAPPING;
            const modelConfigFileContents = '🦴🦴🦴';

            modelConfig.update(modelId, modelConfigFileType, {modelConfigFileContents});
            expect(api.put).toBeCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                ModelConfiguration.getBaseUrl(modelId, modelConfigFileType),
                modelConfigFileContents
            );
        });
    });
});
