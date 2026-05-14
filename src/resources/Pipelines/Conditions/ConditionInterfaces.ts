import {PageModel, Paginated} from '../../BaseInterfaces.js';
import {
    ConditionAssociationSortByType,
    ConditionAssociationType,
    ConditionPipelineStatementType,
    ListStatementAssocationFilter,
    ListStatementSortBy,
} from '../../Enums.js';

export interface DetailedObject {
    object: string;
    key?: string;
    words?: string[];
}

export interface DetailedCondition {
    /**
     * The left-hand operand of this condition node.
     * When present, this is either another nested condition or an object reference.
     */
    left?: DetailedCondition | DetailedObject;
    /**
     * The operator applied between the left-hand and right-hand operands.
     */
    operator?: string;
    /**
     * The right-hand operand of this condition node.
     * When present, this is either another nested condition, an object reference,
     * or a literal value.
     */
    right?: DetailedCondition | DetailedObject | string | boolean;
    /**
     * The object targeted by this condition
     */
    object?: string;
    /**
     * The key for this condition node.
     */
    key?: string;
    /**
     * The logical join operator used to combine this condition with another
     * condition at the same level
     */
    joinOperator?: string;
    /**
     * The collection of values associated to this condition node.
     */
    values?: unknown;
    /**
     * Whether this node represents a sub-condition/grouping in the condition tree.
     */
    isSub?: boolean;
    /**
     * The start value of a range-based condition.
     */
    from?: string;
    /**
     * The end value of a range-based condition.
     */
    to?: string;
}

interface ConditionAssociations {
    /**
     * The number of resources associated to this condition.
     */
    total: number;
}

export interface ConditionModel {
    /**
     * The unique identifier of this statement.
     */
    id: string;

    /**
     * The intented purpose of thi statement in an actual implementation.
     */
    description: string;

    /**
     * The query pipeline language expression that defines this statement.
     */
    definition: string;

    /**
     * The structured object of the query pipeline language expression of this statement.
     */
    detailed: {condition: DetailedCondition};

    /**
     * The identifier of the Coveo Cloud platform user who last modified this.
     */
    modifiedBy?: string;

    /**
     * The last time this was modified. (ISO 8601)
     */
    modifiedAt?: string;

    /*
     * Information about the resources associated to this condition.
     */
    associations?: ConditionAssociations;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    childrenCount: number;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    feature: string;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    position: number;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    ready: boolean;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    parent?: string;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    condition?: string;
}

export interface NewConditionModel {
    /**
     * The query pipeline language expression that defines this statement.
     */
    definition: string;

    /**
     * The unique identifier of this statement.
     */
    id?: string;

    /**
     * The intented purpose of this statement in an actual implementation.
     */
    description?: string;
}

export interface ListConditionsOptions extends Paginated {
    /**
     * Whether to sort the results in ascending order.
     * @default true
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
     * The unique identifier of the target Coveo Cloud organization.
     * The value set by default is provided by the API resource
     */
    organizationId?: string;

    /**
     * Whether to include additional information such as the number of resources associated to the condition.
     * @default false
     */
    expand?: boolean;

    /**
     * Only includes conditions with a certain number of associated resources.
     * @default ListStatementAssocationFilter.All
     */
    associationFilter?: ListStatementAssocationFilter;
}

export interface ListAssociationsOptions extends Paginated {
    /**
     * Optional filter of association types to include. If you leave this parameter undefined or empty, all association types are included.
     */
    associationTypes?: ConditionAssociationType[];

    /**
     * Optional filter to include only associations whose associationType is pipelineStatements and whose pipelineStatementType matches the specified value.
     * Must be used in conjunction with associationTypes=["pipelineStatements"].
     */
    pipelineStatementType?: ConditionPipelineStatementType;

    /**
     * Optional filter to match the pipeline name of the object associated with this condition.
     */
    pipelineName?: string;

    /**
     * The sort criteria to apply on the results.
     */
    sortBy?: ConditionAssociationSortByType;

    /**
     * Whether to sort the results in ascending order.
     */
    isOrderAscending?: boolean;
}

export interface ConditionPipelineAssociation {
    /**
     * The type of the association.
     */
    associationType: ConditionAssociationType;
    /**
     * Pipeline statement type of the association.
     */
    pipelineStatementType?: ConditionPipelineStatementType;
    /**
     * Primary key of the associated entity.
     */
    id: string;
    /**
     *Pipeline ID the row belongs to.
     */
    pipelineId: string;
    /**
     *Human-readable name of the pipeline.
     */
    pipelineName: string;
}

export interface ConditionPipelineStatementAssociation {
    /**
     * The type of the association.
     */
    associationType: ConditionAssociationType;
    /**
     * Primary key of the associated entity.
     */
    id: string;
    /**
     *Pipeline ID the row belongs to.
     */
    pipelineId: string;
    /**
     *Human-readable name of the pipeline.
     */
    pipelineName: string;
    /**
     * Pipeline statement type of the association (only present for pipelineStatements).
     */
    pipelineStatementType?: ConditionPipelineStatementType;
}

export type ConditionAssociationItemUnion = ConditionPipelineAssociation | ConditionPipelineStatementAssociation;

export interface ConditionAssociationListResponse extends PageModel<ConditionAssociationItemUnion> {
    /**
     * The condition ID used for the lookup.
     */
    conditionId?: string;
}
