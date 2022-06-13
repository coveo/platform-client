import Resource from '../../Resource';
import API from '../../../APICore';
import {PageModel, Paginated} from '../../BaseInterfaces';
import {Metadata} from './SourcesMetadataInterfaces';

export default class SourcesMetadata extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    generateReport(sourceId: string) {
        return this.api.post(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`);
    }

    getReport(sourceId: string, params?: Paginated) {
        return this.api.get<PageModel<Metadata>>(
            this.buildPath(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`, params)
        );
    }
}
