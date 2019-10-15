import API from '../../../APICore';
import ApiKey from '../ApiKeys';
import {ApiKeyModel} from '../ApiKeysInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ApiKey', () => {
    let apiKey: ApiKey;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        apiKey = new ApiKey(api);
    });

    describe('list', () => {
        it('should make a GET call to the ApiKeys base url', () => {
            apiKey.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ApiKey.baseUrl);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific ApiKey url', () => {
            const apiKeyToDeleteId = 'ApiKey-to-be-deleted';
            apiKey.delete(apiKeyToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyToDeleteId}`);
        });
    });

    describe('toggle', () => {
        const apiKeyModel: ApiKeyModel = {
            id: 'ApiKey-to-be-toggled',
            organizationId: 'a-smol-org',
            createdDate: 666,
            value: 'walue',
            privileges: [],
            enabled: null,
        };

        it('should make a PUT call to disable the specific apiKey', () => {
            apiKeyModel.enabled = true;

            apiKey.toggle(apiKeyModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/disable`, apiKeyModel);
        });

        it('should make a PUT call to activate the specific apiKey', () => {
            apiKeyModel.enabled = false;

            apiKey.toggle(apiKeyModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/activate`, apiKeyModel);
        });
    });
});
