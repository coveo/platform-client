import API from '../../APICore.js';
import {New} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ApiKeyModel, CreateApiKeyOptions} from './ApiKeysInterfaces.js';

export default class ApiKey extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/apikeys`;

    list() {
        return this.api.get<ApiKeyModel[]>(ApiKey.baseUrl);
    }

    create(apiKey: New<ApiKeyModel, 'resourceId' | 'id'>, options?: CreateApiKeyOptions) {
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
