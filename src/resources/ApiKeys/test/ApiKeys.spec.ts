import API from '../../../APICore.js';
import ApiKey from '../ApiKeys.js';
import {ApiKeyModel, CreateApiKeyModel} from '../ApiKeysInterfaces.js';
import {ApiKeyStatusFilter} from '../../Enums.js';

jest.mock('../../../APICore.js');

describe('ApiKey', () => {
    let apiKey: ApiKey;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        apiKey = new ApiKey(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ApiKeys base url', async () => {
            await apiKey.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ApiKey.baseUrl);
        });
        it('should make a GET call to the ApiKeys base url and options', async () => {
            await apiKey.list({status: ApiKeyStatusFilter.ACTIVE});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ApiKey.baseUrl + '?status=ACTIVE');
        });
    });

    describe('create', () => {
        it('should make a POST call to the ApiKeys base url', async () => {
            const apiKeyModel: CreateApiKeyModel = {
                displayName: 'Cool key',
                description: 'My super cool API key',
                lifetimeDuration: 'P1M',
                allowedIps: ['192.168.0.0/24'],
            };

            await apiKey.create(apiKeyModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(ApiKey.baseUrl, apiKeyModel);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific ApiKey url', async () => {
            const apiKeyToGetId = 'ApiKey-to-be-fetched';

            await apiKey.get(apiKeyToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific ApiKey url', async () => {
            const apiKeyModel: ApiKeyModel = {
                organizationId: 'a-smol-org',
                id: 'a-specific-id',
                value: '',
            };

            await apiKey.update(apiKeyModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}`, apiKeyModel);
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to DELETE call to /rest/organizations/:orgId/apikeys/:id when only one id is specified', async () => {
            const apiKeyToDeleteId = 'ApiKey-to-be-deleted';

            await apiKey.delete(apiKeyToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyToDeleteId}`);
        });

        it('makes a DELETE call to /rest/organizations/:orgId/apikeys/:id when an array of one id is provided', async () => {
            const apiKeyToDeleteId = 'ApiKey-to-be-deleted';
            await apiKey.delete([apiKeyToDeleteId]);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyToDeleteId}`);
        });

        it('makes a POST call to /rest/organizations/:orgId/apikeys/delete/bulk when multiple ids are provided', async () => {
            const apiKeysToDelete = ['api-key-id-one', 'api-key-id-two'];
            await apiKey.delete(apiKeysToDelete);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ApiKey.baseUrl}/delete/bulk`, apiKeysToDelete);
        });
    });

    describe('toggle', () => {
        const apiKeyModel: ApiKeyModel = {
            id: 'ApiKey-to-be-toggled',
            organizationId: 'a-smol-org',
        };

        it('should make a PUT call to disable the specific apiKey', async () => {
            apiKeyModel.enabled = true;

            await apiKey.toggle(apiKeyModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/disable`, apiKeyModel);
        });

        it('should make a PUT call to activate the specific apiKey', async () => {
            apiKeyModel.enabled = false;

            await apiKey.toggle(apiKeyModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/activate`, apiKeyModel);
        });
    });

    describe('duplicate', () => {
        const apiKeyModel: ApiKeyModel = {
            organizationId: 'a-smol-org',
            id: 'a-specific-id',
            value: '',
        };
        it('should make a PUT call to the duplicate ApiKey', async () => {
            await apiKey.duplicate(apiKeyModel.id, {lifetimeDuration: 'P1M'});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/duplicate`, {
                lifetimeDuration: 'P1M',
            });
        });
    });
    describe('extend', () => {
        const apiKeyModel: ApiKeyModel = {
            organizationId: 'a-smol-org',
            id: 'a-specific-id',
            value: '',
        };
        it('should make a PUT call to the extend ApiKey', async () => {
            await apiKey.extend(apiKeyModel.id);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/activation/extend`);
        });
    });

    describe('activate', () => {
        it('makes a PUT call to /rest/organizations/:orgId/apikeys/:id/activate when only one id is provided', async () => {
            await apiKey.activate('api-key-id');
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/api-key-id/activate`);
        });

        it('makes a PUT call to /rest/organizations/:orgId/apikeys/:id/activate when an array of one id is provided', async () => {
            await apiKey.activate(['api-key-id']);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/api-key-id/activate`);
        });

        it('makes a PUT call to /rest/organizations/:orgId/apikeys/activate/bulk when multiple ids are provided', async () => {
            await apiKey.activate(['api-key-id-one', 'api-key-id-two']);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/activate/bulk`, [
                'api-key-id-one',
                'api-key-id-two',
            ]);
        });
    });

    describe('disable', () => {
        it('makes a PUT call to /rest/organizations/:orgId/apikeys/:id/disable when only one id is provided', async () => {
            await apiKey.disable('api-key-id');
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/api-key-id/disable`);
        });

        it('makes a PUT call to /rest/organizations/:orgId/apikeys/:id/disable when an array of one id is provided', async () => {
            await apiKey.disable(['api-key-id']);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/api-key-id/disable`);
        });

        it('makes a PUT call to /rest/organizations/:orgId/apikeys/disable/bulk when multiple ids are provided', async () => {
            await apiKey.disable(['api-key-id-one', 'api-key-id-two']);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/disable/bulk`, [
                'api-key-id-one',
                'api-key-id-two',
            ]);
        });
    });
});
