import API from '../../APICore.js';
import Resource from '../Resource.js';
import {ApiKeyModel, CreateApiKeyModel, CreateApiKeyOptions, DuplicateApiKeyOptions} from './ApiKeysInterfaces.js';

export default class ApiKey extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/apikeys`;

    list() {
        return this.api.get<ApiKeyModel[]>(ApiKey.baseUrl);
    }

    create(apiKey: CreateApiKeyModel, options?: CreateApiKeyOptions) {
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

    extend(apiKeyId: string) {
        return this.api.put<void>(`${ApiKey.baseUrl}/${apiKeyId}/activation/extend`);
    }

    duplicate(apiKeyId: string, options: DuplicateApiKeyOptions) {
        return this.api.put<ApiKeyModel>(this.buildPath(`${ApiKey.baseUrl}/${apiKeyId}/duplicate`), options);
    }
}
