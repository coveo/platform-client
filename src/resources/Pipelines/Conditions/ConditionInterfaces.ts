import {Paginated} from '../../BaseInterfaces';
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

export interface ListConditionsOptions extends Paginated {
    isOrderDescending?: boolean;
    filter?: string;
    sortBy?: ListStatementSortBy;
    organizationId?: string;
}
