import {
    CampaignStatementGroupStatusType,
    ListStatementGroupStatusType,
    PermanentStatementGroupStatusType,
    StatementGroupType,
} from '../../Enums';

export interface StatementGroupList {
    groups: StatementGroupModel[];
    totalCount: number;
    groupComposition: PipelineGroupsComposition;
}

export type StatementGroupModel = PermanentStatementGroup | CampaignStatementGroup;

interface StatementGroupModelBase {
    id: string;
    name: string;
    description?: string;
    conditionId?: string;
    conditionDefinition?: string;

    /**
     * Date of creation
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    createdAt: string;
    createdBy?: string;

    /**
     * Last date of modification
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    modifiedAt?: string;
    modifiedBy?: string;
    statementComposition: StatementGroupComposition;
}

export interface PermanentStatementGroup extends StatementGroupModelBase {
    // Discriminator
    type: StatementGroupType.permanent;

    isActive?: boolean;
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
    campaignStart?: string;

    /**
     * The end date of the campaign.
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    campaignEnd?: string;

    status: CampaignStatementGroupStatusType;
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

export interface CreateStatementGroupModel {
    name: string;
    type: StatementGroupType;

    /**
     * The start date of the campaign.
     * Format: ISO-8601
     *
     * @example 2020-09-09T19:00:45.603-04:00
     */
    campaignStart?: string;

    /**
     * The end date of the campaign.
     * Format: ISO-8601
     *
     * @example 2021-09-09T19:00:45.603-04:00
     */
    campaignEnd?: string;
    description?: string;
    conditionId?: string;
    isActive?: boolean;
}

export interface UpdateStatementGroupModel extends CreateStatementGroupModel {}

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
