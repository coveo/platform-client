import API from '../../APICore.js';
import Resource from '../Resource.js';
import {CreateExtension, ExtensionModel} from './ExtensionsInterfaces.js';

export default class Extension extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/extensions`;

    create(extension: CreateExtension) {
        return this.api.post<ExtensionModel>(Extension.baseUrl, extension);
    }

    update(extensionId: string, options: CreateExtension) {
        return this.api.put<ExtensionModel>(`${Extension.baseUrl}/${extensionId}`, options);
    }

    delete(extensionId: string) {
        return this.api.delete<void>(`${Extension.baseUrl}/${extensionId}`);
    }

    enable(extensionId: string) {
        return this.api.post<void>(`${Extension.baseUrl}/${extensionId}/enable`);
    }

    disable(extensionId: string, reason?: string) {
        return this.api.post<void>(`${Extension.baseUrl}/${extensionId}/disable`, {reason});
    }

    get(extensionId: string) {
        return this.api.get<ExtensionModel>(`${Extension.baseUrl}/${extensionId}`);
    }

    list() {
        return this.api.get<ExtensionModel[]>(Extension.baseUrl);
    }
}
