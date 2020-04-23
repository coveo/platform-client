import {StatementGroupType} from '../../Enums';

export interface StatementGroupList {
    groups: StatementGroupModel[];
    totalCount: number;
}

export interface StatementGroupModel {
    id: string;
    name: string;
    type: StatementGroupType;
    isActive: boolean;
    campaignStart?: string;
    campaignEnd?: string;
    description?: string;
    conditionId?: string;
    conditionDefinition?: string;
}

export interface CreateStatementGroupModel {
    name: string;
    type: StatementGroupType;
    campaignStart?: string;
    campaignEnd?: string;
    campaignTimezone?: string;
    description?: string;
    conditionId?: string;
}
