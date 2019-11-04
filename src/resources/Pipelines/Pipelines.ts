import API from '../../APICore';
import Resource from '../Resource';
import MLAssociations from './MLAssociations/MLAssociations';
import {PipelineBackendVersion} from './PipelinesInterfaces';

export default class Pipelines extends Resource {
    static baseUrl = '/rest/search/v2/admin/pipelines';

    associations: MLAssociations;

    constructor(protected api: API) {
        super(api);

        this.associations = new MLAssociations(api);
    }

    getBackendVersion() {
        return this.api.get<PipelineBackendVersion>(
            this.buildPath(`${Pipelines.baseUrl}/ml/version`, {organizationId: this.api.organizationId})
        );
    }
}
