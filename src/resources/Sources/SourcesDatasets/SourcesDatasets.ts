import {DatasetImportProgressModel, DatasetModel, DatasetType} from './SourcesDatasetsInterfaces';
import API from '../../../APICore';
import Resource from '../../Resource';

export default class SourcesDatasets extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources/datasets`;

    list() {
        return this.api.get<DatasetModel>(SourcesDatasets.baseUrl);
    }

    import(datasetName: DatasetType, withContent = true) {
        return this.api.put<string>(
            this.buildPath(`${SourcesDatasets.baseUrl}/import`, {
                datasetName,
                withContent,
            }),
            {}
        );
    }

    progress(requestId: string) {
        return this.api.get<DatasetImportProgressModel>(
            this.buildPath(`${SourcesDatasets.baseUrl}/import/progress`, {
                requestId,
            }),
            {}
        );
    }
}
