import API from '../../../../APICore';
import IAPRConfiguration from '../IAPRConfiguration';
import {IAPRConfigurationModel} from '../IAPRConfigurationInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('IAPRConfiguration', () => {
    let iaprConfig: IAPRConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        iaprConfig = new IAPRConfiguration(api, serverlessApi);
    });

    describe('createPQSModel', () => {
        it('should make a POST call to the specific IAPRConfiguration url', () => {
            const model: IAPRConfigurationModel = {
                modelDisplayName: 'kiki soudane',
                engineId: 'intentranking',
                extraConfig: {catalogId: 'catalog_mock'},
            };
            iaprConfig.create(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${IAPRConfiguration.baseUrl}/model`, model);
        });
    });
});
