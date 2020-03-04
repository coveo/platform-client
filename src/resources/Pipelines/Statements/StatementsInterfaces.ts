import {StatementsFeature} from '../../Enums';
import {ConditionModel} from '../PipelinesInterfaces';

export interface StatementModel {
    id: string;
    description?: string;
    feature: StatementsFeature;
    definition: string;
    parent?: ConditionModel;
    condition?: ConditionModel;
    position: number;
    ready: boolean; // Whether the underlying Coveo Machine Learning model is ready.This property only has a meaning with recommendation, topClicks, and querySuggest statements. ,
    detailed: any;
    warnings?: string[];
    displayName?: string; // The display name for this Machine Learning model.This property only has a meaning with recommendation, topClicks, and querySuggest statements. ,
}

export interface CreateStatementModel {
    feature: StatementsFeature;
    definition: string;
    position: number;
    id?: string;
    description?: string;
    parent?: string;
}

export interface MoveStatementModel {
    position?: number;
    after?: string;
}

export interface CopyStatementModel {
    statementIds: string[];
    destinationPipelineId: string;
}

export interface StatementModelList {
    statements: StatementModel[];
    totalEntries: number;
    totalPages: number;
}

export enum ListStatementSortBy {
    Position = 'position',
    Definition = 'definition',
    Description = 'description',
}

export interface ListStatementParams {
    isOrderAscending?: boolean;
    filter?: string;
    sortBy?: ListStatementSortBy;
    page?: number;
    perPage?: number;
    feature?: StatementsFeature;
    organizationId?: string;
}

export interface ExportStatementParams {
    feature?: StatementsFeature;
    organizationId?: string;
}
