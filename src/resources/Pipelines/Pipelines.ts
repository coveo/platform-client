import API from '../../APICore.js';
import {GranularResource} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import Condition from './Conditions/Condition.js';
import FacetStateRules from './FacetStateRules/FacetStateRules.js';
import MLAssociations from './MLAssociations/MLAssociations.js';
import {
    ListPipelinesOptions,
    ListPipelinesReturnVariant,
    NewPipelineModel,
    PipelineDetailedModel,
    PipelineModel,
    UpdatePipelineModel,
} from './PipelinesInterfaces.js';
import ResultRankings from './ResultRankings/ResultRankings.js';
import StatementGroups from './StatementGroups/StatementGroups.js';
import Statements from './Statements/Statements.js';

export default class Pipelines extends Resource {
    static searchUrlVersion2 = '/rest/search/v2/admin/pipelines';
    static searchUrlVersion1 = '/rest/search/v1/admin/pipelines';

    associations: MLAssociations;
    statements: Statements;
    resultRanking: ResultRankings;
    conditions: Condition;
    groups: StatementGroups;
    facetRules: FacetStateRules;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.associations = new MLAssociations(api, serverlessApi);
        this.statements = new Statements(api, serverlessApi);
        this.resultRanking = new ResultRankings(api, serverlessApi);
        this.conditions = new Condition(api, serverlessApi);
        this.groups = new StatementGroups(api, serverlessApi);
        this.facetRules = new FacetStateRules(api, serverlessApi);
    }

    list<ListPipelinesVariant extends ListPipelinesOptions>(options?: ListPipelinesVariant) {
        return this.api.get<ListPipelinesReturnVariant<ListPipelinesVariant>>(
            this.buildPath(Pipelines.searchUrlVersion1, {organizationId: this.api.organizationId, ...options}),
        );
    }

    get(pipelineId: string) {
        return this.api.get<PipelineDetailedModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}`, {
                organizationId: this.api.organizationId,
            }),
        );
    }

    delete(pipelineId: string) {
        return this.api.delete(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}`, {
                organizationId: this.api.organizationId,
            }),
        );
    }

    update(pipeline: UpdatePipelineModel) {
        return this.api.put<PipelineModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipeline.id}`, {
                organizationId: this.api.organizationId,
            }),
            pipeline,
        );
    }

    duplicate(pipelineId: string, granularResource?: GranularResource) {
        return this.api.post<PipelineModel>(
            this.buildPath(`${Pipelines.searchUrlVersion1}/${pipelineId}/duplicate`, {
                organizationId: this.api.organizationId,
            }),
            granularResource,
        );
    }

    create(pipeline: NewPipelineModel) {
        return this.api.post<PipelineModel>(
            this.buildPath(Pipelines.searchUrlVersion1, {
                organizationId: this.api.organizationId,
            }),
            pipeline,
        );
    }
}
