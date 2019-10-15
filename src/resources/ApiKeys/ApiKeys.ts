import API from '../../APICore';
import Resource from '../Resource';
import {ApiKeyModel} from './ApiKeysInterfaces';

export default class ApiKey extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/apikeys`;

    list() {
        return this.api.get<ApiKeyModel[]>(ApiKey.baseUrl);
    }

    toggle(apiKey: ApiKeyModel, options?: {}) {
        const path = this.buildPath(
            `${ApiKey.baseUrl}/${apiKey.id}/${apiKey.enabled ? 'disable' : 'activate'}`,
            options
        );

        return this.api.put(path, apiKey);
    }

    delete(apiKeyId: string) {
        return this.api.delete(`${ApiKey.baseUrl}/${apiKeyId}`);
    }
}
