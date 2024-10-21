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

    /**
     * Creates an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extension The configuration to use for the new extension.
     * @returns The newly created extension.
     */
    create(extension: CreateExtension): Promise<ExtensionModel> {
        return this.api.post<ExtensionModel>(Extension.baseUrl, extension);
    }

    /**
     * Updates an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionId The unique identifier of the extension to update.
     * @param options The new configuration to use for the updated extension.
     * @returns The updated extension.
     */
    update(extensionId: string, options: CreateExtension): Promise<ExtensionModel> {
        return this.api.put<ExtensionModel>(`${Extension.baseUrl}/${extensionId}`, options);
    }

    /**
     * Deletes an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionId The unique identifier of the extension to delete.
     * @returns
     */
    delete(extensionId: string): Promise<void> {
        return this.api.delete<void>(`${Extension.baseUrl}/${extensionId}`);
    }

    /**
     * Enables a disabled [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     *
     * Note: Disabled extensions are not executed.
     * @param extensionId The unique identifier of the extension to enable.
     * @returns
     */
    enable(extensionId: string): Promise<void> {
        return this.api.post<void>(`${Extension.baseUrl}/${extensionId}/enable`);
    }

    /**
     * Disables an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     *
     * Note: Disabled extensions are not executed.
     * @param extensionId The unique identifier of the extension to disable.
     * @param reason The reason why the extension is disabled.
     * @returns
     */
    disable(extensionId: string, reason?: string): Promise<void> {
        return this.api.post<void>(`${Extension.baseUrl}/${extensionId}/disable`, {reason});
    }

    /**
     * Shows an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionId Shows an extension in a Coveo Cloud organization.
     * @returns The extension specified by the provided id.
     */
    get(extensionId: string): Promise<ExtensionModel> {
        return this.api.get<ExtensionModel>(`${Extension.baseUrl}/${extensionId}`);
    }

    /**
     * Lists all [extensions](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @returns A list of extensions.
     */
    list(): Promise<ExtensionModel[]> {
        return this.api.get<ExtensionModel[]>(Extension.baseUrl);
    }

    /**
     * Lists all versions of an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionId he unique identifier of the target extension.
     * @returns A list of versions of the extension.
     */
    listVersions(extensionId: string): Promise<ExtensionContentVersionModel[]> {
        return this.api.get<ExtensionContentVersionModel[]>(`${Extension.baseUrl}/${extensionId}/versions`);
    }

    /**
     * Shows a specific version of an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionId The unique identifier of the target extension.
     * @param versionId The unique identifier of the extension version to show.
     * @returns The extension specified by the provided id and version id.
     */
    getVersion(extensionId: string, versionId: string): Promise<ExtensionModel> {
        return this.api.get<ExtensionModel>(`${Extension.baseUrl}/${extensionId}/versions/${versionId}`);
    }

    /**
     * Tries to compile code that would be used in an [extension](https://docs.coveo.com/en/206/) in a [Coveo Cloud organization](https://docs.coveo.com/en/185/).
     * @param extensionCode The code to compile
     * @returns Details regarding the outcome of an extension script compilation.
     */
    validateCode(extensionCode: ExtensionCompileCode): Promise<ExtensionCompileResult> {
        return this.api.post<ExtensionCompileResult>(`${Extension.baseUrl}/test/compile`, extensionCode);
    }
}
