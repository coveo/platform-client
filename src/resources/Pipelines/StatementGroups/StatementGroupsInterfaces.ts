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
    page?: number;
    perPage?: number;
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
