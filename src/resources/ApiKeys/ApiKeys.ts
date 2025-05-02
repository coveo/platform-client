import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    ApiKeyListOptions,
    ApiKeyModel,
    CreateApiKeyModel,
    CreateApiKeyOptions,
    DuplicateApiKeyOptions,
} from './ApiKeysInterfaces.js';

export default class ApiKey extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/apikeys`;

    list(options?: ApiKeyListOptions) {
        return this.api.get<ApiKeyModel[]>(this.buildPath(ApiKey.baseUrl, options));
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

    delete(apiKeyIds: string | string[]) {
        if (Array.isArray(apiKeyIds) && apiKeyIds.length > 1) {
            return this.api.post<void>(`${ApiKey.baseUrl}/delete/bulk`, apiKeyIds);
        }
        return this.api.delete<void>(`${ApiKey.baseUrl}/${Array.isArray(apiKeyIds) ? apiKeyIds[0] : apiKeyIds}`);
    }

    extend(apiKeyId: string) {
        return this.api.put<void>(`${ApiKey.baseUrl}/${apiKeyId}/activation/extend`);
    }

    duplicate(apiKeyId: string, options: DuplicateApiKeyOptions) {
        return this.api.put<ApiKeyModel>(this.buildPath(`${ApiKey.baseUrl}/${apiKeyId}/duplicate`), options);
    }

    activate(apiKeyIds: string | string[]) {
        if (Array.isArray(apiKeyIds) && apiKeyIds.length > 1) {
            return this.api.put<void>(`${ApiKey.baseUrl}/activate/bulk`, apiKeyIds);
        }
        return this.api.put<void>(`${ApiKey.baseUrl}/${Array.isArray(apiKeyIds) ? apiKeyIds[0] : apiKeyIds}/activate`);
    }

    disable(apiKeyIds: string | string[]) {
        if (Array.isArray(apiKeyIds) && apiKeyIds.length > 1) {
            return this.api.put<void>(`${ApiKey.baseUrl}/disable/bulk`, apiKeyIds);
        }
        return this.api.put<void>(`${ApiKey.baseUrl}/${Array.isArray(apiKeyIds) ? apiKeyIds[0] : apiKeyIds}/disable`);
    }
}
