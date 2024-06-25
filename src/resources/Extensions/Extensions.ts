import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    CreateExtension,
    ExtensionCompileCode,
    ExtensionCompileResult,
    ExtensionContentVersionModel,
    ExtensionModel,
} from './ExtensionsInterfaces.js';

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

    /**
     * Lists all versions of an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     */
    listVersions(extensionId: string) {
        return this.api.get<ExtensionContentVersionModel[]>(`${Extension.baseUrl}/${extensionId}/versions`);
    }

    /**
     * Shows a specific version of an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     */
    getVersion(extensionId: string, versionId: string) {
        return this.api.get<ExtensionModel>(`${Extension.baseUrl}/${extensionId}/versions/${versionId}`);
    }

    /**
     * Validates the extension's script
     *
     * @param {ExtensionCompileCode} extensionCode The code to compile
     */
    validateCode(extensionCode: ExtensionCompileCode) {
        return this.api.post<ExtensionCompileResult>(`${Extension.baseUrl}/test/compile`, extensionCode);
    }
}
