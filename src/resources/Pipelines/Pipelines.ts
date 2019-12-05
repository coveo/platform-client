import API from '../../APICore';
import Resource from '../Resource';
import MLAssociations from './MLAssociations/MLAssociations';
import {PipelineBackendVersion, PipelineModel} from './PipelinesInterfaces';

export default class Pipelines extends Resource {
    static searchUrlVersion2 = '/rest/search/v2/admin/pipelines';
    static searchUrlVersion1 = '/rest/search/v1/admin/pipelines';
    static searchUrl = '/rest/search/admin/pipelines';

    associations: MLAssociations;

    constructor(protected api: API) {
        super(api);

        this.associations = new MLAssociations(api);
    }

    listBasicInfo() {
        return this.api.get<PipelineModel[]>(
            this.buildPath(Pipelines.searchUrl, {organizationId: this.api.organizationId})
        );
    }

    getBackendVersion() {
        return this.api.get<PipelineBackendVersion>(
            this.buildPath(`${Pipelines.searchUrlVersion2}/ml/version`, {organizationId: this.api.organizationId})
        );
    }
}
