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
