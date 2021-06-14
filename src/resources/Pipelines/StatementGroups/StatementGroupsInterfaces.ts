import {StatementGroupType} from '../../Enums';

export interface StatementGroupList {
    groups: StatementGroupModel[];
    totalCount: number;
    groupComposition: PipelineGroupsComposition;
}

export interface StatementGroupModel {
    id: string;
    name: string;
    type: StatementGroupType;
    isActive?: boolean;
    campaignStart?: string;
    campaignEnd?: string;
    description?: string;
    conditionId?: string;
    conditionDefinition?: string;
    createdAt: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;
    statementComposition: StatementGroupComposition;
}

export interface PipelineGroupsComposition {
    activeGroupCount: number;
    inactiveGroupCount: number;
    campaignGroupCount: number;
    permanentGroupCount: number;
}

export interface StatementGroupComposition {
    resultRankingStatementCount: number;
    otherStatementCount: number;
}

export interface ListStatementGroupsOptions {
    /**
     * The 0-based number of the page of results to get.
     */
    page?: number;

    /**
     * The number of results to include per page.
     */
    perPage?: number;

    /**
     * The query filter to match.
     *
     * This allows you to search within group name, group user notes and condition definition.
     */
    filter?: string;
}

export interface CreateStatementGroupModel {
    name: string;
    type: StatementGroupType;
    campaignStart?: string;
    campaignEnd?: string;
    description?: string;
    conditionId?: string;
}

export interface UpdateStatementGroupModel extends CreateStatementGroupModel {
    isActive?: boolean;
}

export interface UpdateStatementGroupRuleAssociationsRequest {
    /**
     * The rules to add to this group. (max-length: 50)
     *
     * If you specify a rule from another group, it will be removed from the original group and added to this one instead.
     *
     * **Note**: Invalid rule IDs will cause the request to fail.
     */
    toAdd?: Array<StatementGroupRuleAssociationItem>;

    /**
     * The rules to remove from this group. (max-length: 50)
     *
     * **Note**: Orphaned rules, rules that are associated with another group, and non-existent rules will be ignored.
     */
    toRemove?: Array<StatementGroupRuleAssociationItem>;
}

export interface StatementGroupRuleAssociationItem {
    /**
     * The query pipeline feature that's enabled by this rule.
     */
    featureType: StatementGroupRuleAssociationFeatureTypeEnum;

    /**
     * The unique identifier of the rule.
     */
    ruleId: string;
}

export enum StatementGroupRuleAssociationFeatureTypeEnum {
    ResultRankings = 'resultRankings',
}

export interface UpdateStatementGroupRuleAssociationsResponse {
    /**
     * The rules associated with this group.
     */
    associatedRules: Array<StatementGroupRuleAssociationItem>;
}
