import {
    CampaignStatementGroupStatusType,
    ListStatementGroupStatusType,
    PermanentStatementGroupStatusType,
    StatementGroupType,
} from '../../Enums';

export interface StatementGroupList {
    groups: StatementGroupModel[];

    /**
     * The total number of matching statements across all pages of results.
     */
    totalCount: number;

    groupComposition: PipelineGroupsComposition;
}

export type StatementGroupModel = PermanentStatementGroup | CampaignStatementGroup;

interface StatementGroupModelBase {
    /**
     * The unique identifier of the statement group.
     */
    id: string;

    /**
     * The name of the statement groups.
     */
    name: string;

    /**
     * The intented purpose of this statement group.
     */
    description?: string;

    /**
     * The id of the condition that must be met by a query in order to route that query through this query pipeline.
     * A query cannot be routed through a query pipeline that does not have a condition unless:
     * - That query pipeline is set as the default query pipeline.
     * - That query pipeline is enforced through the pipeline parameter of the query itself, in which case the query pipeline condition is bypassed.
     */
    conditionId?: string;

    /**
     * The id of the condition that must be met by a query in order to route that query through this query pipeline.
     * A query cannot be routed through a query pipeline that does not have a condition unless:
     * - That query pipeline is set as the default query pipeline.
     * - That query pipeline is enforced through the pipeline parameter of the query itself, in which case the query pipeline condition is bypassed.
     */
    conditionDefinition?: string;

    /**
     * Date of creation
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    createdAt: string;

    /**
     * The creator principal.
     */
    createdBy?: string;

    /**
     * Last date of modification
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    modifiedAt?: string;

    /**
     * The last modified principal.
     */
    modifiedBy?: string;
    statementComposition: StatementGroupComposition;
}

export interface PermanentStatementGroup extends StatementGroupModelBase {
    // Discriminator
    type: StatementGroupType.permanent;

    /**
     * Whether or not the group is active.
     */
    isActive?: boolean;

    /**
     * The status of the group.
     */
    status: PermanentStatementGroupStatusType;
}

export interface CampaignStatementGroup extends StatementGroupModelBase {
    // Discriminator
    type: StatementGroupType.campaign;

    /**
     * The start date of the campaign.
     * Format: ISO-8601
     *
     * @example 2020-09-09T19:00:45.603-04:00
     */
    campaignStart: string;

    /**
     * The end date of the campaign.
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    campaignEnd: string;

    /**
     * The status of the campaign.
     */
    status: CampaignStatementGroupStatusType;
}

export interface PipelineGroupsComposition {
    /**
     * The number of active groups in the pipeline.
     */
    activeGroupCount: number;

    /**
     * The number of inactive groups in the pipeline.
     */
    inactiveGroupCount: number;

    /**
     * The number of expired groups in the pipeline.
     */
    expiredGroupCount: number;

    /**
     * The number of not started groups in the pipeline.
     */
    notStartedGroupCount: number;

    /**
     * The number of campaign groups in the pipeline.
     */
    campaignGroupCount: number;

    /**
     * The number of permanent groups in the pipeline.
     */
    permanentGroupCount: number;
}

export interface StatementGroupComposition {
    /**
     * The number of result ranking statements in this group.
     */
    resultRankingStatementCount: number;

    /**
     * The number of other types of statements in this group.
     */
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

    /**
     * The list of group status allowed in the results.
     * If you leave this parameter <em>undefined</em> or pass an empty array, all group's status will be allowed in the results.
     */
    status?: ListStatementGroupStatusType[];

    /**
     * The list of group types allowed in the results.
     * If you leave this parameter <em>undefined</em> or pass an empty array, all group types will be allowed in the results.
     */
    types?: StatementGroupType[];
}

export type CreateStatementGroupModel = CreatePermanentStatementGroupModel | CreateCampaignStatementGroupModel;

interface CreateStatementGroupModelBase {
    /**
     * The name of the statement groups.
     */
    name: string;

    /**
     * The intented purpose of this statement group.
     */
    description?: string;

    /**
     * The id of the condition that must be met by a query in order to route that query through this query pipeline.
     * A query cannot be routed through a query pipeline that does not have a condition unless:
     * - That query pipeline is set as the default query pipeline.
     * - That query pipeline is enforced through the pipeline parameter of the query itself, in which case the query pipeline condition is bypassed.
     */
    conditionId?: string;
}

export interface CreatePermanentStatementGroupModel extends CreateStatementGroupModelBase {
    // Discriminator
    type: StatementGroupType.permanent;

    /**
     * Whether or not the group is active.
     */
    isActive?: boolean;
}

export interface CreateCampaignStatementGroupModel extends CreateStatementGroupModelBase {
    // Discriminator
    type: StatementGroupType.campaign;

    /**
     * The start date of the campaign.
     * Format: ISO-8601
     *
     * @example 2020-09-09T19:00:45.603-04:00
     */
    campaignStart: string;

    /**
     * The end date of the campaign.
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    campaignEnd: string;
}

export type UpdateStatementGroupModel = UpdatePermanentStatementGroupModel | UpdateCampaignStatementGroupsModel;

export interface UpdatePermanentStatementGroupModel extends CreatePermanentStatementGroupModel {}
export interface UpdateCampaignStatementGroupsModel extends CreateCampaignStatementGroupModel {}

export interface UpdateStatementGroupRuleAssociationsRequest {
    /**
     * The rules to add to this group. (max-length: 50)
     *
     * If you specify a rule from another group, it will be removed from the original group and added to this one instead.
     *
     * **Note**: Invalid rule IDs will cause the request to fail.
     */
    toAdd?: StatementGroupRuleAssociationItem[];

    /**
     * The rules to remove from this group. (max-length: 50)
     *
     * **Note**: Orphaned rules, rules that are associated with another group, and non-existent rules will be ignored.
     */
    toRemove?: StatementGroupRuleAssociationItem[];
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
    associatedRules: StatementGroupRuleAssociationItem[];
}
