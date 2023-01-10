import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {MappingsConfiguration, UpdateMappingsConfiguration} from './SourcesMappingsInterfaces.js';

export default class SourcesMappings extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    get(sourceId: string) {
        return this.api.get<MappingsConfiguration>(`${SourcesMappings.baseUrl}/${sourceId}/mappings`);
    }

    update(sourceId: string, mappingsConfiguration: UpdateMappingsConfiguration, rebuild = false) {
        return this.api.put(
            this.buildPath(`${SourcesMappings.baseUrl}/${sourceId}/mappings`, {rebuild}),
            mappingsConfiguration
        );
    }
}
