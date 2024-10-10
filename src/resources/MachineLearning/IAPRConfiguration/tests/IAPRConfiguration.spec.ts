import API from '../../../../APICore.js';
import IAPRConfiguration from '../IAPRConfiguration.js';
import {IAPRConfigurationModel} from '../IAPRConfigurationInterfaces.js';

jest.mock('../../../../APICore');

describe('IAPRConfiguration', () => {
    let iaprConfig: IAPRConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        iaprConfig = new IAPRConfiguration(api, serverlessApi);
    });

    describe('createPQSModel', () => {
        it('should make a POST call to the specific IAPRConfiguration url', async () => {
            const model: IAPRConfigurationModel = {
                modelDisplayName: 'kiki soudane',
                catalogId: 'catalog_mock',
                trackingIds: ['sport'],
            };
            await iaprConfig.create(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${IAPRConfiguration.baseUrl}/model`, model);
        });
    });
});
