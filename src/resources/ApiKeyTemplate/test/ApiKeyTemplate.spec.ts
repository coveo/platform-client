import API from '../../../APICore.js';

import ApiKeyTemplate from '../ApiKeyTemplate.js';

jest.mock('../../../APICore.js');

describe('ApiKeyTemplateModel', () => {
    let apiKeyTemplate: ApiKeyTemplate;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        apiKeyTemplate = new ApiKeyTemplate(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the ApiKeys at the keyPurpose', async () => {
            const apiKeyTemplateToGetId = 'ApikeyTemplate-to-be-fetched';
            await apiKeyTemplate.get(apiKeyTemplateToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ApiKeyTemplate.baseUrl}/${apiKeyTemplateToGetId}`);
        });
    });
});
