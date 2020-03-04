import API from '../../APICore';
import Resource from '../Resource';
import MLAssociations from './MLAssociations/MLAssociations';
import {
    ListPipelinesOptions,
    NewPipelineModel,
    PipelineBackendVersion,
    PipelineModel,
    UpdatePipelineModel,
} from './PipelinesInterfaces';

export default class Pipelines extends Resource {
    static searchUrlVersion2 = '/rest/search/v2/admin/pipelines';
    static searchUrlVersion1 = '/rest/search/v1/admin/pipelines';

    associations: MLAssociations;

    constructor(protected api: API) {
        super(api);

        this.associations = new MLAssociations(api);
    }

    getMLVersion() {
        return this.api.get<PipelineBackendVersion>(
            this.buildPath(`${Pipelines.searchUrlVersion2}/ml/version`, {organizationId: this.api.organizationId})
        );
    }

    list(options?: ListPipelinesOptions) {
        return this.api.get<PipelineModel[]>(
            this.buildPath(Pipelines.searchUrlVersion1, {organizationId: this.api.organizationId, ...options})
        );
    }

    get(pipelineId: string) {
        return this.api.get<PipelineModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    delete(pipelineId: string) {
        return this.api.delete(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    update(pipeline: UpdatePipelineModel) {
        return this.api.put<PipelineModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipeline.id}`, {
                organizationId: this.api.organizationId,
            }),
            pipeline
        );
    }

    duplicate(pipelineId: string) {
        return this.api.post<PipelineModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}/duplicate`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    create(pipeline: NewPipelineModel) {
        return this.api.post<PipelineModel>(
            this.buildPath(Pipelines.searchUrlVersion1, {
                organizationId: this.api.organizationId,
            }),
            pipeline
        );
    }
}
