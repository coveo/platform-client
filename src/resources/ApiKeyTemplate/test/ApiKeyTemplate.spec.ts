import API from '../../../APICore.js';

import ApiKeyTemplate from '../ApiKeyTemplate.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ApiKeyTemplateModel', () => {
    let apiKeyTemplate: ApiKeyTemplate;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        apiKeyTemplate = new ApiKeyTemplate(api, serverlessApi);
    });

    describe('purpose', () => {
        it('should make a GET call to the ApiKeys at the keyPurpose', () => {
            const apiKeyTemplateToGetId = "ApikeyTemplate-to-be-fetched"
            apiKeyTemplate.get(apiKeyTemplateToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ApiKeyTemplate.baseUrl}/${apiKeyTemplateToGetId}`);
        });
    });
});
