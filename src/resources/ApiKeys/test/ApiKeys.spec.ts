import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import ApiKey from '../ApiKeys.js';
import {ApiKeyModel} from '../ApiKeysInterfaces.js';

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
    });

    describe('create', () => {
        it('should make a POST call to the ApiKeys base url', async () => {
            const apiKeyModel: New<ApiKeyModel> = {
                organizationId: 'a-smol-org',
                value: '',
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
        it('should make a DELETE call to the specific ApiKey url', async () => {
            const apiKeyToDeleteId = 'ApiKey-to-be-deleted';

            await apiKey.delete(apiKeyToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyToDeleteId}`);
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
            expect(api.put).toHaveBeenCalledWith(`${ApiKey.baseUrl}/${apiKeyModel.id}/duplicate?lifetimeDuration=P1M`);
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
});
