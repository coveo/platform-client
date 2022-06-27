import Resource from '../../Resource';
import API from '../../../APICore';
import {PageModel, Paginated} from '../../BaseInterfaces';
import {Metadata, MetadataReportStatus} from './SourcesMetadataInterfaces';

export default class SourcesMetadata extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    generateReport(sourceId: string) {
        return this.api.post<void>(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`, {});
    }

    getReport(sourceId: string, params?: Paginated) {
        return this.api.get<PageModel<Metadata>>(
            this.buildPath(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`, params)
        );
    }

    getReportStatus(sourceId: string) {
        return this.api.get<MetadataReportStatus>(`${SourcesMetadata.baseUrl}/${sourceId}/metadata/status`);
    }
}
