import Resource from '../../Resource';
import {
    CreateStatementGroupModel,
    ListStatementGroupsOptions,
    StatementGroupList,
    StatementGroupModel,
} from './StatementGroupsInterfaces';

export default class StatementGroups extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/statementGroups`;

    list(pipelineId: string, options?: ListStatementGroupsOptions) {
        return this.api.get<StatementGroupList>(
            this.buildPath(StatementGroups.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
                ...options,
            })
        );
    }

    create(pipelineId: string, model: CreateStatementGroupModel) {
        return this.api.post<StatementGroupModel>(
            this.buildPath(StatementGroups.getBaseUrl(pipelineId), {organizationId: this.api.organizationId}),
            model
        );
    }
}
