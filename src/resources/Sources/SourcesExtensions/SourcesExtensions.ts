import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {SourceExtensionsMap, UpdateSourceExtensionsOptions} from './SourcesExtensionsInterfaces.js';

export default class SourcesExtensions extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    /**
     * Lists the extension configurations of a source.
     * @param sourceId The unique identifier of the target source.
     * @returns {Promise<SourceExtensionsMap>} A promise of the source extension configurations
     */
    get(sourceId: string): Promise<SourceExtensionsMap> {
        return this.api.get<SourceExtensionsMap>(`${SourcesExtensions.baseUrl}/${sourceId}/extensions`);
    }

    /**
     * Updates the extension configurations of a source.
     * @param sourceId The unique identifier of the target source.
     * @param extensions The extension configurations to set on the target source.
     * @param options Whether to rebuild the source after the operation.
     */
    update(sourceId: string, extensions: SourceExtensionsMap, options?: UpdateSourceExtensionsOptions): Promise<void> {
        return this.api.put<void>(
            this.buildPath(`${SourcesExtensions.baseUrl}/${sourceId}/extensions`, options),
            extensions,
        );
    }
}
