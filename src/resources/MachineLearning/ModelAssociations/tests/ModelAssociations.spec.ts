import API from '../../../../APICore.js';
import ModelAssociations from '../ModelAssociations.js';

jest.mock('../../../../APICore');

describe('ModelAssociations', () => {
    let modelAssociations: ModelAssociations;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        modelAssociations = new ModelAssociations(api, serverlessApi);
    });

    describe('createPQSModel', () => {
        it('should make a GET call to the specific IAPRConfiguration url', async () => {
            const pipelineId = '123';
            await modelAssociations.list(pipelineId, {page: 1, pageSize: 25});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ModelAssociations.baseUrl}/${pipelineId}/associations?page=1&pageSize=25`,
            );
        });
    });
});
