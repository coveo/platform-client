import API from '../../../../APICore.js';
import PQSConfiguration from '../PQSConfiguration.js';
import {PQSConfigurationModel} from '../PQSConfigurationInterfaces.js';

jest.mock('../../../../APICore.js');

describe('PQSConfiguration', () => {
    let pqsConfig: PQSConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        pqsConfig = new PQSConfiguration(api, serverlessApi);
    });

    describe('createPQSModel', () => {
        it('should make a POST call to the specific PQSConfiguration url', async () => {
            const model: PQSConfigurationModel = {
                modelDisplayName: 'kiki soudane',
                catalogId: 'sekia',
                trackingIds: ['sport'],
            };
            await pqsConfig.createPQSModel(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${PQSConfiguration.baseUrl}/model`, model);
        });
    });
});
