import {ListStatementSortBy, StatementsFeature} from '../../Enums';
import {ConditionModel} from '../Conditions';

export interface StatementModel {
    /**
     * The unique identifier of this statement
     */
    id: string;
    /**
     * The query pipeline feature expressed by this statement
     */
    feature: StatementsFeature;
    /**
     * The query pipeline language expression that defines this statement
     */
    definition: string;
    /**
     * Whether the underlying Coveo Machine Learning model is ready. This property only has a meaning with recommendation, topClicks, and querySuggest statements.
     */
    ready: boolean;
    detailed: any;
    /**
     * @deprecated this property is exposed for backward compatibility reasons.
     */
    childrenCount: number;
    /**
     * The 1-based position of this statement relative to other statements in the same query pipeline.
     * Query pipeline statements are evaluated sequentially from the lowest to the highest position, which implies that higher-positioned statements can override or complement lower-positioned ones.
     */
    position: number;
    /**
     * The intended purpose of this statement in an actual implementation.
     */
    description?: string;
    parent?: ConditionModel;
    condition?: ConditionModel;
    /**
     * The warning messages that apply to this query pipeline statement.
     */
    warnings?: string[];
    /**
     * The display name for this Machine Learning model. This property only has a meaning with recommendation, topClicks, and querySuggest statements.
     */
    displayName?: string;
    /**
     * The identifier of the Coveo Cloud platform user who last modified this.
     */
    modifiedBy?: string;
    /**
     * The last time this was modified.
     */
    modifiedAt?: string;
}

export interface CreateStatementModel {
    /**
     * The query pipeline feature expressed by this statement
     */
    feature: StatementsFeature;
    /**
     * The query pipeline language expression that defines this statement
     */
    definition: string;
    /**
     * The 1-based position of this statement relative to other statements in the same query pipeline.
     * Query pipeline statements are evaluated sequentially from the lowest to the highest position, which implies that higher-positioned statements can override or complement lower-positioned ones.
     */
    position: number;
    /**
     * The unique identifier of this statement
     */
    id?: string;
    /**
     * The intended purpose of this statement in an actual implementation.
     */
    description?: string;
    parent?: string;
}

export interface MoveStatementModel {
    /**
     * The 1-based position of this statement relative to other statements in the same query pipeline.
     * Query pipeline statements are evaluated sequentially from the lowest to the highest position, which implies that higher-positioned statements can override or complement lower-positioned ones.
     */
    position?: number;
    after?: string;
}

export interface CopyStatementModel {
    statementIds: string[];
    destinationPipelineId: string;
}

/**
 * @deprecated - Use `PageModel<StatementModel, 'statements'>` instead.
 */
export interface StatementModelList {
    statements: StatementModel[];
    totalEntries: number;
    totalPages: number;
}

export interface ListStatementParams {
    /**
     * Whether to sort the results in ascending order.
     */
    isOrderAscending?: boolean;
    /**
     * The query filter to match.
     * This allows you to search within query pipeline statement definitions and descriptions.
     * By default, results are not required to match a specific query filter.
     */
    filter?: string;
    /**
     * The sort criteria to apply on the results.
     */
    sortBy?: ListStatementSortBy;
    /**
     * The 0-based number of the page of results to get.
     */
    page?: number;
    /**
     * The number of results to include per page.
     */
    perPage?: number;
    /**
     * The query pipeline feature to match.
     */
    feature?: StatementsFeature;
    /**
     * The unique identifier of the target Coveo Cloud organization.
     */
    organizationId?: string;
}

export interface ExportStatementParams {
    /**
     * The query pipeline feature to match.
     */
    feature?: StatementsFeature;
    /**
     * The unique identifier of the target Coveo Cloud organization.
     */
    organizationId?: string;
}
