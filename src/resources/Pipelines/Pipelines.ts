import API from '../../APICore';
import Resource from '../Resource';
import MLAssociations from './MLAssociations/MLAssociations';
import {PipelineBackendVersion, PipelineModel} from './PipelinesInterfaces';

export default class Pipelines extends Resource {
    static getBaseUrl = (version?: 1 | 2) => {
        if (version === 1) {
            return '/rest/search/v1/admin/pipelines';
        }
        if (version === 2) {
            return '/rest/search/v2/admin/pipelines';
        }
        return '/rest/search/admin/pipelines';
    };

    associations: MLAssociations;

    constructor(protected api: API) {
        super(api);

        this.associations = new MLAssociations(api);
    }

    listBasicInfo() {
        return this.api.get<PipelineModel[]>(
            this.buildPath(Pipelines.getBaseUrl(), {organizationId: this.api.organizationId})
        );
    }

    getBackendVersion() {
        return this.api.get<PipelineBackendVersion>(
            this.buildPath(`${Pipelines.getBaseUrl(2)}/ml/version`, {organizationId: this.api.organizationId})
        );
    }
}
