import {ListStatementSortBy} from '../../Enums';

export interface ConditionModel {
    id: string;
    description: string;
    definition: string;
    detailed: any;
    childrenCount: number;
    feature: string;
    position: number;
    ready: boolean;
    parent?: string;
    condition?: string;
}

export interface NewConditionModel {
    definition: string;
    id?: string;
    description?: string;
}

export interface ListConditionsOptions {
    isOrderDescending?: boolean;
    filter?: string;
    sortBy?: ListStatementSortBy;
    page?: number;
    perPage?: number;
    organizationId?: string;
}
