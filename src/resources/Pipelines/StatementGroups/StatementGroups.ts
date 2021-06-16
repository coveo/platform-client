import Resource from '../../Resource';
import {
    CreateStatementGroupModel,
    ListStatementGroupsOptions,
    StatementGroupList,
    StatementGroupModel,
    UpdateStatementGroupRuleAssociationsRequest,
    UpdateStatementGroupRuleAssociationsResponse,
} from './StatementGroupsInterfaces';

export default class StatementGroups extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/statementGroups`;
    static getStatementGroupUrl = (pipelineId: string, groupId: string) =>
        `${StatementGroups.getBaseUrl(pipelineId)}/${groupId}`;

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

    get(pipelineId: string, groupId: string) {
        return this.api.get<StatementGroupModel>(
            this.buildPath(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                organizationId: this.api.organizationId,
            })
        );
    }

    update(pipelineId: string, groupId: string, groupModel: StatementGroupModel) {
        return this.api.put<void>(
            this.buildPath(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                organizationId: this.api.organizationId,
            }),
            groupModel
        );
    }

    delete(pipelineId: string, groupId: string) {
        return this.api.delete<void>(
            this.buildPath(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                organizationId: this.api.organizationId,
            })
        );
    }

    toggleActive(pipelineId: string, groupId: string, isActive: boolean) {
        return this.api.patch<void>(
            this.buildPath(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                organizationId: this.api.organizationId,
            }),
            {isActive}
        );
    }

    bulkUpdateRuleAssociations(
        pipelineId: string,
        groupId: string,
        request: UpdateStatementGroupRuleAssociationsRequest
    ) {
        return this.api.put<UpdateStatementGroupRuleAssociationsResponse>(
            this.buildPath(`${StatementGroups.getStatementGroupUrl(pipelineId, groupId)}/associations`, {
                organizationId: this.api.organizationId,
            }),
            request
        );
    }
}
