import API from '../../APICore';
import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {ApiKeyModel, CreateApiKeyOptions} from './ApiKeysInterfaces';

export default class ApiKey extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/apikeys`;

    list() {
        return this.api.get<ApiKeyModel[]>(ApiKey.baseUrl);
    }

    create(apiKey: New<ApiKeyModel, 'resourceId'>, options?: CreateApiKeyOptions) {
        return this.api.post<ApiKeyModel>(this.buildPath(ApiKey.baseUrl, options), apiKey);
    }

    get(apiKeyId: string) {
        return this.api.get<ApiKeyModel>(`${ApiKey.baseUrl}/${apiKeyId}`);
    }

    update(apiKey: ApiKeyModel) {
        return this.api.put(`${ApiKey.baseUrl}/${apiKey.id}`, apiKey);
    }

    toggle(apiKey: ApiKeyModel) {
        const path = `${ApiKey.baseUrl}/${apiKey.id}/${apiKey.enabled ? 'disable' : 'activate'}`;

        return this.api.put(path, apiKey);
    }

    delete(apiKeyId: string) {
        return this.api.delete(`${ApiKey.baseUrl}/${apiKeyId}`);
    }
}
