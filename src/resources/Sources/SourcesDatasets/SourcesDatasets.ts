import {DatasetModel, DatasetType} from './SourcesDatasetsInterfaces';
import API from '../../../APICore';
import Resource from '../../Resource';

export default class SourcesDatasets extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources/datasets`;

    list() {
        return this.api.get<DatasetModel>(`${SourcesDatasets.baseUrl}`);
    }

    import(datasetName: DatasetType, withContent = true) {
        return this.api.put(
            this.buildPath(`${SourcesDatasets.baseUrl}/import`, {
                datasetName,
                withContent,
            }),
            {}
        );
    }
}
