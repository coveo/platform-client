import API from '../../../../APICore.js';
import PQSConfiguration from '../PQSConfiguration.js';
import {PQSConfigurationModel} from '../PQSConfigurationInterfaces.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('PQSConfiguration', () => {
    let pqsConfig: PQSConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        pqsConfig = new PQSConfiguration(api, serverlessApi);
    });

    describe('createPQSModel', () => {
        it('should make a POST call to the specific PQSConfiguration url', () => {
            const model: PQSConfigurationModel = {
                modelDisplayName: 'kiki soudane',
                catalogId: 'sekia',
                trackingIds: ['sport'],
            };
            pqsConfig.createPQSModel(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${PQSConfiguration.baseUrl}/model`, model);
        });
    });
});
