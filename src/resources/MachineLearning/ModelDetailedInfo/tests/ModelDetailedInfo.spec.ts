import API from '../../../../APICore.js';
import ModelDetailedInfo from '../ModelDetailedInfo.js';

jest.mock('../../../../APICore.js');

describe('ModelDetailedInfo', () => {
    let modelDetailedConfig: ModelDetailedInfo;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        modelDetailedConfig = new ModelDetailedInfo(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific ModelDetailedInfo url', async () => {
            const modelId = '🦆';
            await modelDetailedConfig.get(modelId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ModelDetailedInfo.baseUrl}/${modelId}`);
        });
    });
});
