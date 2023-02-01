import Resource from '../../Resource.js';
import API from '../../../APICore.js';
import {MetadataParams, MetadataPageModel, MetadataReportStatus} from './SourcesMetadataInterfaces.js';

export default class SourcesMetadata extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    generateReport(sourceId: string) {
        return this.api.post<void>(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`);
    }

    getReport(sourceId: string, params?: MetadataParams) {
        return this.api.get<MetadataPageModel>(
            this.buildPath(`${SourcesMetadata.baseUrl}/${sourceId}/metadata`, params)
        );
    }

    getReportStatus(sourceId: string) {
        return this.api.get<MetadataReportStatus>(`${SourcesMetadata.baseUrl}/${sourceId}/metadata/status`);
    }
}
